let flexDirection = ["row", "row-reverse", "column", "column-reverse"];
let justifyContent = ["flex-end", "center", "space-between", "space-around"];
let alignItems = ["flex-start", "flex-end", "center"];
let propertyObject = {
  flexDirection: flexDirection,
  justifyContent: justifyContent,
  alignItems: alignItems,
};
let flexValue; //an array to store the css text for js, and css HTML for display
let valueButtons; // the queryselector for newly created buttons
let inputListener = document.querySelector(".input"); //listen to the input text area
let nextBtnElement = document.querySelector(".btn-next"); //listen to the next button

// generate initial frames location
applyFlexValuesFrames();

inputListener.focus();

// apply flex values on the frames and display the answers in span.answer
function applyFlexValuesFrames() {
  flexValue = generateFlexValues();
  document.querySelector(".frames").style.cssText = flexValue.cssText; //apply css properties to .frames HTML elements
  document.querySelector(".answer").innerHTML = flexValue.cssHTML; //show the answer at span.answer
}

//generate flex values for the 3 properties
function generateFlexValues() {
  const directionValue =
    flexDirection[Math.floor(Math.random() * flexDirection.length)]; //randomly choose one value in the direction list
  const justifyContentValue =
    justifyContent[Math.floor(Math.random() * justifyContent.length)]; //randomly choose one value in the justifyContent list
  const alignItemsValue =
    alignItems[Math.floor(Math.random() * alignItems.length)]; //randomly choose one value in the alignItems list

  //generate css properties and values
  const cssText =
    "flex-direction: " +
    directionValue +
    "; justify-content: " +
    justifyContentValue +
    "; align-items: " +
    alignItemsValue +
    ";";
  const cssHTML =
    "flex-direction: <span>" +
    directionValue +
    ";</span> <br>justify-content: <span>" +
    justifyContentValue +
    ";</span> <br>align-items: <span>" +
    alignItemsValue +
    ";</span> <br> <span id = 'tip'> hover to reveal answer</span>";
  return { cssText: cssText, cssHTML: cssHTML };
  //cssText is all properties and values in one line
  //cssHTML has break lines and is easy to read
}

//the Next button being clicked
nextBtnElement.addEventListener("click", btnAction);

function btnAction() {
  // four things to do for this button:
  // 1. generate and set new position;
  // 2. clear the text area;
  // 3. set focus on text area;
  // 4. reset the shapes to original position;
  location.reload();
}

//add the text area properties to css of the shapes for every keydown
inputListener.addEventListener("keydown", (event) => {
  applyFlexValuesOnShapes(event);
});

// apply flex value on shapes, need to decide if values from keyboard or from mouse
function applyFlexValuesOnShapes(event) {
  let shapeFlexValue = "";

  if (event.type === "keydown") {
    shapeFlexValue = inputListener.value;
    shapeFlexValue = shapeFlexValue.replaceAll("\n", " ");
  } else if (event.type === "click") {
    // get property values from the buttons
    let selectedbtns = document.querySelectorAll(".selected");
    selectedbtns.forEach((elem) => {
      let PropertyClassName = elem.className.replace("value-btns ", "");
      PropertyClassName = PropertyClassName.replace(" selected", "");

      let valueObject = {
        flexDirection: "flex-direction: ",
        justifyContent: "justify-content: ",
        alignItems: "align-items: ",
      };
      shapeFlexValue =
        shapeFlexValue + valueObject[PropertyClassName] + elem.innerText + ";";
      shapeFlexValue = shapeFlexValue.replaceAll("\n", " ");
    });
  }

  document.querySelector(".shapes").style.cssText = shapeFlexValue;
}

//add event listener for the 3 property buttons.
let propertyButtons = document.querySelectorAll(".property-btns");
propertyButtons.forEach((elem) => {
  elem.addEventListener("click", (event) => {
    propertyBtnClick(event);
  });
});

//click on the property buttons
function propertyBtnClick(event) {
  let callingElem = event.target;
  let flexProperty = callingElem.className.replace("property-btns ", ""); // get the property name from the calling element's class name

  //if no value buttons, generate them
  if (callingElem.parentNode.childElementCount <= 1) {
    for (let i of propertyObject[flexProperty]) {
      let newBtn = document.createElement("button");
      newBtn.innerText = i;
      newBtn.className = "value-btns " + flexProperty;
      callingElem.insertAdjacentElement("afterend", newBtn);
    }
    //add event listeners for the buttons right after being inserted into html
    valueButtons = document.querySelectorAll(".value-btns");
    valueButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        valueBtnClick(event);
      });
    });
  }

  //if value buttons exists, display all the value buttons for that property
  valueButtons.forEach((button) => {
    if (button.className.includes(flexProperty)) {
      button.classList.remove("notshow");
    }
  });
}

// click on the value buttons
function valueBtnClick(event) {
  let callingElem = event.target;

  if (callingElem.className.includes("selected")) {
    callingElem.classList.remove("selected");
  }

  let flexProperty = callingElem.className.replace("value-btns ", "");

  //hide all the buttons with the same property
  valueButtons.forEach((element) => {
    if (element.className.includes(flexProperty)) {
      element.classList.add("notshow");
      element.classList.remove("selected");
    }
  });

  // make the calling button visible and selected
  callingElem.classList.remove("notshow");
  callingElem.classList.add("selected");
}

// the button areas being clicked
let btnArea = document.querySelector(".mobile-answers");
btnArea.addEventListener("click", (event) => {
  applyFlexValuesOnShapes(event);
});

//mobile-next button
let mobileNext = document.querySelector(".mobile-next");
mobileNext.addEventListener("click", btnAction);
