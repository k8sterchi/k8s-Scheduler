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

  // Call the updateTimeBlocks function on page load
  $(document).ready(function () {
    updateTimeBlocks();

    // Call the updateTimeBlocks function every minute to keep the styles up-to-date
    setInterval(updateTimeBlocks, 60000); // 60000 milliseconds = 1 minute
  });
  // Click listener for the save buttons
  $(".saveBtn").on("click", function () {
    const description = $(this).siblings(".description").val(); // Get the value from the textarea
    const hourId = $(this).parent().attr("id"); // Get the "hour-x" id of the time-block
    localStorage.setItem(hourId, description); // Use the "hour-x" id as the key to save the description in local storage

    // Log the saved data to the console
    console.log(`Saved: ${description}`);
  });
});

// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//
// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?
//
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
//
// TODO: Add code to display the current date in the header of the page.
