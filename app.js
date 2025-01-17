var item = 1;
var slider = document.getElementsByClassName('list')[0];
function showSlider(move){
    var  items = slider.getElementsByClassName('item');
    if(move === 1){
        slider.appendChild(items[0]);
        item += 1;
    }else{
        slider.prepend(items[items.length -1]);
        item -= 1;
    }
    checkAndEnlarge();
}

function showClick(sigmaparam) {
    for (var i = 0; i < Math.abs((4-item) + sigmaparam); i++) {
        var  items = slider.getElementsByClassName('item');
        slider.appendChild(items[0]);
      }
      item = sigmaparam;
    checkAndEnlarge();a
}

function checkAndEnlarge() {
    // Remove all possible classes
    for (var i = 1; i < 5; i++) {
        // Changed from classList.remove = to classList.remove()
        document.getElementById("glassbackground").classList.remove('on' + i);
    }
    
    var i;
    if (Math.abs(item % 4) === 0) {  // Simplified the condition
        i = 4;
    } else {
        i = Math.abs(item % 4);
    }
    
    // Changed from classList.add = to classList.add()
    document.getElementById("glassbackground").classList.add('on' + i);

}

const toggleBtn = document.querySelector(".toggle_btn");
const toggleBtnIcon = document.querySelector(".toggle_btn img");
const dropDownMenu = document.querySelector(".dropdown_menu");
toggleBtn.addEventListener("click", function () {
    const isOpen = dropDownMenu.classList.toggle("open");
    toggleBtnIcon.src = isOpen ? "svg/crss.svg" : "svg/3bar.svg";
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('header')
    const links = document.querySelector('.right-container')
    if (window.scrollY >= 20) {
        navbar.classList.add('scrolled');
        header.classList.add('scrolled');
        links.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
        header.classList.remove('scrolled');
        links.classList.remove('scrolled');
    }
});
