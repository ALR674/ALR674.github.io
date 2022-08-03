//for the mobile & tablet drop down navigation menu
var menuOpen = false; //used to decide what degree to rotate the menu icon to
let menu = document.querySelector("#menu"); //find the menu icon img
let dropDown = document.querySelector(".navi"); //find drop down menu
menu.addEventListener("click", ()=> {
    var rotationDegree = menuOpen ? 0 : 90; //if menu is open, rotate back to OG position
        //else rotate to 90 degree
    var scalingBy = menuOpen ? 1 : -0.5;
    dropDown.classList.toggle("hidden");
    //menu.style.transform = 'rotate('+rotationDegree+'deg)';
    menu.style.transform = 'scale('+scalingBy+','+scalingBy+')';
    menuOpen = !menuOpen;
});

let opened; /* stores which pop up is opened, used to decide which pop up to close when the x close button of a pop up is pressed */

let expandables = document.querySelectorAll(".clickToExpand");
for (let i = 0; i < expandables.length; i++)
{
    expandables[i].addEventListener("click", ()=> {
        expandables[i].nextElementSibling.classList.toggle("hidden");
        opened = expandables[i].nextElementSibling; /* stores the revealed section/opened pop up as opened */
    })
}

let popupCloseButton = document.querySelectorAll(".close");
for (let i = 0; i < popupCloseButton.length; i++)
{
    popupCloseButton[i].addEventListener("click", ()=> {
        opened.classList.add("hidden"); /*closes the last opened element */
    })
}

function showHideContent(e) {
    e.currentTarget.classList.toggle("hidden");
}