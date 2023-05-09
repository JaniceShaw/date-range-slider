const slider = document.getElementById("myRange");
const output = document.getElementById("date-display");
//const today = new Date();
//const displayDate = today.toLocaleDateString('en-GB');
//console.log(today);
const minDays = 3;
const numberOfDays = 11;


function addDays(days) {
  let date = new Date();
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString('en-GB');
}

const newDate = addDays(5);

// 2022-05-20T00:00:00.000Z
console.log(newDate);

output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  const value = this.value;
  const daysToAdd = (value / numberOfDays) + minDays;
  const outputValue = addDays(daysToAdd);

  output.innerHTML = outputValue;
}