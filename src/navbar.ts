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

				// Zkontrolujeme, zda uživatel scrolloval úplně nahoru
				if (scrollTop === 0) {
					setTimeout(() => {
						// Rozbalíme navbar a změníme jeho pozadí na transparentní
						navbar.classList.add("translate-y-0");
						navbar.classList.remove("-translate-y-full");
						navbar.classList.add("bg-transparent"); // Změníme pozadí na transparentní
						navbar.classList.remove("bg-[#FFF9F0]"); // Odstraníme případnou bílou barvu pozadí
					}, 430);
					scrollUpThreshold = 0; // Resetujeme scrollUpThreshold
				} else if (scrollTop > lastScrollTop) {
					// Scroll down - sbalení navbaru okamžitě a změníme pozadí zpět na bílou
					setTimeout(() => {
						navbar.classList.add("-translate-y-full");
						navbar.classList.remove("translate-y-0");
						navbar.classList.remove("bg-transparent");
						navbar.classList.add("bg-[#FFF9F0]"); // Změníme pozadí zpět na bílou
					}, 250);
					scrollUpThreshold = 0; // Resetuje se, když uživatel scrolluje dolů
				} else {
					// Scroll up - čekáme, až bude scroll up větší než výška navbaru
					scrollUpThreshold += lastScrollTop - scrollTop;
					if (scrollUpThreshold >= navbarHeight / 1.3) {
						navbar.classList.add("translate-y-0");
						navbar.classList.remove("-translate-y-full");
					}
				}

				lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative scroll
			});
		} else {
			console.error("Navbar element not found!");
		}
	}, 100); // Počkejte .1 sekundy na to, až se html navbaru přidá do DOM
});
