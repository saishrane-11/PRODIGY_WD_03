let music=new Audio('gun.mp3');
let win=new Audio('win.mp3');
let r=1;
let turn = "X";
let gameOver=false;
let p1=0;
let p2=0;
let bof=0;
document.getElementsByClassName("p1")[0].innerText=p1;
document.getElementsByClassName("p2")[0].innerText=p2;
document.getElementsByClassName("info")[0].innerText="Turn for "+ turn + " Round "+r;


document.getElementById('bof').onclick=function(){
    // console.log("bof: "+bof);
    if(bof===0){
        bof=1;
        document.getElementById('bof').style.color="white";
        document.getElementById('bof').style.backgroundColor="green";
        console.log("bof:"+bof)
    }else{
        bof=0;
        document.getElementById('bof').style.color="white";
        document.getElementById('bof').style.backgroundColor="gray";
        console.log("bof:"+bof)
    }
}
// bof.addEventListener('onclick',()=>{
    
// })

// Function to update score
const updateScore=()=>{
    console.log("update socre");
    document.getElementsByClassName("p1")[0].innerText=p1;
    document.getElementsByClassName("p2")[0].innerText=p2;
}

//Function to change the turn
const changeTurn=()=>{
    return turn === "X"?"O":"X";
}


// automatic restart function after 5 rounds are over
function restart(){
    console.log("Reset");
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach((element)=>{
        element.innerText=""; 
        element.style.color="white";  
    })
    turn="X";
    gameOver=false;
    document.getElementsByClassName("info")[0].innerText="Turn for "+ turn + " Round "+r;
    p1=0;
    p2=0;
    r=0;
    bof=0;
    document.getElementById('bof').style.backgroundColor="gray";
    updateScore();
    // console.log("bof: "+bof);
}
// manually restart function
document.getElementById('restart').onclick= function(){
    console.log("Reset");
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach((element)=>{
        element.innerText=""; 
        element.style.color="white";  
    })
    turn="X";
    gameOver=false;
    document.getElementsByClassName("info")[0].innerText="Turn for "+ turn + " Round "+r;
    p1=0;
    p2=0;
    r=0;
    bof=0;
    document.getElementById('bof').style.backgroundColor="gray";
    console.log("bof: "+bof);
    updateScore();
}
//Function to reset automatically when someone wins
function reset(){
    r=r+1;
    console.log("Reset");
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach((element)=>{
        element.innerText=""; 
        element.style.color="white";  
    })
    turn="X";
    gameOver=false;
    document.getElementsByClassName("info")[0].innerText="Turn for "+ turn + " Round "+r;
}
//Reset Button function form manually reseting
document.getElementById('reset').onclick= function(){
    r=r+1;
    console.log("Reset");
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach((element)=>{
        element.innerText=""; 
        element.style.color="white";  
    })
    turn="X";
    gameOver=false;
    document.getElementsByClassName("info")[0].innerText="Turn for "+ turn + " Round "+r;
}


// Function to checkWin
const checkWin=()=>{
    let boxtext=document.getElementsByClassName('boxtext'); 
    let wins=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    wins.forEach(e=>{
        if(boxtext[e[0]].innerText===boxtext[e[1]].innerText && boxtext[e[1]].innerText===boxtext[e[2]].innerText && boxtext[e[0]].innerText !== ""){
            console.log("someone has won");
            document.querySelector('.info').innerText=boxtext[e[0]].innerText + " has Won" + " in round "+r;
            // if(turn === "X"){
            //     turn="O";
            // }else{
            //     turn="X";
            // }
            console.log(boxtext[e[0]]); 
            // r=r+1;
            boxtext[e[0]].style.color="red";
            boxtext[e[1]].style.color="red";
            boxtext[e[2]].style.color="red";
            console.log(boxtext[e[0]].innerText+ "This is one ")
            if(boxtext[e[0]].innerText==="X"){
                console.log("in p1")
                p1=p1+1;
                console.log("Win.play()");
                win.play();
            }else{
                console.log("win.play();");
                p2=p2+1;
                win.play();
            }
            updateScore();
            // alert(boxtext[e[0]].innerText + " has Won");
            gameOver=true;
            if(bof===1){
                if(r===5){
                    if(p1>p2){
                        alert("Player1 has Won");
                        restart();
                    }else{
                        alert("Player2 has Won")
                        restart();
                    }
                }  
            }
            
            setTimeout(function(){
                reset();
            },800)
        
            
        }
    })
}

// game logic
let boxes= document.getElementsByClassName('box');
Array.from(boxes).forEach((element)=>{
    // console.log("1");
    let boxtext=element.querySelector('.boxtext');
    // console.log("2");
    element.addEventListener('click',()=>{
        if(boxtext.innerText===''){ 
            boxtext.innerText= turn;
            turn=changeTurn();
            music.play();
            checkWin();
            if(!gameOver){
                document.getElementsByClassName("info")[0].innerText="Turn for "+ turn + " Round "+r;
            }
        }
    })
})