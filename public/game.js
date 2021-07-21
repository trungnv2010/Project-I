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

class Background{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.Image = new Image();
        this.Image.src = "./Image/map.png";
    }
    draw(){
        ctx.drawImage(this.Image, this.x, this.y, canvas.width, canvas.height);
    }
}
let background = new Background();
//controller

const controller = {
    leftKeyIsPressed : false,
    rightKeyIsPressed : false,
    upKeyIsPressed : false,
    downKeyIsPressed : false
}

// document.addEventListener('keydown', function(event){
   
//    if (event.key == 'ArrowLeft'){
//        controller.leftKeyIsPressed = true;
//    } else if (event.key == 'ArrowUp'){
//        controller.upKeyIsPressed = true;
//    } else if (event.key == 'ArrowRight'){
//        controller.rightKeyIsPressed = true;
//    } else {
//        controller.downKeyIsPressed = true;
//    }
  
// });
// document.addEventListener('keyup', function(event){
//     if (event.key == 'ArrowLeft'){
//         controller.leftKeyIsPressed = false;
//     } else if (event.key == 'ArrowUp'){
//         controller.upKeyIsPressed = false;
//     } else if (event.key == 'ArrowRight'){
//         controller.rightKeyIsPressed = false;
//     } else {
//         controller.downKeyIsPressed = false;
//     }
// });





//car
class Car{
    constructor(){
        this.x = 0;
        this.y = canvas.height/2;
        this.radius = 50;
        this.speed = 5;
        this.degree = 0;
        this.oneDegree = Math.PI/180;
        this.img = new Image();
        this.img.src = './Image/redCar.png';
    }

    update(){
        if (controller.upKeyIsPressed || controller.downKeyIsPressed){
            if (controller.leftKeyIsPressed){
                this.degree -= 2 * this.oneDegree;
            }

            if (controller.rightKeyIsPressed){
                this.degree += 2 * this.oneDegree;
            }
        }
        
       
        if (controller.upKeyIsPressed){
            this.goForward();
        }
        if (controller.downKeyIsPressed){
            this.goBackWard();
        }
    }

    goForward(){
        var speedX = this.speed * Math.cos(this.degree);
        var speedY = this.speed * Math.sin(this.degree);
        this.x += speedX;
        this.y += speedY;
    }
    
    goBackWard(){
        var speedX = this.speed * Math.cos(this.degree);
        var speedY = this.speed * Math.sin(this.degree);
        this.x -= speedX;
        this.y -= speedY;
    }

    draw(){
        
        ctx.save();
        ctx.translate(this.x + 47, this.y + 22);
        ctx.rotate(this.degree);
        ctx.drawImage(this.img, -47, -22);
       
        ctx.fillStyle = 'red';
        ctx.beginPath();
        //ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.drawImage(this.img, -47, -22);
        ctx.restore();
    }
}

let car = new Car();

//Start Game
let clicked = false;
const wrapper = document.getElementById('wrapper');
const startGame = document.getElementById("startGame");

startGame.addEventListener('click', function(event){
    init();
    animate();
    wrapper.style.display = 'none';
    
    
    

});
// game over
const yourScore = document.getElementById('yourScore');
function gameOver(){
    if (healthBar.width < 0){
        cancelAnimationFrame(animateId);
        wrapper.style.display = 'flex';
        yourScore.innerHTML = score;
    }
}


// create healthy bar
class HealthBar{
    constructor(){
        this.x = canvas.width - 500;
        this.y = 20;
        this.color = "red";
        this.width = 450;
        this.maxHealth = 450;
        this.height = 25;
       
    }
    update(){
        ctx.fillRect(this.x, this.y, 0, this.height);
    }

    draw(){
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#333";
        ctx.fillStyle = this.color;
        if (this.width > 0){
        ctx.fillRect(this.x, this.y, this.width, this.height);
        } else {
            ctx.fillRect(this.x, this.y, 0, this.height);
        }
        ctx.strokeRect(this.x, this.y, this.maxHealth, this.height);
    }
}

let healthBar = new HealthBar();
//item

let itemArray = [];
class Item{
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height; 
        this.radius = 25;
        this.distance = 0;
        this.timeToLive = 0;
        this.img = new Image();
        this.img.src = "./Image/Golden.png"

    }
    update(){
        //this.y -= this.speed;
        const dx = this.x - car.x;
        const dy = this.y - car.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);
    }
    draw(){
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.drawImage(this.img, this.x - 25, this.y - 25);
        ctx.stroke();
    }



}

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
class Bubble {
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height; 
        this.radius = 50;
        this.speed = Math.random() * 5 + 1;
        this.distance = 0;
        this.counted = 0;
        this.img1 = new Image();
        this.img1.src = './Image/rock_type_planet.png'
        this.img2 = new Image();
        this.img2.src = "./Image/rock_type_flip.png"
    }

    update(){
        //this.y -= this.speed;
        const dx = this.x - car.x;
        const dy = this.y - car.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);

    }

    draw(){
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        //ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
        
            ctx.drawImage(this.img1, this.x - this.radius, this.y - this.radius);
        
        //    ctx.drawImage(this.img2, this.x - this.radius, this.y - this.radius);
        
    }
}
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
            
                healthBar.width -= 50;
                
             
            
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
    car.draw();
    
    ctx.fillStyle = 'black';
    ctx.fillText('Score ' + score, 10, 50);
    gameFrame++;
    healthBar.draw();
   
    
    animateId = requestAnimationFrame(animate);
    gameOver();
    //console.log(time);
    
  
    
    
}
//animate();





