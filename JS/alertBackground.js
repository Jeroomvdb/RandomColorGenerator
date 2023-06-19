// alert on color background

document.addEventListener('click', function(e){
  //console.log(e.target.className)  
  if (
    !e.target.closest("#menu") &&
    !e.target.classList.contains("swal2-container") &&
    !e.target.classList.contains("swal2-center") &&
    !e.target.classList.contains("swal2-backdrop-show") &&
    !e.target.classList.contains("swal2-confirm") &&
    // !e.target.classList.contains("swal2-shown") &&
    // !e.target.classList.contains("swal2-height-auto")
    !e.target.closest(".swal2-shown.swal2-height-auto")
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