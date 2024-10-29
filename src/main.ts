// Spuštění akcí
async function main() {
	// Načtení navbaru do stránky
	const navbarContainer = document.getElementById("navbar-container");

	fetch("/src/pages/navbar.html")
		.then((response) => response.text())
		.then((data) => {
			if (navbarContainer) {
				navbarContainer.innerHTML = data;
			}
		})
		.then(() => {
			import("./navbar.ts"); // Dynamické načtení scriptu pro navbar
		});
}

main();
