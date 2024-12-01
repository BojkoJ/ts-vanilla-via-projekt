const navbarHTML = `
  <nav
    id="navbar"
    class="hidden sm:inline-block fixed top-0 left-0 w-full text-neutral-900 z-50 h-[156px] transition-all transform bg-transparent"
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
      class="flex justify-around sm:justify-between items-center ml-20 mr-16 text-[16px] h-[120px]"
    >
      <div class="flex gap-x-8 relative">
        <div class="group relative">
          <a href="#" class="relative text-neutral-900 hover:text-neutral-700">Plants</a>
          <!-- Podnabídka -->
          <div
            class="absolute w-[250px] top-full left-0 hidden group-hover:flex flex-col gap-y-[0.02rem] py-2 z-50"
          >
            <a href="#" class="pt-3 text-neutral-900">Potted plants</a>
            <a href="#" class="text-neutral-900">Planters</a>
            <a href="#" class="text-neutral-900">Essentials</a>
          </div>
        </div>
        <a href="./workshops.html" class="text-neutral-900 hover:text-neutral-700 ws-link">Workshops</a>
        <a href="#" class="text-neutral-900 hover:text-neutral-700">Lifestyle</a>
      </div>
      <div class="">
        <a href="./index.html">
          <img
            src="https://images.squarespace-cdn.com/content/v1/5f6effe2de91535318dd74a3/3eb06944-aca8-40f1-ad3a-509b04ae59bc/soilboy-logo_fa.png?format=1500w"
            alt="Logo"
            class="h-[41px] ml-[70px] blur-[.3px]"
          />
        </a>
      </div>
      <div
        class="flex justify-evenly w-[345px] h-full items-center gap-x-6"
      >
        <a class="cursor-pointer hidden sm:inline-block" href="login">Login</a>
        <a class="cursor-pointer hidden" href="user">User</a>
        <img
          src="./ig.png"
          alt="Instagram Icon"
          class="h-5 w-5 cursor-pointer hidden sm:inline-block"
        />
        <div class="flex h-full items-center">
          <img
            src="./cart.png"
            alt="Cart Icon"
            class="h-7 w-7 mr-1 cursor-pointer"
          />
          <p>0</p>
        </div>
        <a
          href="./contact.html"
          class="hidden sm:inline-block border-2 border-gray-950 rounded-full p text-[14px] py-1 px-3 hover:bg-[#19341E] hover:text-gray-50 transition-all"
          >Contact us</a
        >
      </div>
    </div>
  </nav>
`;

document.addEventListener("DOMContentLoaded", async () => {
	const navbarContainer = document.getElementById("navbar-container");

	if (navbarContainer) {
		// Vlož inline HTML šablonu do navbar-container
		navbarContainer.innerHTML = navbarHTML;

		// Nastavte odpočet
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
		updateCountdown(); // Pro okamžité zobrazení
	} else {
		console.error("Navbar container nebyl nalezen!");
	}
});
