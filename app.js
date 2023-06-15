// variables

let previousX = 0;
let previousY = 0;
const ulElement = document.querySelector('.collapsible');


// change color on mouse move

window.addEventListener('mousemove', function(event) {
  const target = event.target;
  if (target === ulElement || ulElement.contains(target)) {
    return; // Exit the function, preventing further execution
  }
  
  let isSweetAlertPopup = false;
  let element = target;
  
  while (element !== null) {
    if (
      element.classList.contains("swal2-container") ||
      element.classList.contains("swal2-center") ||
      element.classList.contains("swal2-backdrop-show")
    ) {
      isSweetAlertPopup = true;
      break;
    }
    
    element = element.parentElement;
  }
  
  if (isSweetAlertPopup) {
    return;
  }

  // Rest of your code here
  let currentX = event.clientX;
  let currentY = event.clientY;
  
  // Calculate the distance moved in both X and Y directions
  let distanceX = Math.abs(currentX - previousX);
  let distanceY = Math.abs(currentY - previousY);

  // Check if the mouse has moved at least 10 pixels in either direction
  if (distanceX >= 50 || distanceY >= 50) {
    // Generate random RGB values
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    // Construct the RGB color string
    let color = 'rgb(' + red + ',' + green + ',' + blue + ')';

    // Apply the random color to the background
    document.body.style.backgroundColor = color;

    // Update the previous mouse coordinates
    previousX = currentX;
    previousY = currentY;
  }
});


// alert on color background

document.addEventListener('click', function(e){
  if (
    e.target.className !== "collapsible-header" &&
    e.target.tagName !== "I" &&
    e.target.tagName !== "A" &&
    !e.target.classList.contains("swal2-container") &&
    !e.target.classList.contains("swal2-center") &&
    !e.target.classList.contains("swal2-backdrop-show") &&
    !e.target.classList.contains("swal2-confirm")
  ) {
    Swal.fire({
      title: `Your color is: ${document.body.style.backgroundColor}`,
      width: 600,
      padding: '3em',
      color: '#716add',
      background: '#FAF9F6',
      backdrop: `${document.body.style.backgroundColor}80`,
      html: `<div style="display: flex; align-items: center; justify-content: center;">
            <div style="width: 80px; height: 80px; background-color: ${document.body.style.backgroundColor}; margin-right: 10px;"></div>
         </div>`
    })
  }
});


//random daily color

function generateRandomColor() {
  let date = new Date();
  let dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));

  // Use the day of the year as a seed for the random color
  let seed = dayOfYear;

  // Generate random RGB values using the seed
  let red = Math.abs(Math.sin(seed + 1)) * 256;
  let green = Math.abs(Math.sin(seed + 2)) * 256;
  let blue = Math.abs(Math.sin(seed + 3)) * 256;

  // Round the RGB values to integers
  red = Math.floor(red);
  green = Math.floor(green);
  blue = Math.floor(blue);

  // Construct the RGB color string
  let color = 'rgb(' + red + ', ' + green + ', ' + blue + ')';

  // return color;
  document.body.style.backgroundColor = color;
  

  setTimeout(function() {
    Swal.fire({
      title: `The color of the day is: ${document.body.style.backgroundColor}`,
      width: 600,
      padding: '3em',
      color: '#716add',
      background: '#FAF9F6',
      backdrop: `${document.body.style.backgroundColor}80`,
      html: `<div style="display: flex; align-items: center; justify-content: center;">
            <div style="width: 80px; height: 80px; background-color: ${document.body.style.backgroundColor}; margin-right: 10px;"></div>
         </div>`
    })

  }, 20); // Adjust the delay time as needed
}


// store colors localstorage

document.addEventListener('keydown', function (event) {
  if (event.code === 'Space') {
    var color = document.body.style.backgroundColor;

    localStorage.setItem(color, color);
  }
});




// // Update 'your colors' -> this works / with override of storage methods (see below for explanation)

// function handleLocalStorageChange() {
//   const colorImagesContainer = document.getElementById('colorImages');

//   // Clear existing <div> elements
//   while (colorImagesContainer.firstChild) {
//     colorImagesContainer.firstChild.remove();
//   }

//   // Loop through localStorage key-value pairs and create <div> elements
//   for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i);
//     const colorValue = localStorage.getItem(key);

//     // Create a new <div> element
//     const newDiv = document.createElement('div');
//     newDiv.style.width = '50px';
//     newDiv.style.height = '50px';
//     newDiv.style.background = colorValue;
//     newDiv.className='col s4'

//     // Append the new <div> to the container
//     colorImagesContainer.appendChild(newDiv);
//   }
// }

// // Override the localStorage methods --- explanation below why

// // The code you provided should work correctly and log a message to the console when an item is added to the localStorage. However, there are a couple of things you should keep in mind:
// // The storage event is only triggered when changes are made to the localStorage from a different tab or window. It won't be triggered in the same tab or window where the changes are made. So, if you're testing the code by adding an item to the localStorage in the same tab or window where the code is running, the event won't be fired in that tab or window.
// // Make sure you're using a different origin (domain, protocol, and port) or different tabs/windows of the same origin to test the code. If you're testing the code in an environment where the localStorage is shared across different tabs or windows with the same origin, the event should be triggered correctly.
// // To test the code properly, open a new tab or a new window with the same origin and add an item to the localStorage there. Then switch to the tab or window where the code is running, and you should see the console.log statement executed.
// // If the code still doesn't log anything, please provide more details about the environment you are running the code in, the steps you're taking to test it, and any error messages you're encountering.


// const originalSetItem = localStorage.setItem;
// localStorage.setItem = function(key, value) {
//   originalSetItem.apply(this, arguments);
//   handleLocalStorageChange();
// };

// const originalRemoveItem = localStorage.removeItem;
// localStorage.removeItem = function(key) {
//   originalRemoveItem.apply(this, arguments);
//   handleLocalStorageChange();
// };

// window.addEventListener('storage', handleLocalStorageChange);
// window.addEventListener('load', handleLocalStorageChange)



// ATILLA CODE -> works on load / not on storage
function updateYourColors(){
  let colors = []

  document.getElementById("colorImages").innerHTML = "";


  for(let i=0;i<localStorage.length;i++){
    let keyName = localStorage.key(i)

    document.getElementById("colorImages").innerHTML +=`<div style="width: 50px; height: 50px; background:${keyName};"></div>`
  }
}

window.addEventListener('storage', updateYourColors);
window.addEventListener('load', updateYourColors);







//Materialize dropdown menu JS

document.addEventListener('DOMContentLoaded', function() {
  let elems = document.querySelectorAll('.collapsible');
  let instances = M.Collapsible.init(elems, {});
});