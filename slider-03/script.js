// html elements
const slider = document.getElementById("myRange");
const output = document.getElementById("date-display");
// TODO: these will be dynamicaly made
const markers = document.querySelectorAll('.marker');
const labels = document.querySelectorAll('.option.marker');
console.log("labels",labels);

// settings
const minDays = 3; // to calculate the earliest date
const numberOfDays = 9; //0 is the first so there are 10 dates
// for the position of the markers
const step = (100 / numberOfDays).toFixed(1);
console.log("step for marker %", step);
const startPosition = 3 // is the fourth day option - 0 is first

//position the markers
markers.forEach((marker, i) => {
  // need to offset it depending on value 
  const half = (markers.length + 1) / 2;
  let myOffset = (0 + i) * 0.01;

  if (i < half) {
    myOffset = (4 - i) * 0.1;
  }

  let markerPosition = (i * step) + myOffset;
  marker.style.left = `${markerPosition}%`;
});

// set up slider
slider.value = startPosition;
slider.max = numberOfDays;

// make date from days
function addDays(days) {
  const daysToAdd = minDays+days;
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return date.toLocaleDateString('en-GB');
}

const displayDate = function (val) {
  // console.log(`displayDate: days to add ${val}`);
  const daysToAdd = val;
  const outputValue = addDays(daysToAdd);
  output.innerHTML = outputValue;
}

displayDate(startPosition); // Display the default slider value

// update date when slider moved
slider.oninput = () => displayDate(Number(slider.value));
