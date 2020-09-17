$(document).ready(function () {
  /**
   * GLOBAL VARIABLES
   **/
  var npsAPIkey = "PtYiGrnXjG4FL7v9tOprJACeJgJV4KxlTarrmWXF";
  var npsURL = `https://developer.nps.gov/api/v1/parks/?api_key=${npsAPIkey}&stateCode=`;
  var allParksInState = {};
  var listOfParksArray = [];
  var mapQuestAPIkey = "UKFuk0Xe7EAKnJmVEVb3gfUAKRVOlAzR";
  var mapsUrl = `https://www.mapquestapi.com/directions/v2/route?key=${mapQuestAPIkey}&`;
  var userAddress;
  var userAdventure = "";
  var object = {
    questions: ["Which topic would you like to explore?",
    "Which of the following activities most interests you?"
  ],
    activitiesArray: [
      "Camping",
      "Fishing",
      "Biking",
      "Shopping",
      "Guided Tours",
      "Wildlife Watching",
      "Hiking",
    ],
    topics: [
      "African American Heritage",
      "American Revolution",
      "Asian American Heritage",
      "Colonization and Settlement",
      "Great Depression",
      "Hispanic American Heritage",
      "Latino American Heritage",
      "LGBTQ American Heritage",
      "Military",
      "Monuments and Memorials",
      "Native American Heritage",
      "Pacific Islander Heritage",
      "Presidents",
      "Women's History",
    ]
  }

  /**
   * DOM ELEMENTS
   **/
  var landingPageHeader = $("#landingPageHeader");
  var topicsBtn = $("#topicsBtn");
  var distanceBtn = $("#distanceBtn");
  var activityBtn = $("#activityBtn");
  var topicsDiv = $("#topicsDiv");
  var distanceDiv = $("#distanceDiv");
  var activityDiv = $("#activityDiv");
  var parkListDiv = $("#parkListDiv");
  var parkDiv = $("#parkDiv");
  var container = $("#container");
  var originalPage = $("#originalPage");
  var addressSubmit = $("#addressSubmit");
  var inputAddress = $("#inputAddress");
  var inputCity = $("#inputCity");
  var inputState = $("#inputState");
  var inputZip = $("#inputZip");
  var parkDetails = $("#park-details");
  var parkDirectionsList = $("#directions-list");
  var parkDetailInfo = $("#park-detail-info");
  var parkName = $("#park-name");

  /**
   * FUNCTION DEFINITIONS
   */
  function clearScreen() {
    originalPage.attr("style", "display:none");
    activityDiv.empty();
    topicsDiv.empty();
  }

  // Function - AJAX Call using the State Code
  function ajaxCallState(state) {
    var stateParksURL = (npsURL += state);
    $.ajax({
      url: stateParksURL,
      method: "GET",
    }).then(function (response) {
      allParksInState = response;
    });
  }

  // Function - Creates a new page with buttons
  function createButtons(question, div, array) {
    clearScreen();

    var questionHeader = $("<h1>");
    questionHeader.text(question);
    div.append(questionHeader);
    div.attr("class", ".display");

    for (i = 0; i < array.length; i++) {
      var option = $(
        "<button type='button' class='btn btn-primary selection-btn'>" +
          array[i] +
          "</button>"
      );
      div.append(option);
    }
  }

  // Function - Creates a List of Parks
  function createListOfParks(userChoice) {
    var parks;

    for (var i = 0; i < allParksInState.data.length; i++) {
      if (userAdventure === "Activity") {
        parks = allParksInState.data[i].activities;
      } else if (userAdventure === "Topics") {
        parks = allParksInState.data[i].topics;
      }

      for (var j = 0; j < parks.length; j++) {
        if (parks[j].name === userChoice) {
          listOfParksArray.push(allParksInState.data[i]);
        }
      }
    }
  }

  // Function - Creates the Parks Page
  function createParksPage() {
    clearScreen();

    for (i = 0; i < listOfParksArray.length; i++) {
      // Adds Class Card-Deck to Activity Div
      activityDiv.attr("class", "card-deck row row-cols-3 mt-5");
      var colDiv = $("<div class='col mb-4'></div>");
      var cardDiv = $("<div class='card'></div>");

      var img = $(
        "<img class='card-img-top park-image' alt='park-image' style='height: 210px'/>"
      );
      if (listOfParksArray[i].images[0] != undefined) {
        img.attr("src", listOfParksArray[i].images[0].url);
      } else {
        img.attr(
          "src",
          "https://files.tripstodiscover.com/files/2018/08/32533575_1785635178193287_5065019941074239488_o.jpg"
        );
      }
      img.attr(
        "data-value",
        `${listOfParksArray[i].addresses[0].line1},  ${listOfParksArray[i].addresses[0].city}, ${listOfParksArray[i].addresses[0].stateCode} ${listOfParksArray[i].addresses[0].postalCode}`
      );

      img.attr({
        name: listOfParksArray[i].fullName,
        operatingHours: listOfParksArray[i].operatingHours[0].description,
        standardHours: JSON.stringify(
          listOfParksArray[i].operatingHours[0].standardHours
        ),
        entranceFees: listOfParksArray[i].entranceFees[0].cost,
        images: JSON.stringify(listOfParksArray[i].images),
      });

      // Creates Card-Body Div
      var cardBodyDiv = $("<div class='card-body'></div>");
      // Creates Card Header
      var h5 = $("<h5 class='card-title'></h5>");
      h5.text(listOfParksArray[i].fullName);
      // Creates Card Paragraph
      var p = $("<p class='card-text'></p>");
      p.text(
        `${listOfParksArray[i].addresses[0].city}, ${listOfParksArray[i].addresses[0].stateCode}`
      );

      cardBodyDiv.append(h5, p);
      cardDiv.append(img, cardBodyDiv);
      colDiv.append(cardDiv);
      activityDiv.append(colDiv);
    }
  }

  // Function - 
  function parseStandardHours(hoursString) {
    var standardHrs = JSON.parse(hoursString);
    standardHrs.Monday;
    var list = $("<ul class='hours'>");
    var listEl = $("<li>");
    listEl.text("Monday: " + standardHrs.Monday);
    list.append(listEl);

    listEl = $("<li>");
    listEl.text("Tuesday: " + standardHrs.Tuesday);
    list.append(listEl);

    listEl = $("<li>");
    listEl.text("Wednesday: " + standardHrs.Wednesday);
    list.append(listEl);

    listEl = $("<li>");
    listEl.text("Thursday: " + standardHrs.Thursday);
    list.append(listEl);
    parkDetailInfo.append(list);

    listEl = $("<li>");
    listEl.text("Friday: " + standardHrs.Friday);
    list.append(listEl);
    listEl = $("<li>");
    listEl.text("Saturday: " + standardHrs.Saturday);
    list.append(listEl);
    listEl = $("<li>");
    listEl.text("Sunday: " + standardHrs.Sunday);
    list.append(listEl);
  }

  /**
   * FUNCTION CALLS
   */

  /**
   * EVENT HANDLERS
   */

  addressSubmit.on("click", function (event) {
    event.preventDefault();
    distanceDiv.attr("class", "displayNone");
    originalPage.attr("class", "display");
    userAddress = `${inputAddress.val()}, ${inputCity.val()}, ${inputState.val()} ${inputZip.val()}`;

    ajaxCallState(inputState.val());
  });

  // ACTIVITY BUTTON SECTION START!
  activityBtn.on("click", function () {
    userAdventure = "Activity";
    var activitiesArray = [
      "Camping",
      "Fishing",
      "Biking",
      "Shopping",
      "Guided Tours",
      "Wildlife Watching",
      "Hiking",
      "Playground",
      "Junior Ranger Program",
      "Food",
    ];

    var question = "Which of the following activities most interests you?";
    createButtons(question, activityDiv, activitiesArray);
  });

  //event listener for the newly generated buttons
  activityDiv.on("click", ".btn", function () {
    var userChoice = $(this).text();
    createListOfParks(userChoice);
    createParksPage();
  });

  function parseStandardHours(hoursString) {
    var standardHrs = JSON.parse(hoursString);

    var list = $("<ul class='hours'>");
    var listEl = $("<li>");
    listEl.text("Monday: " + standardHrs.Monday);
    list.append(listEl);

    listEl = $("<li>");
    listEl.text("Tuesday: " + standardHrs.Tuesday);
    list.append(listEl);

    listEl = $("<li>");
    listEl.text("Wednesday: " + standardHrs.Wednesday);
    list.append(listEl);

    listEl = $("<li>");
    listEl.text("Thursday: " + standardHrs.Thursday);
    list.append(listEl);
    parkDetailInfo.append(list);

    listEl = $("<li>");
    listEl.text("Friday: " + standardHrs.Friday);
    list.append(listEl);
    listEl = $("<li>");
    listEl.text("Saturday: " + standardHrs.Saturday);
    list.append(listEl);
    listEl = $("<li>");
    listEl.text("Sunday: " + standardHrs.Sunday);
    list.append(listEl);
  }

  //Function to parse park images
  function parseParkImage(imagesObject) {
    var imagesArray = JSON.parse(imagesObject);
    if (imagesArray.length > 1) {
      for (var i = 0; i < 1; i++) {
        var imageEl = $("<img>");
        imageEl.attr("src", imagesArray[i].url);
        imageEl.attr("id", "park-detail-img");
        imageEl.attr("style", "height:200px;width:200px");
        parkDetailInfo.append(imageEl);
      }
    }
  }

  activityDiv.on("click", ".park-image", function () {
    clearScreen();

    // Fill in the selected park detail
    var parkNameText = $(this).attr("name");
    var parkOperatingHours = $(this).attr("operatingHours");
    parkName.text(parkNameText);
    var newParaEl = $("<p>").text("Operating Detail: " + parkOperatingHours);
    parkDetailInfo.append(newParaEl);
    newParaEl = $("<p class='operating-hours'>").text(
      "Standard Operating Hours"
    );
    parkDetailInfo.append(newParaEl);
    parseStandardHours($(this).attr("standardHours"));
    parseParkImage($(this).attr("images"));
    // var imageEl = $("<img>");
    // imageEl.attr("src", "https://via.placeholder.com/250/250");
    // imageEl.attr("id", "park-detail-img");
    // parkDetailInfo.append(imageEl);

    mapsUrl += `from=${userAddress}&to=${$(this).attr("data-value")}`;
    $.ajax({
      url: mapsUrl,
      method: "GET",
    }).then(function (response) {
      parkDetails.attr("style", "display:block");
      for (var i = 0; i < response.route.legs[0].maneuvers.length; i++) {
        // console.log(response.route.legs[0].maneuvers[i].narrative);
        var newParaEl = $("<p>");
        newParaEl.text(response.route.legs[0].maneuvers[i].narrative);
        parkDirectionsList.append(newParaEl);
      }
    });

    parkDetails.attr("style", "display:block");
  });

  // ACTIVITY BUTTON SECTION END

  // Event Listener - Loading Page Topics Button
  topicsBtn.on("click", function () {
    userAdventure = "Topics";
    var topicsArray = [
      "African American Heritage",
      "American Revolution",
      "Asian American Heritage",
      "Colonization and Settlement",
      "Great Depression",
      "Hispanic American Heritage",
      "Latino American Heritage",
      "LGBTQ American Heritage",
      "Military",
      "Monuments and Memorials",
      "Native American Heritage",
      "Pacific Islander Heritage",
      "Presidents",
      "Women's History",
    ];

    var question = "Which topic would you like to explore?";
    createButtons(question, topicsDiv, topicsArray);
  });

  topicsDiv.on("click", ".btn", function () {
    var userChoice = $(this).text();

    createListOfParks(userChoice);
    createParksPage();
  });
});
