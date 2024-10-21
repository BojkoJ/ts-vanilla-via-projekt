document.addEventListener("DOMContentLoaded", () => {
	setTimeout(() => {
		const navbar = document.getElementById("navbar");

		if (navbar) {
			let lastScrollTop = 0;
			const navbarHeight = navbar.offsetHeight; // Získáme výšku navbaru
			let scrollUpThreshold = 0; // Sledujeme vzdálenost, o kterou bylo scrollováno nahoru

			// Inicialně nastavíme transparentní pozadí
			navbar.classList.add(
				"bg-transparent",
				"transition-all",
				"duration-500"
			);

			window.addEventListener("scroll", () => {
				const scrollTop =
					window.pageYOffset || document.documentElement.scrollTop;

				// Check if the user scrolled to the very top of the page
				if (scrollTop === 0) {
					// Rozbalíme navbar a změníme jeho pozadí na transparentní
					navbar.classList.add("translate-y-0");
					navbar.classList.remove("-translate-y-full");
					navbar.classList.add("bg-transparent"); // Změníme pozadí na transparentní
					navbar.classList.remove("bg-[#FFF9F0]"); // Odstraníme případnou bílou barvu pozadí
					scrollUpThreshold = 0; // Resetujeme scrollUpThreshold
				} else if (scrollTop > lastScrollTop) {
					// Scroll down - sbalení navbaru okamžitě a změníme pozadí zpět na bílou
					navbar.classList.add("-translate-y-full");
					navbar.classList.remove("translate-y-0");
					navbar.classList.remove("bg-transparent");
					setTimeout(() => {
						navbar.classList.add("bg-[#FFF9F0]"); // Změníme pozadí zpět na bílou
					}, 430);
					scrollUpThreshold = 0; // Resetuje se, když uživatel scrolluje dolů
				} else {
					// Scroll up - čekáme, až bude scroll up větší než výška navbaru
					scrollUpThreshold += lastScrollTop - scrollTop;
					if (scrollUpThreshold >= navbarHeight * 2) {
						navbar.classList.add("translate-y-0");
						navbar.classList.remove("-translate-y-full");
					}
				}

				lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative scroll
			});
		} else {
			console.error("Navbar element not found!");
		}
	}, 200); // Počkejte .2 sekundy na to, až se html navbaru přidá do DOM
});
