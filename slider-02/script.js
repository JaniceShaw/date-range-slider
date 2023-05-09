// html elements
const slider = document.getElementById("myRange");
const output = document.getElementById("date-display");
// TODO: these will be dynamicaly made
const markers = document.querySelectorAll('.marker');

// settings
const minDays = 3; // to calculate the earliest date
const numberOfDays = 9; //0 is the first so there are 10 dates
// for the slider and positions
const step = (100 / numberOfDays).toFixed(1);
console.log("step", step);
const startPosition = 3 // is the fourth day option - 0 is first
const startValue = startPosition * step;

//position the markers
markers.forEach((marker, i) => {
  // need to offset it depending on value 
  const half = (markers.length + 1) / 2;
  let myOffset = (0 + i) * 0.01;

  if (i < half) {
    myOffset = (4 - i) * 0.1;
  }

  let markerPosition = (i * step) + myOffset;

  //if(step < 50){
  // console.log("step",(i*step),m);
  // console.log("FF",(i*step)+((i*step)*0.1));

  //}
  // marker.style.left = `${i*step}%`;
  //marker.style.left = `${(i*step)+((i*step)*0.5)}%`;
  marker.style.left = `${markerPosition}%`;
});

// set up slider
slider.value = startValue;
slider.step = step;

// make date from days
function addDays(days) {
  let date = new Date();
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString('en-GB');
}

const displayDate = function (val) {
  console.log(`@ ${val}%`);
  const value = val;
  const daysToAdd = (value / numberOfDays) + minDays;
  console.log("daysToAdd", daysToAdd);
  const outputValue = addDays(daysToAdd);

  output.innerHTML = outputValue;
}

displayDate(minDays * numberOfDays); // Display the default slider value

// update date when slider moved
//slider.oninput = function(){displayDate(slider.value)};
slider.oninput = () => displayDate(slider.value);
