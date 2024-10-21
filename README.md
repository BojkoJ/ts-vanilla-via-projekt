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
-   **better-sqlite3** - lokální databáze v souboru `local.db`
-   **node.js** - JavaScript runtime (důležité používat verzi 23.0)
-   **typescript** - lepší JavaScript s typovou kontrolou
-   **vite** - nástroj pro vývoj a scaffold TypeScript aplikací
-   **pnpm** - rychlý správce balíčků pro efektivní instalace

## Jak spustit?

1. `pnpm install` - Nainstalovat dependencies a knihovny
2. **Poznámka**: Není potřeba spouštět migrace databáze, `local.db` již obsahuje připravená data.
3. `pnpm dev` - Spustit projekt
4. Projekt běží na [localhost:5173](http://localhost:5173)

## Další informace

-   **Node.js verze**: Tento projekt vyžaduje Node.js verzi 23.0. Pokud ji nemáte nainstalovanou, můžete si ji stáhnout [zde](https://nodejs.org/en/download/prebuilt-installer).
-   **Databáze**: Databáze `local.db` je součástí projektu a obsahuje všechny potřebné tabulky a data. Není potřeba vytvářet nové migrace.
