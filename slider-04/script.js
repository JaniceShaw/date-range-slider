// slider data
const sliderData = [
  {
    date: "",
    option: true,
    label: "Express same day",
    selected: false,
    price: 430
  },
  {
    date: "",
    option: true,
    label: "A-Post",
    selected: false,
    price: 310
  },
  {
    date: "",
    options: false,
    selected: false
  },
  {
    date: "",
    option: true,
    label: "B-Post",
    selected: true,
    default: true,
    price: 230
  },
  {
    date: "",
    options: false,
    selected: false
  },
  {
    date: "",
    options: false,
    selected: false
  },
  {
    date: "",
    options: false,
    selected: false
  },
  {
    date: "",
    options: false,
    selected: false
  },
  {
    date: "",
    option: true,
    label: "B2-Post",
    selected: false,
    price: 180
  },
];

// html elements
const sliderContainer = document.querySelector('.slider-container');
const slider = document.getElementById("myRange");
const output = document.getElementById("date-display");
const labels = document.querySelectorAll('.option.marker');
const price = document.getElementById("price-display");
// temp calandar
const open = document.querySelector("[data-open-modal]");
const modal = document.querySelector("[data-modal]");
const close = document.querySelector("[data-close-modal]");

// settings
const minDays = 3; // to calculate the earliest date
const numberOfDays = sliderData.length - 1;
const step = (100 / numberOfDays).toFixed(1); // for the position of the markers
const startPosition = sliderData.findIndex(entry => entry.default === true);
const startPrice = sliderData[startPosition].price;

// used to work out which option to show as selected
let lastSelectedOption = startPosition;
const optionPositions = []; //[0,1,3,8]

sliderData.forEach((element, i) => {
  if (element.option) {
    optionPositions.push(i);
  }
});

// make date from days
function addDays(days) {
  const daysToAdd = minDays + days;
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return date.toLocaleDateString('en-GB');
}

const displayDate = function (val) {
  const daysToAdd = val;
  const outputValue = addDays(daysToAdd);
  output.innerHTML = outputValue;
}

// setup dates -- only for development 
sliderData.forEach((entry, i) => {
  let showDate = addDays(i);
  entry.date = showDate;
  // console.log(i, entry.label, entry.date);
});

//make markers from the array
function makeMarkers() {

  sliderData.forEach((marker, i) => {
    let newDiv;
    let label;

    newDiv = document.createElement('div');
    newDiv.classList.add("marker");
    if (marker.option) { newDiv.classList.add("option"); };
    if (marker.default) { newDiv.classList.add("default"); }
    if (marker.selected) { newDiv.classList.add("selected"); }

    //  to offset marker depending on value 
    const half = (sliderData.length + 1) / 2;
    let myOffset = (0 + i) * 0.01;

    if (i < half) {
      myOffset = (4 - i) * 0.1;
    }

    let markerPosition = (i * step) + myOffset;
    newDiv.style.left = `${markerPosition}%`;

    // add label if needed
    if (marker.label) {
      label = document.createElement('div');
      label.classList.add("marker__label");

      let textnode = document.createTextNode(marker.label);
      label.appendChild(textnode);
      newDiv.appendChild(label);

    }
    console.log(newDiv);

    sliderContainer.appendChild(newDiv);

  });
}

makeMarkers();
const markers = document.querySelectorAll('.marker'); // not sure if there is a better way to do this

// set up slider
slider.value = startPosition;
slider.max = numberOfDays;

displayDate(startPosition); // Display the default slider value
price.innerHTML = startPrice;

// update date when slider moves
slider.oninput = () => {
  const position = Number(slider.value)

  displayDate(position);
  updateSelected(position);
}

function updateSelected(marker) {
  const selectedElement = markers[marker];
  //
  price.innerHTML = sliderData[marker].price || startPrice;

  // check that selected marker is an option
  if (selectedElement.classList.length > 1) {

    //loop all markers
    markers.forEach((mark) => {
      let classNames = mark.classList;

      if (classNames.length > 1) {
        mark.classList.remove('selected');
      
      }
    });

    selectedElement.classList.add("selected");
    lastSelectedOption = marker;
  } else {
    //marker is not an option
    // need to check if current selected date is later than moved to marker (can check step number)
    // if is earliear need to update selected to the earlier option
    if (lastSelectedOption > marker) {
      //find last option selected and go back 1 in array
      const optionIndex = optionPositions.indexOf(lastSelectedOption)-1;
      const previousOption = optionPositions[optionIndex];
      //add selected class to previous option
      markers.forEach((mark, i) => {
        if (i == previousOption) {
          mark.classList.add('selected');
        } else {
          mark.classList.remove('selected');
        }
      });
    }
  }
}

open.addEventListener("click",()=> modal.showModal());
close.addEventListener("click",()=> modal.close());
