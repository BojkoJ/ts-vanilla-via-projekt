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

				lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Zabránit negative scroll
			});

			// Kód pro modal
			const loginButton = document.querySelector(
				"#navbar a[href='login']"
			);

			const modal = document.getElementById("login-modal");

			const loginForm = document.getElementById("login-form");
			const registerForm = document.getElementById("register-form");
			const showRegisterLink = document.getElementById("show-register");
			const showLoginLink = document.getElementById("show-login");

			// User button - pouze pokud je uživatel přihlášen
			const userButton = document.querySelector("#navbar a[href='user']");

			if (loginButton && modal) {
				loginButton.addEventListener("click", (event) => {
					event.preventDefault();
					modal.style.display = "flex";
					loginForm.classList.remove("hidden");
					registerForm.classList.add("hidden");
				});

				modal.addEventListener("click", (event) => {
					if (event.target === modal) {
						modal.style.display = "none";
					}
				});

				// Přepnutí na registrační formulář
				showRegisterLink.addEventListener("click", (event) => {
					event.preventDefault();
					loginForm.classList.add("hidden");
					registerForm.classList.remove("hidden");
				});

				// Přepnutí na přihlašovací formulář
				showLoginLink.addEventListener("click", (event) => {
					event.preventDefault();
					registerForm.classList.add("hidden");
					loginForm.classList.remove("hidden");
				});
			}
		} else {
			console.error("Navbar element not found!");
		}
	}, 300); // Počkejte .3 sekundy na to, až se html navbaru přidá do DOM
});
