import http from "http";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import dotenv from "dotenv";
import { eq } from "drizzle-orm";
import { usersTable } from "../db/schema.ts";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import bcrypt from "bcrypt";
import { type User, userSchema } from "../types/userSchema.ts";

// Načtení .env souboru
dotenv.config();

// Připojení k SQLite databázi
const dbFileName = process.env.DB_FILE_NAME || "local.db";
const sqlite = new Database(dbFileName);
const db = drizzle(sqlite);

// Nastavení Passport Local strategie
passport.use(
	new LocalStrategy(
		{ usernameField: "email" },
		async (email, password, done) => {
			try {
				// Najdeme uživatele podle e-mailu
				const users = await db
					.select()
					.from(usersTable)
					.where(eq(usersTable.email, email));
				if (users.length === 0) {
					return done(null, false, { message: "Incorrect email." });
				}

				const user = users[0];
				const passwordMatch = await bcrypt.compare(
					password,
					user.password
				);
				if (!passwordMatch) {
					return done(null, false, {
						message: "Incorrect password.",
					});
				}

				return done(null, user);
			} catch (error) {
				return done(error);
			}
		}
	)
);

// Passport serializace a deserializace
passport.serializeUser((user: any, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
	try {
		const user = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.id, id))
			.limit(1);
		done(null, user[0]);
	} catch (error) {
		done(error);
	}
});

// Nastavení express-session
const sessionMiddleware = session({
	secret: "your_secret_key", // Klíč pro podepsání cookie
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 24 * 60 * 60 * 1000, // 24 hodin
		secure: false, // Pro HTTP, pokud HTTPS - nastavit na true
		httpOnly: true, // Zajistí, že cookie je dostupná jen pro HTTP(S) a není přístupná skrze JavaScript
	},
});

// Vytvoření HTTP serveru
const server = http.createServer(async (req, res) => {
	// Zpracování session a cookies

	// V těle http.createServer voláme sessionMiddleware, který zpracuje cookies a nastaví session objekt
	sessionMiddleware(req as any, res as any, () => {
		// V těle sessionMiddleware voláme passport.initialize, což inicializuje Passport knihovnu
		passport.initialize()(req as any, res as any, () => {
			// V těle passport.initialize voláme passport.session, což inicializuje session pro Passport knihovnu
			passport.session()(req as any, res as any, async () => {
				// Z requestu získáme metodu a URL
				const { method, url } = req;
				//---------------------  API Endpoint na registraci: -----------------------------------------------------------------------
				// Přidání registrace uživatele
				if (url === "/api/users" && method === "POST") {
					const body = await parseRequestBody(req);

					const { firstName, lastName, email, password } = body;

					// Validace uživatelských dat pomocí Zod
					const validation = userSchema.safeParse({
						firstName,
						lastName,
						email,
						password,
					});

					if (!validation.success) {
						res.writeHead(400, {
							"Content-Type": "application/json",
						});
						return res.end(
							JSON.stringify({
								message: "Invalid user data",
								errors: validation.error.format(),
							})
						);
					}

					// Zkontrolujeme, zda uživatel existuje
					const users = await db
						.select()
						.from(usersTable)
						.where(eq(usersTable.email, email));
					if (users.length > 0) {
						res.writeHead(400, {
							"Content-Type": "application/json",
						});

						return res.end(
							JSON.stringify({
								message: "User with this email already exists",
							})
						);
					}

					// Hashujeme heslo a uložíme nového uživatele
					const hashedPassword = await bcrypt.hash(password, 10);

					await db.insert(usersTable).values({
						firstName,
						lastName,
						email,
						password: hashedPassword,
					});

					res.writeHead(201, { "Content-Type": "application/json" });

					return res.end(
						JSON.stringify({ message: "New user created!" })
					);
				}
				//---------------------  API Endpoint na přihlášení: -----------------------------------------------------------------------
				// Přidání samostatné routy pro login
				if (url === "/api/login" && method === "POST") {
					const body = await parseRequestBody(req);
					req.body = body; // Předáme data do req.body

					passport.authenticate(
						"local",
						(err: Error, user: User, info: any) => {
							if (err || !user) {
								if (!res.headersSent) {
									res.writeHead(400, {
										"Content-Type": "application/json",
									});

									res.end(
										JSON.stringify({
											message:
												info?.message ||
												"Error logging in",
										})
									);
								}
								return;
							}

							if (req.session) {
								req.session.userId = user.id;
							} else {
								res.writeHead(500, {
									"Content-Type": "application/json",
								});
								return res.end(
									JSON.stringify({
										message: "Internal Server Error",
									})
								);
							}

							if (!res.headersSent) {
								res.writeHead(200, {
									"Content-Type": "application/json",
								});
								res.end(
									JSON.stringify({
										message: "Logged in successfully!",
									})
								);
							}
						}
					)(req, res);
					return; // Zde musíme vrátit, aby se zabránilo odeslání dalších hlaviček
				}
				//---------------------  API Endpoint na kontrolu přihlášení: -----------------------------------------------------------------------
				// API endpoint pro kontrolu přihlášení
				if (url === "/api/check-login" && method === "GET") {
					if (req.session && req.session.userId) {
						res.writeHead(200, {
							"Content-Type": "application/json",
						});
						res.end(JSON.stringify({ loggedIn: true }));
					} else {
						res.writeHead(200, {
							"Content-Type": "application/json",
						});
						res.end(JSON.stringify({ loggedIn: false }));
					}
					return;
				}

				// Další zpracování requestů
				res.writeHead(404, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ message: "Not Found" }));
			});
		});
	});
});

// Parsing JSON těla požadavku
const parseRequestBody = async (req: http.IncomingMessage): Promise<any> => {
	return new Promise((resolve, reject) => {
		let body = "";
		req.on("data", (chunk) => {
			body += chunk.toString();
		});
		req.on("end", () => {
			resolve(JSON.parse(body));
		});
		req.on("error", reject);
	});
};

// Spuštění serveru
const PORT = 3000;

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
