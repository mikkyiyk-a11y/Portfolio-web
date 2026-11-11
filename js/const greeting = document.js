const greeting = document.getElementById("greeting");

if (greeting) {
  const hour = new Date().getHours();

  if (hour < 12) {
    greeting.textContent = "Good morning";
  } else if (hour < 17) {
    greeting.textContent = "Good afternoon";
  } else {
    greeting.textContent = "Good evening";
  }
}