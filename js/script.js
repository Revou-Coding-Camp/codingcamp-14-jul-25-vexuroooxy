document.addEventListener("DOMContentLoaded", function () {
  const welcomeMessageElement = document.getElementById("welcomeMessage");
  if (welcomeMessageElement) {
    let userName = prompt("Please enter your name:");
    if (userName) {
      welcomeMessageElement.textContent = `Hi ${userName}, Welcome To My Website!`;
    } else {
      welcomeMessageElement.textContent = "Hi Guest, Welcome to My Website!";
    }
  }

  const messageForm = document.getElementById("message-form");
  const currentTimeSpan = document.getElementById("current-time");
  const outputName = document.getElementById("output-name");
  const outputBirthDate = document.getElementById("output-birth-date");
  const outputGender = document.getElementById("output-gender");
  const outputMessage = document.getElementById("output-message");
  // Function to update current time
  function updateCurrentTime() {
    // Use the current date and time from the system.
    // For consistent output like the image, we'll format it.
    const now = new Date();
    const options = {
      weekday: "short", // e.g., 'Fri'
      day: "2-digit", // e.g., '18'
      month: "short", // e.g., 'Jul'
      year: "numeric", // e.g., '2025'
      hour: "2-digit", // e.g., '19'
      minute: "2-digit", // e.g., '19'
      second: "2-digit", // e.g., '31'
      //timeZoneName: "shortOffset", // e.g., 'GMT+07:00'
    };
    const formattedTime = now
      .toLocaleString("en-US", options)
      .replace(/,/g, ""); // Remove commas

    // Custom format to match the image: "Fri Jun 17 2022 17:27:36 GMT+0700"
    // Let's refine this to match the requested format as closely as possible,
    // specifically for the current time zone (WIB is GMT+0700)
    const datePart = now.toDateString(); // "Fri Jul 18 2025"
    const timePart = now.toTimeString().split(" ")[0]; // "19:19:31"
    const offset =
      "GMT+" +
      (now.getTimezoneOffset() / -60).toString().padStart(2, "0") +
      ":00"; // Calculates offset, e.g., GMT+07:00

    currentTimeSpan.textContent = `${datePart} ${timePart} ${offset}`;
  }

  // Set initial time and update every second
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000); // Update every second

  // Set default value for birth-date to today's date
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(today.getDate()).padStart(2, "0");
  document.getElementById("birth-date").value = `${year}-${month}-${day}`;

  // Handle form submission
  if (messageForm) {
    messageForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      // Get form values
      const name = document.getElementById("name").value;
      const birthDate = document.getElementById("birth-date").value;
      const gender = document.querySelector(
        'input[name="gender"]:checked'
      ).value;
      const message = document.getElementById("message").value;

      if (!name || !birthDate || !gender || !message) {
        alert("Please fill in all fields.");
        return;
      }

      // Display values in the output section
      outputName.textContent = name || ""; // Default from image
      outputBirthDate.textContent = birthDate || ""; // Default from image
      outputGender.textContent = gender || ""; // Default from image
      outputMessage.textContent = message || ""; // Default from image

      // You can add more logic here, like sending data to a server
      console.log("Form Submitted:", { name, birthDate, gender, message });
    });
  }

  // Initialize output details with default values from the image on page load
  outputName.textContent = "";
  outputBirthDate.textContent = "";
  outputGender.textContent = "";
  outputMessage.textContent = "";
});
