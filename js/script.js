//for the mobile & tablet drop down navigation menu
var menuOpen = false; //used to decide what degree to rotate the menu icon to
let menu = document.querySelector("#menu"); //find the menu icon img
let dropDown = document.querySelector(".navi"); //find drop down menu
menu.addEventListener("click", ()=> {
    var rotationDegree = menuOpen ? 0 : 90; //if menu is open, rotate back to OG position
        //else rotate to 90 degree
    var scalingBy = menuOpen ? 1 : -0.75;
     /* if dropDown is open, aka maxHeight isn't 0 so text is showing */
     if (dropDown.style.maxHeight) {
        dropDown.style.maxHeight = null; /* set maxHeight to 0 */
    }
     /* if dropDown has a maxHeight of 0 */
        /* this allows the height to flow according to the content, allowing the content to appear on screen */
    else 
    {
        dropDown.style.maxHeight = dropDown.scrollHeight + "px";
            /* dropDown's scrollHeight is its total height--height of all its contents combined */
            /* this sets the maxHeight to the scrollHeight, causing the text to appear */
    }
    
    //menu.style.transform = 'rotate('+rotationDegree+'deg)';
    menu.style.transform = 'scale('+scalingBy+','+scalingBy+')';
    menuOpen = !menuOpen;
});

let opened; /* stores which pop up is opened, used to decide which pop up to close when the x close button of a pop up is pressed */

/* the drop down stuff, only for bean and HOH pgs */
let expandables = document.querySelectorAll(".clicktoexpand");
for (let i = 0; i < expandables.length; i++)
{
    expandables[i].addEventListener("click", ()=> {
        current = expandables[i].nextElementSibling; /* stores the relevant section as current */
        
        /* if current is open, aka maxHeight isn't 0 so text is showing */
        if (current.style.maxHeight) {
            current.style.maxHeight = null; /* set maxHeight to 0 */
        }
         /* if current has a maxHeight of 0 */
            /* this allows the height to flow according to the content, allowing the content to appear on screen */
        else 
        {
            current.style.maxHeight = current.scrollHeight + "px";
                /* current's scrollHeight is its total height--height of all its contents combined */
                /* this sets the maxHeight to the scrollHeight, causing the text to appear */
        }
    })
}

let notInUse = true; //no event is currently being translated on or off screen
//get the width of the screen, aka know whether in mobile, tablet or desktop mode 
// NOTE THIS IS ONLY CALLED AT THE START, SO CHANGING THE WINDOW SIZE WONT UPDATE WIDTH 
let width = window.innerWidth;
if (width < 721)
{
    let timelineEvents = document.querySelectorAll(".clickforpopup");
    var id = null; //used to run the function only once
        //used to clear the interval
    for (let i = 0; i < timelineEvents.length; i++)
    {
        timelineEvents[i].addEventListener("click", ()=> {
            let popup = timelineEvents[i].nextElementSibling;
            var posFromLeft = -100;
            clearInterval(id); //makes sure id is null before starting
            //setting the interval into the id for clearing l8r
            id = setInterval(function() {
                //if pop up at the right location
                if (popup.style.left == "5%")
                {
                    clearInterval(id); 
                }
                else 
                {
                    posFromLeft++;
                    popup.style.left = posFromLeft + "%";
                }

            }, 5) //moves a bit every 5 miliseconds
            
            opened = popup; /* stores the opened pop up as opened */
        })
    }

    //only used for pop ups on mobile and tablet
    let popupCloseButton = document.querySelectorAll(".close");
    for (let i = 0; i < popupCloseButton.length; i++)
    {
        popupCloseButton[i].addEventListener("click", ()=> {
            var posFromLeft = 5;
            clearInterval(id); //makes sure id is null before starting
            //setting the interval into the id for clearing l8r
            id = setInterval(function() {
                //if pop up at the right location
                if (opened.style.left == "-100%")
                {
                    clearInterval(id); 
                }
                else 
                {
                    posFromLeft--;
                    opened.style.left = posFromLeft + "%";
                }
            }, 5)
        })
    }
}
else
    //for desktop move, remove the x button and up by flicking on the img and name that brought the pop up up in the first place
{
    //expand HoH's title to the longer version
    //again: only called once when the window is first opened
    let HoHHeader = document.querySelector("#HoH")
    if (HoHHeader) //only change if HoHHeader isnt null --> prevent invalid
    {
        HoHHeader.innerHTML = "Coffee: Helpful or Hurtful";
    }

    //remove sublinks part since scrolling is easier on com and less likely to be needed much
    let subLinks = document.querySelectorAll(".sublink");
    for (let i = 0; i < subLinks.length; i++)
    {
        subLinks[i].classList.add("hidden");
    }

    //remove all the x buttons for pop ups
    let closeButtons = document.querySelectorAll(".close");
    for (let i = 0; i < closeButtons.length; i++)
    {
        closeButtons[i].innerHTML = " ";
    }

    let timelineEvents = document.querySelectorAll(".clickforpopup");
    for (let i = 0; i < timelineEvents.length; i++)
    {
        timelineEvents[i].addEventListener("click", ()=> {
            //can only check for the user clicking the events to trigger the event to come on/off screen if no event pop up is currently being moved on/off screen
            if (notInUse == true)
            //need to put the check inside so that it will be triggered whenever the clickable is click. if not the program will only ever run the check once
            {
                 //class used to decide animation
                timelineEvents[i].nextElementSibling.classList.toggle("opened");
                let popup = timelineEvents[i].nextElementSibling;
                //check if the popup is opened
                    //if it has the class open, it is opened
                    //if not, it is closed
                    //set transition numbers based off it
                var posFromLeft; //its current position from the left
                var finalPosLeft; //its final position from the left
                if (popup.classList.contains("opened"))
                {
                    //for the events on the left, which is determined by parent element
                    if (popup.parentElement.classList.contains("left"))
                    {
                        //opening means that left is currently at -220% and needs to go to -40%
                        posFromLeft = -220;
                        finalPosLeft = -40;
                    }
                    //for the events on the right, which is determined by parent element
                    else if (popup.parentElement.classList.contains("right"))
                    {
                        //opening means that left is currently at -360% and needs to go to 0%
                        posFromLeft = -360;
                        finalPosLeft = 0;
                    }
                }
                //if not opened
                else
                {
                    //for the events on the left, which is determined by parent element
                    if (popup.parentElement.classList.contains("left"))
                    {
                        //closing means that left is currently at -40% and needs to go to -220%
                        posFromLeft = -40;
                        finalPosLeft = -220;
                    }
                    //for the events on the right, which is determined by parent element
                    else if (popup.parentElement.classList.contains("right"))
                    {
                        //closing means that left is currently at 0% and needs to go to -360%
                        posFromLeft = 0;
                        finalPosLeft = -360;
                    }
                }
                clearInterval(id); //makes sure id is null before starting
                //setting the interval into the id for clearing l8r
                id = setInterval(function() {
                    //if pop up at the right location
                    if (popup.style.left == (finalPosLeft + "%"))
                    {
                        notInUse = true; //done moving
                        clearInterval(id); 
                    }
                    else 
                    {
                        notInUse = false; //moving happening
                        //if current pos is smaller than final,
                            //add to posFromLeft
                        if (posFromLeft < finalPosLeft)
                        {
                            posFromLeft++;
                        }
                        //if current pos is larger than final,
                            //minus from posFromLeft
                        else if (posFromLeft > finalPosLeft)
                        {
                            posFromLeft--;
                        }
                        
                        popup.style.left = posFromLeft + "%";
                    }

                }, 5) //moves a bit every 10 miliseconds
            }
        })
    }
}
