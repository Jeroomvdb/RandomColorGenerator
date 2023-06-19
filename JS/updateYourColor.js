// Update 'your colors' -> this works / with override of storage methods (see below for explanation)

function handleLocalStorageChange() {
  const colorImagesContainer = document.getElementById('colorImages');

  // Clear existing <div> elements
  while (colorImagesContainer.firstChild) {
    colorImagesContainer.firstChild.remove();
  }

  // Loop through localStorage key-value pairs and create <div> elements
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const colorValue = localStorage.getItem(key);

    // Create a new <div> element
    const newDiv = document.createElement('div');
    newDiv.style.width = '50px';
    newDiv.style.height = '50px';
    newDiv.style.background = colorValue;
    newDiv.className = 'col s4 yourColor';
    newDiv.style.cursor = 'pointer';

    // Attach onclick event to the new <div>
    newDiv.onclick = function () {
      Swal.fire({
        title: `Your color is: ${colorValue}`,
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#FAF9F6',
        backdrop: `${colorValue}80`,
        html: `<div style="display: flex; align-items: center; justify-content: center;">
              <div style="width: 80px; height: 80px; background-color: ${colorValue}; margin-right: 10px;"></div>
              </div>`,
        confirmButtonText: 'OK',
        cancelButtonText: 'Delete Color',
        showCancelButton: true,
        showCloseButton: true,
        buttonsStyling: true,
        customClass: {
          confirmButton: 'swal2-confirm',
          cancelButton: 'swal2-cancel'
        }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
          localStorage.removeItem(key); // Remove key-value pair from localStorage
          handleLocalStorageChange(); // Refresh the display after removal
        }
      });
    };

    // Append the new <div> to the container
    colorImagesContainer.appendChild(newDiv);
  }
}

  
  // Override the localStorage methods --- explanation below why
  
  // The code you provided should work correctly and log a message to the console when an item is added to the localStorage. However, there are a couple of things you should keep in mind:
  // The storage event is only triggered when changes are made to the localStorage from a different tab or window. It won't be triggered in the same tab or window where the changes are made. So, if you're testing the code by adding an item to the localStorage in the same tab or window where the code is running, the event won't be fired in that tab or window.
  // Make sure you're using a different origin (domain, protocol, and port) or different tabs/windows of the same origin to test the code. If you're testing the code in an environment where the localStorage is shared across different tabs or windows with the same origin, the event should be triggered correctly.
  // To test the code properly, open a new tab or a new window with the same origin and add an item to the localStorage there. Then switch to the tab or window where the code is running, and you should see the console.log statement executed.
  // If the code still doesn't log anything, please provide more details about the environment you are running the code in, the steps you're taking to test it, and any error messages you're encountering.
  
  // All build in methods can be custom modified if you want to -- this is what happens below
  
  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function(key, value) {
    originalSetItem.apply(this, arguments);
    handleLocalStorageChange();
  };
  
  const originalRemoveItem = localStorage.removeItem;
  localStorage.removeItem = function(key) {
    originalRemoveItem.apply(this, arguments);
    handleLocalStorageChange();
  };
  
  window.addEventListener('storage', handleLocalStorageChange);
  window.addEventListener('load', handleLocalStorageChange)
  
  
  
  // // ATILLA CODE -> works on load / not on storage
  // function updateYourColors(){
  //   let colors = []
  
  //   document.getElementById("colorImages").innerHTML = "";
  
  
  //   for(let i=0;i<localStorage.length;i++){
  //     let keyName = localStorage.key(i)
  
  //     document.getElementById("colorImages").innerHTML +=`<div style="width: 50px; height: 50px; background:${keyName};"></div>`
  //   }
  // }
  
  // window.addEventListener('storage', updateYourColors);
  // window.addEventListener('load', updateYourColors);
  