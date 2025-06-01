let start = document.querySelector(".start");
let box = document.querySelectorAll(".box");
// box contains all the buttons as a nodelist
//can be accessed as box[0] , box[1] etc

let winnerbanner = document.querySelector(".winnerteller");
let winnerfound = false;

// clicks disabled till game starts
box.forEach((button)=>{
    button.disabled = true;
})

let TurnX; // stores who starts the game first

// Start button takes decision  for who starts first from user input
start.addEventListener("click", () => {
   let firstTurn = prompt("Who will start? Player-X or Player-O?").toLowerCase();
if (firstTurn === "player-x") {
    TurnX = true;
} else if (firstTurn === "player-o") {
    TurnX = false;
} else {
    alert("Invalid input! Please enter 'Player-X' or 'Player-O'.");
    start.disabled = false; // Keeping the start button enabled to try again
    return;
}

box.forEach((button)=>{
    button.disabled = false;
})

} );

// Filling of the innerText of the 9 boxes as game starts

let movecount = 0;
box.forEach((box) => {

    box.addEventListener("click", () => {

        if(TurnX === true) {  box.innerText ="X";
                              TurnX = false; 
                            }
        else{  box.innerText = "O";
               TurnX = true;
            }

            box.disabled = true;  // after a block is clicked once, it is disabled for further clicks
            ++movecount;
            console.log('moves made so far: ',movecount);
            checkwinner(); // calling checkwinner function after each click !!
    } );
})

let reset = document.querySelector(".resetbutton");
reset.addEventListener("click", ()=>{

    // once reset is clicked, disabling all the boxes until start is clicked
    box.forEach((button)=>{
        button.innerText="";
       button.disabled=true;
        start.disabled=false;  // once game is reset, re-enabling the start button
        movecount=0;
        console.clear();
        winnerbanner.classList.add("hide"); // adding hide class to winnerbanner for next game
        winnerfound=false;  // resetting the winnerfound to false to eliminate previous game's effect
    })
})

// all the possible cases of winning the game
const WinPatterns = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]  
];

// function to check winner of the game
function checkwinner() {
    for( let pattern of WinPatterns)
    {
        let pos1val = box[pattern[0]].innerText;
        let pos2val = box[pattern[1]].innerText;
        let pos3val = box[pattern[2]].innerText;

        if(pos1val !=="" && pos1val === pos2val && pos2val===pos3val)
        {
            winnerfound = true; 
            console.log(`the winner of the game is: ${pos1val}`);
            winnerbanner.innerText=`WINNER IS PLAYER-${pos1val}`;
            break;
        }
    }

    if(winnerfound===true)
    {
        box.forEach((box)=>{
            box.disabled = true;
            winnerbanner.classList.remove("hide");
        })
    }

    if(movecount===9 && !winnerfound)
    {
        console.log("The game is draw! play again");
        winnerbanner.innerText="The game is draw ! please play again";
        winnerbanner.classList.remove("hide");
    }
}

