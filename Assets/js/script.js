// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Function to update the time block classes based on the current hour
  function updateTimeBlocks() {
    const currentHour = dayjs().hour(); // Get the current hour (0-23) using dayjs

  // Log the current hour to the console
    console.log("Current Hour:", currentHour);

  // Loop through each time block
    $(".time-block").each(function () {
      const hour = parseInt($(this).attr("id").split("-")[1]); // Extract the hour from the id
      if (hour < currentHour) {
        $(this).addClass("past").removeClass("present future");
      } else if (hour === currentHour) {
        $(this).addClass("present").removeClass("past future");
      } else {
        $(this).addClass("future").removeClass("past present");
      }
    });
  }

   // Function to load user input from localStorage
   function loadUserInput() {
    $(".time-block").each(function () {
      const hourId = $(this).attr("id"); // Get the "hour-x" id of the time-block
      const savedDescription = localStorage.getItem(hourId); // Retrieve the saved description from localStorage

      // Set the value of the corresponding textarea element
      $(this).find(".description").val(savedDescription);
    });
  }

  // Call the updateTimeBlocks function on page load
  $(document).ready(function () {
    updateTimeBlocks();

  // Call the updateTimeBlocks function every minute to keep the styles up-to-date
    setInterval(updateTimeBlocks, 60000); // 60000 milliseconds = 1 minute
 // Load user input from localStorage on page load
 loadUserInput();
  });
  // Click listener for the save buttons--
  // In the click listener function, $(this) refers to the clicked save button. 
  // Using the siblings() method, traverse DOM to find the sibling element with 
  // the class description, which is the textarea containing the user input. 
  // then, use the val() method to get the value of the textarea, which is the user input.
  $(".saveBtn").on("click", function () {
    const hourId = $(this).closest(".time-block").attr("id"); // Get the "hour-x" id of the containing time-block
    const userInput = $(this).siblings(".description").val(); // Get the user input from the textarea

    // Save the user input to localStorage using the hourId as the key
    localStorage.setItem(hourId, userInput);

    console.log("User input saved:", userInput);
  });
});

