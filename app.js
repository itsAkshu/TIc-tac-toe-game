let boxes = document.querySelectorAll(".box");
let resestBtn = document.getElementById("reset-btn");
let newGameBtn = document.getElementById("new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = "true"; //Alternate turns so if turnO is true its PlayerO's turns and if false then its PlayerX's turn
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    //console.log("Button was clicked");
    if (turnO) {
      box.innerText = "O";
      turnO = false;
      box.style.color = 'green';
    }
    else {
      box.innerText = "X";
      turnO = true;
      box.style.color = '#b0413e';
    }
    box.disabled = true; //A button can be pressed only once
    checkWinner();
    count++;

    let isWinner = checkWinner();

    if(count === 9 && !isWinner){
      draw();
    }
  });
});
const checkWinner = () => {
  for (let pattern of winPatterns) {
    //console.log(pattern[0],pattern[1],pattern[2]);
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
        if(pos1Val === pos2Val && pos2Val === pos3Val){
            console.log("Winner winner chicken dinner !");
            showWinner(pos1Val);
            return true;
        }
    }
  }
};
const showWinner = (winner) =>{
  msg.innerHTML = `Congratulation, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};
const draw = () =>{
    msg.innerHTML = "The game was a draw ";
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const disableBoxes = () =>{ //After the game is completed we cannot further play the game
  for(let box of boxes){
    box.disabled = true;
  }
};
resestBtn.addEventListener("click",resetGame);
newGameBtn.addEventListener("click",resetGame);
const resetGame=() =>{
  turnO = true;
  count = 0;
  enableBox();
  msgContainer.classList.add("hide");
};
const enableBox = () =>{
  for(let box of boxes){
    box.disabled = false;
    box.innerText = "";
  }
};
