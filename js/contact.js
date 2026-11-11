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
const sendButton = contactForm.querySelector('button[type="submit"]');
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
contactForm.addEventListener("submit", async function (event) {
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
  if (!isValid) {
    return;
  }

  // A normal form POST avoids fetch/CORS restrictions on file:// pages.
  if (window.location.protocol === "file:") {
    sendButton.disabled = true;
    sendButton.textContent = "Sending...";
    contactForm.submit();
    return;
  }

  const originalButtonText = sendButton.textContent;
  sendButton.disabled = true;
  sendButton.textContent = "Sending...";

  try {
    const response = await fetch("https://formsubmit.co/ajax/mikkyiyk@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        message: messageInput.value.trim(),
        _subject: "New message from your portfolio"
      })
    });
    const result = await response.json();

    if (!response.ok || (result.success !== true && result.success !== "true")) {
      throw new Error("The email service did not accept the message.");
    }

    successMsg.textContent = "Thank you! Your message has been sent.";
    successMsg.classList.remove("delivery-error");
    successMsg.style.display = "block";
    contactForm.reset();
  } catch (error) {
    if (error instanceof TypeError) {
      successMsg.textContent = "Could not connect to the email service. Open this site through HTTP/HTTPS, check your connection, and confirm the inbox with FormSubmit.";
    } else {
      successMsg.textContent = `The email service rejected the message: ${error.message} Please try again or email mikkyiyk@gmail.com directly.`;
    }
    successMsg.classList.add("delivery-error");
    successMsg.style.display = "block";
  } finally {
    sendButton.disabled = false;
    sendButton.textContent = originalButtonText;
  }
});
