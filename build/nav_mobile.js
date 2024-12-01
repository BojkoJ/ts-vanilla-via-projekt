const mobilenavbarHTML = `
  <nav
    id="navbar"
    class="sm:hidden inline-block fixed top-0 left-0 w-full text-neutral-900 z-50 h-[156px] transition-all transform bg-transparent"
  >
    <div
      class="h-[36px] w-full bg-[#262626] text-[11px] tracking-wide text-gray-50 flex items-center justify-center"
      id="countdown-container"
    >
      Our store at New Bahru opens in: 
      <span id="countdown" class="ml-2"></span>
      <button class="absolute right-3 cursor-pointer text-[9px]">x</button>
    </div>
    <div
      class="flex justify-between sm:justify-between items-center mx-10 text-[16px] h-[120px]"
    >

        <div id="hamburger-icon" class="flex flex-col justify-center items-center cursor-pointer space-y-2">
        <div class="w-8 h-0.5 bg-gray-600 transition-all duration-300 origin-center"></div>
        <div class="w-8 h-0.5 bg-gray-600 transition-all duration-300 origin-center"></div>
        </div>



        <div class="">
            <a href="./index.html">
            <img
                src="https://images.squarespace-cdn.com/content/v1/5f6effe2de91535318dd74a3/3eb06944-aca8-40f1-ad3a-509b04ae59bc/soilboy-logo_fa.png?format=1500w"
                alt="Logo"
                class="h-[24px]  blur-[.3px]"
            />
            </a>
        </div>

    
        <div class="flex h-full items-center">
            <img
                src="./cart.png"
                alt="Cart Icon"
                class="h-7 w-7 cursor-pointer"
            />
            <p>0</p>
        </div>
    </div>
  </nav>

    <div id="mobile-menu" class="relative ml-10 hidden bg-[#FFF9F0] h-screen w-full ">
        <div class="flex flex-col items-start justify-center h-[90vh]">
            <a id="plants-link" href="#" class="text-4xl flex items-center">
                Plants
                <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 mt-1 ml-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 4l8 8-8 8"
                />
                </svg>

            </a>
            <a href="./workshops.html" class="text-4xl mt-1">Workshops</a>
            <a href="#" class="text-4xl mt-1">Lifestyle</a>
            <a class="mt-9 cursor-pointer text-4xl" href="login">Login</a>
        </div>
        <div id="rest-nav" class="flex flex-col h-[10vh] -mt-16 w-1/2">
            <img
                src="./ig.png"
                alt="Instagram Icon"
                class="h-7 w-7 cursor-pointer"
            />     
            <a
                href=""
                class="text-center mt-10 border-2 border-gray-950 text-[18.3px] rounded-full py-2.5 px-4 hover:bg-[#19341E] hover:text-gray-50 transition-all"
            >Contact us</a>
        </div>
    
    </div>

`;

document.addEventListener("DOMContentLoaded", async () => {
	const navbarContainer = document.getElementById("navbar-container-mobile");

	if (navbarContainer) {
		// Insert the mobile navbar HTML into the container
		navbarContainer.innerHTML = mobilenavbarHTML;

		// Set up the countdown
		const countdownElement = document.getElementById("countdown");
		const targetDate = new Date("2025-01-01T00:00:00Z").getTime();

		const updateCountdown = () => {
			const now = new Date().getTime();
			const timeLeft = targetDate - now;

			if (timeLeft < 0) {
				countdownElement.innerHTML = "Our store is now open!";
				clearInterval(timer);
				return;
			}

			const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
			const hours = Math.floor(
				(timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			const minutes = Math.floor(
				(timeLeft % (1000 * 60 * 60)) / (1000 * 60)
			);
			const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

			countdownElement.innerHTML = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
		};

		const timer = setInterval(updateCountdown, 1000);
		updateCountdown(); // For immediate display

		// Toggle mobile menu
		let hamburger = document.getElementById("hamburger-icon");
		let mobileMenu = document.getElementById("mobile-menu");

		hamburger.addEventListener("click", () => {
			hamburger.classList.toggle("open");
			mobileMenu.classList.toggle("hidden");

			if (!mobileMenu.classList.contains("hidden")) {
				document.body.style.overflow = "hidden";
			} else {
				document.body.style.overflow = "auto";
			}
		});

		// Replace links functionality
		const plantsLink = document.getElementById("plants-link");
		const menuContainer = document.querySelector(
			"#mobile-menu > .flex.flex-col.items-start"
		);

		const restNav = document.getElementById("rest-nav");

		plantsLink.addEventListener("click", (e) => {
			e.preventDefault();

			// Hide the rest-nav during animation
			restNav.classList.add("hidden");

			// Add animation to old links
			const oldLinks = menuContainer.querySelectorAll("a");
			oldLinks.forEach((link) => {
				link.classList.add("slide-out-left");
			});

			// Wait for the old links to finish sliding out
			setTimeout(() => {
				// Replace links with new ones after animation
				menuContainer.innerHTML = `
                    <a id="back-link" href="#" class="text-4xl flex items-center mb-3 text-gray-500 slide-in-right">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6 mt-1 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M16 4L8 12l8 8"
                        />
                    </svg>
                    Back
                    </a>
                    <a href="#" class="text-4xl mt-1 slide-in-right">Potted Plants</a>
                    <a href="#" class="text-4xl mt-1 slide-in-right">Planters</a>
                    <a href="#" class="text-4xl mt-1 slide-in-right">Essentials</a>
                `;

				// Add event listener to the Back link
				const backLink = document.getElementById("back-link");
				backLink.addEventListener("click", (e) => {
					e.preventDefault();

					restNav.classList.remove("hidden");

					// Add animation to new links when Back is clicked
					const newLinks = menuContainer.querySelectorAll("a");
					newLinks.forEach((link) => {
						link.classList.add("slide-out-left");
					});

					// Wait for new links to slide out
					setTimeout(() => {
						// Restore original links
						menuContainer.innerHTML = `
                        <a id="plants-link" href="#" class="text-4xl flex items-center slide-in-right">
                            Plants
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-6 h-6 mt-1 ml-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M8 4l8 8-8 8"
                            />
                            </svg>
                        </a>
                        <a href="./workshops.html" class="text-4xl mt-1 slide-in-right">Workshops</a>
                        <a href="#" class="text-4xl mt-1 slide-in-right">Lifestyle</a>
                        <a class="mt-9 cursor-pointer text-4xl slide-in-right" href="login">Login</a>
                    `;

						// Reattach event listener to Plants link
						const restoredPlantsLink =
							document.getElementById("plants-link");
						restoredPlantsLink.addEventListener(
							"click",
							plantsLinkClickHandler
						);
					}, 500); // Matches the animation duration
				});
			}, 500); // Matches the animation duration
		});

		const plantsLinkClickHandler = (e) => {
			e.preventDefault();

			// Trigger the Plants link click functionality
			plantsLink.click();
		};
	} else {
		console.error("Navbar container not found!");
	}
});
