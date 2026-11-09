/* =========================================================
   MAIN.JS - small things used on EVERY page
     1. The ☰ mobile menu button
     2. The "Good morning / afternoon / evening" greeting
     3. The current year in the footer
   ========================================================= */


/* ---------------------------------------------------------
   1. MOBILE MENU BUTTON

   PDF REQUIREMENT: "Event handling"
   PDF REQUIREMENT: "DOM manipulation"
   PDF REQUIREMENT: "Mobile-friendly interface"
   --------------------------------------------------------- */

// DOM MANIPULATION: find the ☰ button on the page using its id
const menuBtn = document.getElementById("menuBtn");

// DOM MANIPULATION: find the list of nav links using its id
const navLinks = document.getElementById("navLinks");

// EVENT HANDLING: run this code every time the ☰ button is clicked
menuBtn.addEventListener("click", function () {
  // DOM MANIPULATION: add the class "open" if it is not there,
  // or remove it if it is. The CSS shows the menu when "open" is there.
  navLinks.classList.toggle("open");
});


/* ---------------------------------------------------------
   2. GREETING ON THE HOMEPAGE

   PDF REQUIREMENT: "Dynamic content updates"
   -> the welcome text changes depending on the time of day
   --------------------------------------------------------- */

// Find the <span id="greeting">. Only the homepage has it.
const greeting = document.getElementById("greeting");

// Only run this if the greeting exists on this page
if (greeting) {
  // Get the current hour from the computer clock (0 to 23)
  const hour = new Date().getHours();

  // Choose the right words for the time of day
  if (hour < 12) {
    greeting.textContent = "Good morning";     // before 12pm
  } else if (hour < 17) {
    greeting.textContent = "Good afternoon";   // 12pm to 4:59pm
  } else {
    greeting.textContent = "Good evening";     // 5pm and later
  }
}


/* ---------------------------------------------------------
   3. YEAR IN THE FOOTER

   PDF REQUIREMENT: "DOM manipulation"
   -> puts this year's number into <span id="year">
      so you never have to update it by hand
   --------------------------------------------------------- */
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}
