let playingField = document.querySelector("#playingfield"); //get playing field for limits
let cup = document.querySelector("#playerscup"); //the thing the player moves
let leftArrow = document.querySelector("#leftarrow"); 
let rightArrow = document.querySelector("#rightarrow"); 
let cbGenerator = document.querySelector("#cbeangenerator"); //where to generate the coffee beans
let scoreBoard = document.querySelector("#score"); //to update the score displayed

var cupLeft = 0; //the left to add to/minus from to adjust the cup's left
    //cup starts off with a 0 left
var leftIncrement; //set inside the event listeners due to possible resizing of screen
var topIncrement; //set inside the event listeners due to possible resizing of screen
var score = 0;

//left arrow to move the cup
leftArrow.addEventListener("click", ()=> {
    leftIncrement = (playingField.offsetWidth - cup.offsetWidth) / 10; //done inside so it is updated everytime, even if screen size changes
    /* offsetWidth used to get the width of the element */
    /* this width includes padding and border but not margin */
    /* value gets rounded to an int */

    //cup not yet all the way to the left
    if (cupLeft > 0) //0 is min left
    {
        cupLeft -= leftIncrement; //increase by leftIncrement each time
        cup.style.left = cupLeft + "px";
    }
    else //less than or = 0
    {
        cup.style.left = 0 + "px"; //set to 0
    }
})

//right arrow to move the cup
rightArrow.addEventListener("click", ()=> {
    leftIncrement = (playingField.offsetWidth - cup.offsetWidth) / 10; //done inside so it is updated everytime, even if screen size changes
    /* offsetWidth used to get the width of the element */
    /* this width includes padding and border but not margin */
    /* value gets rounded to an int */
    var cupMaxLeft = playingField.offsetWidth - cup.offsetWidth; //done inside so it is updated everytime, even if screen size changes
    //minus the cup's scale so the whole cup stays within the playing field

    //cup not yet all the way to the right
    if (cupLeft < cupMaxLeft)
    {
        cupLeft += leftIncrement; //decrease by leftIncrement each time
        cup.style.left = cupLeft + "px";
    }
    else //more than or = cupMaxLeft
    {
        cup.style.left = cupMaxLeft + "px"; //set to cupMaxLeft
    }
})

//spawn coffee beans
function generateCoffeeBean(){
    //create a coffee bean img element
    let coffeeBean = document.createElement("img");
    coffeeBean.src = "./images/coffeebean.png";
        //create image with this src
    coffeeBean.alt = "CB"; //set its alt
    coffeeBean.setAttribute("class", "coffeebean"); //set class as coffeebean
        //for width and height
    cbGenerator.appendChild(coffeeBean);
        //coffeeBean is a child of cbGenerator
        //gives it relative start position and moving area

    var cbTop = 0; //starts off at the top, so 0
    var cbMaxLeft = playingField.offsetWidth - coffeeBean.offsetHeight; //done inside so it is updated everytime, even if screen size changes
    //minus the cup's scale so the whole cup stays within the playing field
    //takes height since coffeebean can rotate and height is the longer value
    var cbLeft = Math.floor(Math.random() * (cbMaxLeft + 1) 
                + ((coffeeBean.offsetHeight - coffeeBean.offsetWidth)/2));
        //floor returns a random int
        //Math.random() * cbMaxLeft means from 0 to cbMaxLeft
        //offset by half the different between the height and width of the coffee bean so even if the coffee bean spawns at left = 0, if it rotates, it will not go out of the playing field

    //set style once before falling to prevent te bean from teleporting to the right left location only once it starts
    coffeeBean.style.top = cbTop + "px"; //set startig top
    coffeeBean.style.left = cbLeft + "px"; //set starting left

    var cbMaxTop = playingField.offsetHeight - coffeeBean.offsetHeight; //done inside so it is updated everytime, even if screen size changes
    //coffeebean can travel till the end of the playing field
    //minus away its height so it cant leave the playing field
    
    //tell this coffee bean to fall inside the generator as this is where the js still has a ink to the right coffeebean
    function coffeeBeanFall() {
        topIncrement = (playingField.offsetHeight - coffeeBean.offsetHeight) / 15;
        //the coffee bean can travel down the whle playing field

        var hitCoffeeCupTop = playingField.offsetHeight - cup.offsetHeight - (coffeeBean.offsetHeight/2);
        //middle of coffeebean hit cup
        var cbhitBoxSize = 4 * coffeeBean.offsetHeight/ 5;
        var cupHitBoxSize = cup.offsetWidth;

        if (cbTop >= hitCoffeeCupTop && //y lvl hits the coffee cup
            (cbLeft + cbhitBoxSize) >= cupLeft && //min x to collide with cup's left edge
            cbLeft <= (cupLeft + cupHitBoxSize)) //max x hits the cup's right edge
        {
            cbGenerator.removeChild(coffeeBean); //delete the coffee bean
            clearInterval(idCBFall); //stop trying to make the coffee bean fall
            score++; //increase score
            //update score on score board
            scoreBoard.innerHTML = "Score: " + score;
        }
        if (cbTop >= cbMaxTop) //if at max top
        {
            cbGenerator.removeChild(coffeeBean); //delete the coffee bean
            clearInterval(idCBFall); //stop trying to make the coffee bean fall
        }
        cbTop += topIncrement;
        coffeeBean.style.top = cbTop + "px"; //set top
    }

    var idCBFall = setInterval(coffeeBeanFall, 180);
        //calls coffeeBeanFall every 180 miliseconds
    setTimeout(generateCoffeeBean, 2000);
        //wait 2 seconds before spawning a new coffee bean
}

generateCoffeeBean(); //spawn the first coffee bean