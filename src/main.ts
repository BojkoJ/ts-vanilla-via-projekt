// Spuštění akcí
async function main() {
	const registerButton = document.getElementById("registerButton");
	const loginButton = document.getElementById("loginButton");

	// Zkontrolujeme, zda je uživatel přihlášen pomocí API volání
	try {
		const response = await fetch("/api/check-login");
		const data = await response.json();

		// Pokud není uživatel přihlášen, zobrazíme tlačítka
		if (!data.loggedIn) {
			// Přidáme onClick event listener pro tlačítko "Login"
			loginButton?.addEventListener("click", () => {
				window.location.href = "/src/pages/login.html";
			});

			// Přidáme onClick event listener pro tlačítko "Register"
			registerButton?.addEventListener("click", () => {
				window.location.href = "/src/pages/register.html";
			});
		} else {
			registerButton?.classList.add("hidden");
			loginButton?.classList.add("hidden");
		}
	} catch (error) {
		console.error("Error checking login status:", error);
	}
}

main();
