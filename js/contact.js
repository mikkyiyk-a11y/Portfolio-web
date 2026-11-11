/* =========================================================
   CONTACT.JS - checks the contact form before it is sent

   "Form validation"
   "JavaScript validation should ensure:"
     - No field is empty                -> see Check 1
     - Email format is valid            -> see Check 2
     - Phone number contains only digits -> see Check 3
   ========================================================= */


/* ---------------------------------------------------------
   STEP 1: GRAB THE FORM AND ITS BOXES

   "DOM manipulation"
   --------------------------------------------------------- */
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");
const successMsg = document.getElementById("successMsg");
const errorTimers = new WeakMap();

// Allow the user to enter numbers, but show an error for them.
nameInput.addEventListener("input", function () {
  if (/[0-9]/.test(nameInput.value)) {
    showError(nameInput, "Name must contain letters only.");
  } else {
    clearError(nameInput);
  }
});


/* ---------------------------------------------------------
   STEP 2: HELPER FUNCTIONS TO SHOW / CLEAR AN ERROR

   "Functions"
   "DOM manipulation"
   --------------------------------------------------------- */

// Shows a red message under a box and gives the box a red border
function showError(input, message) {
  // Each box has an error span with the same id + "Error",
  // e.g. the box "email" has the span "emailError"
  const errorSpan = document.getElementById(input.id + "Error");
  errorSpan.textContent = message;   // DOM MANIPULATION: change the text
  input.classList.add("invalid");    // DOM MANIPULATION: add red border (see CSS)

  clearTimeout(errorTimers.get(input));
  const timer = setTimeout(function () {
    clearError(input);
  }, 3000);
  errorTimers.set(input, timer);
}

// Removes the red message and the red border
function clearError(input) {
  clearTimeout(errorTimers.get(input));
  errorTimers.delete(input);
  const errorSpan = document.getElementById(input.id + "Error");
  errorSpan.textContent = "";
  input.classList.remove("invalid");
}


/* ---------------------------------------------------------
   STEP 3: CHECK THE FORM WHEN "SEND MESSAGE" IS CLICKED

   "Event handling"
   --------------------------------------------------------- */
contactForm.addEventListener("submit", function (event) {
  // Stop the page from refreshing
  event.preventDefault();

  // We start by assuming the form is fine.
  // If any check fails, we change this to false.
  let isValid = true;

  // Hide the success box in case it is showing from before
  successMsg.style.display = "none";

  // ARRAYS: put all four boxes in an array so we can check them together
  const allInputs = [nameInput, emailInput, phoneInput, messageInput];


  // ===== CHECK 1: NO FIELD IS EMPTY =====
  // "No field is empty"
  allInputs.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, "This field cannot be empty.");
      isValid = false;
    } else {
      clearError(input);
    }
  });


  // ===== CHECK 2: EMAIL FORMAT IS VALID =====
  //  "Email format is valid"
  // This pattern means: some text, then @, then some text, then a dot, then some text
  // e.g. "victor@gmail.com" passes, "victor.gmail" fails
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Only check the format if the box is not empty (Check 1 handles empty)
  if (emailInput.value.trim() !== "" && !emailPattern.test(emailInput.value.trim())) {
    showError(emailInput, "Please enter a valid email, e.g. name@example.com");
    isValid = false;
  }


  // ===== CHECK NAME CONTAINS ONLY LETTERS =====
  const namePattern = /^[A-Za-z ]+$/;

  if (nameInput.value.trim() !== "" && !namePattern.test(nameInput.value)) {
    showError(nameInput, "Name must contain letters only.");
    isValid = false;
  }


  // ===== CHECK 3: PHONE NUMBER CONTAINS ONLY DIGITS =====
  //  "Phone number contains only digits"
  // This pattern means: only the numbers 0-9, from start (^) to end ($)
  const phonePattern = /^[0-9]+$/;

  if (phoneInput.value.trim() !== "" && !phonePattern.test(phoneInput.value.trim())) {
    showError(phoneInput, "Phone number must contain only digits (0-9).");
    isValid = false;
  }


  // ===== ALL CHECKS PASSED =====
  //  "Dynamic content updates" -> the success box appears
  if (isValid) {
    successMsg.style.display = "block";   // show the green box
    contactForm.reset();                  // empty all the boxes
  }
});
