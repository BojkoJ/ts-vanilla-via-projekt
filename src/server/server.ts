import http from "http";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import dotenv from "dotenv";
import { eq } from "drizzle-orm";
import { userSchema, type User } from "../types/userSchema.ts"; // Import Zod schématu a typu
import { usersTable } from "../db/schema.ts";

// Načtení .env souboru
dotenv.config();

// Připojení k SQLite databázi
const dbFileName = process.env.DB_FILE_NAME || "local.db";
const sqlite = new Database(dbFileName);

// Inicializace Drizzle ORM
const db = drizzle(sqlite);

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

// Vytvoření HTTP serveru
const server = http.createServer(async (req, res) => {
	const { method, url } = req;

	if (url === "/api/users" && method === "GET") {
		// Získání všech uživatelů
		const users = await db.select().from(usersTable);

		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(users));
	} else if (url === "/api/users" && method === "POST") {
		// Vložení nového uživatele s validací Zod
		const userData = await parseRequestBody(req);
		const validation = userSchema.safeParse(userData);

		if (!validation.success) {
			// Pokud validace selže, vrátíme chybu
			res.writeHead(400, { "Content-Type": "application/json" });
			return res.end(
				JSON.stringify({ errors: validation.error.format() })
			);
		}

		// Pokud validace projde, vložíme uživatele
		const user: User = validation.data;
		await db.insert(usersTable).values(user);

		res.writeHead(201, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: "New user created!" }));
	} else if (url?.startsWith("/api/users/") && method === "PUT") {
		const email = url.split("/")[3];
		const updateData = await parseRequestBody(req);

		const validation = userSchema.partial().safeParse(updateData);

		if (!validation.success) {
			res.writeHead(400, { "Content-Type": "application/json" });
			return res.end(
				JSON.stringify({ errors: validation.error.format() })
			);
		}

		await db
			.update(usersTable)
			.set(validation.data)
			.where(eq(usersTable.email, email));
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: "User updated!" }));
	} else if (url?.startsWith("/api/users/") && method === "DELETE") {
		const email = url.split("/")[3];

		await db.delete(usersTable).where(eq(usersTable.email, email));

		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: "User deleted!" }));
	} else {
		// 404 Not Found
		res.writeHead(404, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: "Not Found" }));
	}
});

// Spuštění serveru
const PORT = 3000;
server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
