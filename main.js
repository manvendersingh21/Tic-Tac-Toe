let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let count = 0; //To Track Draw
let a=[];
const generateComputerChoice=()=>{
    
    const i=Math.floor(Math.random()*9);
    return i;
}
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  
  count = 0;
  a=[];
  enableBoxes();
  msgContainer.classList.add("hide");
};

function check(i){
    for(let n of a){
        console.log(i,n,i==n);
        if(i==n){
            
            let x=generateComputerChoice();
            x=check(x);
            return x;
            
        }
        
    }
    return i;

}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    
        let i=generateComputerChoice();
    
   
        //playerO
        box.innerText = "O";
        console.log(i);
        console.log(box.value);
        a.push(box.value);
        i=check(i);
        console.log("f",i);
        
  
       
        
        boxes[i].innerText = "X";
        
        boxes[i].disabled=true;
        
        a.push(i);

       
      
    
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is "${winner}"`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);