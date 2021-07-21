// canvas setup

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');




let score = 0;
let gameFrame = 0;

 

ctx.font = '50px Georgia'

//init
function init(){
    score = 0;
    clicked = true;
    checked = false;
    time = 300;
    gameFrame = 0;
    car = new Car();
    bubblesArray = [];
    itemArray = [];
    healthBar = new HealthBar();
    background = new Background();

}

//setting time
//const startingMinutes = 5;
let time = 300;
countdown = document.getElementById('countdown');
function updateCountDown(){
    if (clicked){
        if (time > 0) time--;
        const minutes = Math.floor(time / 60);
        let seconds = time % 60;
        if (seconds > 9){
            countdown.innerHTML = "0"+minutes + ":" + seconds;
        } else {
            countdown.innerHTML = "0"+minutes + ":" + "0" + seconds;
        }
        if (time == 0 ){
        healthBar.width = -1;
        }
    
    
    }
    
    

}
setInterval(updateCountDown, 1000);
//console.log(typeof(time));
// background


let background = new Background();
//controller

const controller = {
    leftKeyIsPressed : false,
    rightKeyIsPressed : false,
    upKeyIsPressed : false,
    downKeyIsPressed : false
}



//car

let car = new Car();

//Start Game

let clicked = false;

const wrapper = document.getElementById('wrapper');
const startGame = document.getElementById("startGame");
function gameStart(){
  
        init();
        animate();
        wrapper.style.display = 'none';
}   
//gameStart();

startGame.addEventListener('click', function(event){
    init();
    animate();
    wrapper.style.display = 'none'; 
});

// game over
const yourScore = document.getElementById('yourScore');
function gameOver(){
    if (healthBar.width <= 0){
        cancelAnimationFrame(animateId);
        wrapper.style.display = 'flex';
        yourScore.innerHTML = score;
    }
}


// create healthy bar


let healthBar = new HealthBar();
//item

let itemArray = [];

function handleItem(){
    if (gameFrame % 100 == 0){
        if (itemArray.length < 3){
            itemArray.push(new Item());
        }
    }

    for (i = 0; i < itemArray.length; i++){
        itemArray[i].update();
        itemArray[i].draw();
    }
    for (i = 0; i < itemArray.length; i++){
        if (itemArray[i].timeToLive > 1000){
            itemArray.splice(i , 1);
            continue;
        } else {
        if (itemArray[i].distance < itemArray[i].radius + car.radius + 8){
            itemArray.splice(i, 1);    
            score++;  
            continue;
        }
        itemArray[i].timeToLive++;
    }


    }

}
//bubles
let bubblesArray = [];

function handleBubbles(){
    if (gameFrame % 50 == 0){
        if (bubblesArray.length <7){
        bubblesArray.push(new Bubble());
       
        }
    }
    for (i = 0; i < bubblesArray.length; i++){
        bubblesArray[i].update();
        bubblesArray[i].draw();  
    }
    for (i = 0; i < bubblesArray.length; i++){
        
        if (bubblesArray[i].distance < bubblesArray[i].radius + car.radius + 8){
            if (bubblesArray[i].counted > 5){
                //score++;
                //bubblesArray[i].counted = true;
                bubblesArray.splice(i , 1);
                continue;
            }
            bubblesArray[i].counted++;
            var speedX = car.speed * Math.cos(car.degree);
            var speedY = car.speed * Math.sin(car.degree);
            if (controller.upKeyIsPressed){
                car.x -= speedX * 4;
                car.y -= speedY * 4;
            } else {
                car.x += speedX * 4;
                car.y += speedY * 4;   
            }
            
                healthBar.width -= 10;
                
             
            
        }


    }
}
//loop
let animateId;
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log(controller.leftKeyIsPressed);
    background.draw();
    car.update();
    handleBubbles();
    handleItem();
    car.collision();
    car.draw();
    //car.collision();
    ctx.fillStyle = 'black';
    ctx.fillText('Score ' + score, 10, 50);
    gameFrame++;
    healthBar.draw();
   
    
    animateId = requestAnimationFrame(animate);
    gameOver();
    //console.log(time);
    
  
    
    
}
//animate();





