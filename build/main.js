// HTML šablona navbaru jako string
const navbarHTML = `
  <nav
    id="navbar"
    class="fixed top-0 left-0 w-full text-neutral-900 z-50 h-[156px] transition-all transform bg-transparent"
  >
    <div
      class="h-[36px] w-full bg-[#262626] text-[11px] tracking-wide text-gray-50 flex items-center justify-center"
    >
      Our store at New Bahru is now open
      <button class="absolute right-3 cursor-pointer text-[9px]">x</button>
    </div>
    <div
      class="flex justify-between items-center ml-20 mr-16 text-[16px] h-[120px]"
      >
    <div class="flex gap-x-8 relative">
      <div class="group relative">
        <a href="#" class="relative text-neutral-900 hover:text-neutral-700">Plants</a>
        <!-- Podnabídka -->
        <div
          class="absolute w-[250px] top-full left-0 hidden group-hover:flex flex-col gap-y-[0.02rem] py-2 z-50"
        >
          <a
            href="#"
            class="pt-3 text-neutral-900"
            >Potted plants</a
          >
          <a
            href="#"
            class="text-neutral-900"
            >Planters</a
          >
          <a
            href="#"
            class="text-neutral-900"
            >Essentials</a
          >
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
        <a class="cursor-pointer" href="login">Login</a>
        <a class="cursor-pointer hidden" href="user">User</a>

        <img
          src="./ig.png"
          alt="Instagram Icon"
          class="h-5 w-5 cursor-pointer"
        />
        <div class="flex h-full items-center">
          <img
            src="./cart.png"
            alt="Instagram Icon"
            class="h-7 w-7 mr-1 cursor-pointer"
          />
          <p>0</p>
        </div>
        <a
          href="./contact.html"
          class="border-2 border-gray-950 rounded-full p text-[14px] py-1 px-3 hover:bg-[#19341E] hover:text-gray-50 transition-all"
          >Contact us</a
        >
      </div>
    </div>
  </nav>
  <div
    id="login-modal"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden z-50"
  >
    <div class="bg-white rounded-lg w-[480px] py-8 px-10 shadow-lg relative">
      <!-- Login Form -->
      <div id="login-form">
        <h2 class="text-[1.4rem] my-4 text-center tracking-tight">
          Welcome to Soilboy
        </h2>
        <form id="login-form">
          <div class="">
            <input
              class="appearance-none border-b rounded w-full py-4 px-3 leading-tight text-xs"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div class="mb-5">
            <input
              class="appearance-none border-b rounded w-full py-4 px-3 leading-tight text-xs"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <button
            class="bg-[#3e3e3e] text-white py-3 pt-3 pb-4 w-full rounded focus:outline-none text-xs"
          >
            Sign in
          </button>
        </form>
        <p
          class="mt-3 text-center flex w-full items-center justify-center gap-x-4 tracking-tight"
        >
          <a href="#" id="" class="text-gray-500 text-xs"
            >Forgot password?</a
          >
          <a
            href="register"
            id="show-register"
            class="text-xs text-gray-500"
            >Create account</a
          >
        </p>
        <p id="message"></p>
      </div>

      <!-- Register Form -->
      <div id="register-form" class="hidden">
        <h2 class="text-[1.4rem] my-4 text-center tracking-tight">
          Create Account
        </h2>
        <form id="register-form">
          <div class="flex">
            <div class="w-1/2 pr-2">
              <input
                class="appearance-none border-b rounded w-full py-4 px-3 leading-tight text-xs"
                id="first-name"
                type="text"
                placeholder="First Name"
              />
            </div>

            <div class="w-1/2 pl-2">
              <input
                class="appearance-none border-b rounded w-full py-4 px-3 leading-tight text-xs"
                id="last-name"
                type="text"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div class="">
            <input
              class="appearance-none border-b rounded w-full py-4 px-3 leading-tight text-xs"
              id="register-email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div class="">
            <input
              class="appearance-none border-b rounded w-full py-4 px-3 leading-tight text-xs"
              id="register-password"
              type="password"
              placeholder="Create Password"
            />
          </div>
          <div class="mb-5">
            <input
              class="appearance-none border-b rounded w-full py-4 px-3 leading-tight text-xs"
              id="confirm-password"
              type="password"
              placeholder="Re-type Password"
            />
          </div>
          <button
            class="bg-[#3e3e3e] text-white py-3 pt-3 pb-4 w-full rounded focus:outline-none text-xs"
          >
            Create account
          </button>
        </form>
        <p
          class="mt-3 text-center flex w-full items-center justify-center gap-x-4 tracking-tight"
        >
          <a href="#" id="show-login" class="text-xs text-gray-500"
            >Already have an account? Sign in</a
          >
        </p>
        <p id="message-reg"></p>
      </div>
    </div>
  </div>
`;

document.addEventListener("DOMContentLoaded", async () => {
	const navbarContainer = document.getElementById("navbar-container");

	if (navbarContainer) {
		// Vlož inline HTML šablonu do navbar-container
		navbarContainer.innerHTML = navbarHTML;
	} else {
		console.error("Navbar container nebyl nalezen!");
	}
});
