import axios from "axios";

const registerForm = document.getElementById("registerForm") as HTMLFormElement;

registerForm.addEventListener("submit", async (e) => {
	e.preventDefault();

	const formData = new FormData(registerForm);
	const data = {
		name: formData.get("name"),
		email: formData.get("email"),
		password: formData.get("password"),
	};

	try {
		const response = await axios.post("/api/users", data);
		// Zkontrolujeme stavový kód a obsah odpovědi
		if (response.status === 201) {
			document.getElementById("message")!.textContent =
				"User registered successfully!";
			window.location.href = "/src/pages/login.html";
		} else {
			document.getElementById("message")!.textContent =
				"Registration failed. Please try again.";
		}
	} catch (error: any) {
		// Ošetření konkrétních chyb, například pokud už uživatel existuje
		if (error.response && error.response.status === 400) {
			document.getElementById("message")!.textContent =
				"User with this email already exists!";

			console.log(error);
		} else {
			document.getElementById("message")!.textContent =
				"Error registering user. Please try again.";
		}
		console.error("Error registering user", error);
	}
});

async function main() {
	try {
		const response = await fetch("/api/check-login");
		const data = await response.json();

		// Pokud je uživatel přihlášen, přesměrujeme ho z chráněných rout
		if (data.loggedIn) {
			const currentPath = window.location.pathname;
			if (
				currentPath === "/src/pages/register" ||
				currentPath === "/src/pages/register.html"
			) {
				window.location.href = "/";
			}
		}
	} catch (error) {
		console.error("Error checking login status:", error);
	}
}

main();
