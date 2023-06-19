// variables

let previousX = 0;
let previousY = 0;


// change color on mouse move

window.addEventListener('mousemove', function(event) {
  const target = event.target;
  if (target === document.querySelector('.collapsible') || document.querySelector('.collapsible').contains(target)) {
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