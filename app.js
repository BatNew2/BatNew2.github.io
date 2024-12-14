document.getElementById("energy1").style.transform = 'scale(1.3)';
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
    for (var i = 0; i < Math.abs(item % 4 - sigmaparam); i++) {
        var  items = slider.getElementsByClassName('item');
        slider.appendChild(items[0]);
      }
      item = sigmaparam
    checkAndEnlarge();
}

function checkAndEnlarge() {
    for (var i = 1; i < 5; i++) {
        document.getElementById("energy" + i).style.transform = 'scale(1)';
    }
    var i;
    if("energy" + Math.abs(item%4) == "energy0") {
        var i = 4;
    } else {
        var i = Math.abs(item%4)
    }
    document.getElementById("energy" + i).style.transform = 'scale(1.3)';
}

const toggleBtn = document.querySelector(".toggle_btn");
const toggleBtnIcon = document.querySelector(".toggle_btn img");
const dropDownMenu = document.querySelector(".dropdown_menu");
toggleBtn.addEventListener("click", function () {
const isOpen = dropDownMenu.classList.toggle("open");
toggleBtnIcon.src = isOpen ? "svg/crss.svg" : "svg/3bar.svg";
});

