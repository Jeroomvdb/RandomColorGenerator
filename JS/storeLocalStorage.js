// store colors localstorage

document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
      var color = document.body.style.backgroundColor;
  
      localStorage.setItem(color, color);
    }
  });