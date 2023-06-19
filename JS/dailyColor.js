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