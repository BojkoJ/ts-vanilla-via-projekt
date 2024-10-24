# Projekt VIA - vanilla HTML & TypeScript projekt

## Požadavky:

-   Naimplementovat kopii webu [Soilboy](https://www.soilboy.sg/)
-   Nepoužívat žádný webový framework jako Next.js, React, Svelte apod.
-   Povoleno: CSS frameworky, JS knihovny (s výjimkou React), TypeScript

## Knihovny a dependencies

-   **nodemon** - knihovna pro automatický refresh při změnách
-   **tailwindCSS** - CSS framework
-   **zod** - knihovna pro validaci dat
-   **axios** - knihovna pro HTTP požadavky (lepší než fetchAPI)
-   **drizzle** - užitečné TypeScript orientované ORM
-   **better-sqlite3** - lokální databáze v souboru `./local.db`
-   **node.js** - JavaScript runtime (důležité používat verzi 23.0)
-   **typescript** - lepší JavaScript s typovou kontrolou
-   **vite** - nástroj pro vývoj a scaffold TypeScript aplikací
-   **pnpm** - rychlý správce balíčků pro efektivní instalace
-   **passport.js** - autentizační middleware knihovna pro Node.js
-   **express-session** - middleware knihovna pro správu session pomocí cookies v runtimu Node.js

## Struktura projektu

-   `./src/pages/` obsahuje HTML stránky (např. `register.html`, `login.html`).
-   `./src/` obsahuje všechny TypeScript soubory, které se starají o logiku aplikace (např. `register.ts`, `login.ts`).
-   `./local.db` obsahuje SQLite databázi s uživatelskými daty.
-   `./drizzle` obashuje migrace ORM Drizzle
-   `./src/server` obsahuje soubor se serverovou backend logikou
-   `./src/db` obsahuje soubor se schématem databáze pro ORM
-   `./src/types` obsahuje soubory s typovou definicí pro kontrolu knihovnou Zod

## Jak spustit?

1. `pnpm install` - Nainstalovat dependencies a knihovny
2. `pnpm add -g node-gyp` - Nainstalovat node-gyp pro better-sqlite3
3. **Poznámka**: Není potřeba spouštět migrace databáze, `./local.db` již obsahuje připravená data.
4. `pnpm dev` - Spustit projekt
5. Projekt běží na [localhost:5173](http://localhost:5173)

## Autentifikace

Projekt využívá knihovnu **passport.js** a knihovnu **express-session** pro správu autentifikace uživatelů.

-   Uživatelé mohou provádět registraci pomocí endpointu `/api/users` a přihlásit se přes `/api/login`.
-   Sessiony jsou spravovány pomocí cookies, které se automaticky vyprší po 24 hodinách.

## Další informace

-   **Node.js verze**: Tento projekt vyžaduje Node.js verzi 23.0. Pokud ji nemáte nainstalovanou, můžete si ji stáhnout [zde](https://nodejs.org/en/download/prebuilt-installer).
-   **Databáze**: Databáze `./local.db` je součástí projektu a obsahuje všechny potřebné tabulky a data. Není potřeba vytvářet nové migrace.
