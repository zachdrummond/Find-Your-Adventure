$(document).ready(function () {
  /**
   * GLOBAL VARIABLES
   */
    var topicsArray = [""];

  /**
   * DOM ELEMENTS
   */
  var landingPageHeader = $("#landingPageHeader");
  var assessmentBtn = $("#assessmentBtn");
  var distanceBtn = $("#distanceBtn");
  var activityBtn = $("#activityBtn");
  var assessmentDiv = $("#assessmentDiv");
  var distanceDiv = $("#distanceDiv");
  var activityDiv = $("#activityDiv");
  var parkListDiv = $("#parkListDiv");
  var parkDiv = $("#parkDiv");
  var container = $("#container");
  var originalPage = $("#originalPage");
  /**
   * FUNCTION DEFINITIONS
   */
  function clearScreen() {
    originalPage.attr("style", "display:none");
  }

  /**
   * FUNCTION   CALLS
   */
  console.log("test3");
  /**
   * EVENT HANDLERS
   */
  activityBtn.on("click", function () {
    clearScreen();
  });

  // Event Listener - Loading Page Assessment Button
  assessmentBtn.on("click", function () {
    clearScreen();

    var questionHeader = $("<h1>");
    questionHeader.text("Which topic would you like to explore?");

    var option1 = $("<button type='button' class='btn btn-primary'>Option1</button>");
    var option2 = $("<button type='button' class='btn btn-primary'>Option2</button>");
    var option3 = $("<button type='button' class='btn btn-primary'>Option3</button>");
    var option4 = $("<button type='button' class='btn btn-primary'>Option4</button>");
    assessmentDiv.append(questionHeader, option1, option2, option3, option4);
    assessmentDiv.attr("class", ".display");
  });

  // Function to add event listener to distance button
  distanceBtn.on("click", function (event) {
    console.log("Distance button event handler");
  });
});
