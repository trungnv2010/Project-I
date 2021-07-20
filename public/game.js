// canvas setup

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');




let score = 0;
let gameFrame = 0;

 console.log("image loaded");

ctx.font = '50px Georgia'
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
const background = new Background();
//controller

const controller = {
    leftKeyIsPressed : false,
    rightKeyIsPressed : false,
    upKeyIsPressed : false,
    downKeyIsPressed : false
}

document.addEventListener('keydown', function(event){
    console.log(event.key);
   if (event.key == 'ArrowLeft'){
       controller.leftKeyIsPressed = true;
   } else if (event.key == 'ArrowUp'){
       controller.upKeyIsPressed = true;
   } else if (event.key == 'ArrowRight'){
       controller.rightKeyIsPressed = true;
   } else {
       controller.downKeyIsPressed = true;
   }
   console.log(controller.leftKeyIsPressed, controller.rightKeyIsPressed, controller.upKeyIsPressed, controller.downKeyIsPressed);
});
document.addEventListener('keyup', function(event){
    if (event.key == 'ArrowLeft'){
        controller.leftKeyIsPressed = false;
    } else if (event.key == 'ArrowUp'){
        controller.upKeyIsPressed = false;
    } else if (event.key == 'ArrowRight'){
        controller.rightKeyIsPressed = false;
    } else {
        controller.downKeyIsPressed = false;
    }
});

console.log(controller.leftKeyIsPressed, controller.rightKeyIsPressed, controller.upKeyIsPressed, controller.downKeyIsPressed);



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

const car = new Car();
//item

const itemArray = [];
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
const bubblesArray = [];
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
        console.log(bubblesArray.length);
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
        }


    }
}
//loop

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw();
    car.update();
    handleBubbles();
    handleItem();
    car.draw();
    ctx.fillStyle = 'black';
    ctx.fillText('Score ' + score, 10, 50);
    gameFrame++;
    requestAnimationFrame(animate);
    
}

animate();




/* var game = function(){
    this.canvas = null;
    this.context = null;

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    this.car = null;

    this.leftKeyIsPressed = false;
    this.rightKeyIsPressed = false;
    this.upKeyIsPressed = false;
    this.downKeyIsPressed = false;

    this.gameOver = false;
    this.myScore = 0;

    this.gameFrame = 0;
   


    var self = this;

    this.init = function(){
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width * 0.98;
        this.canvas.height = this.height* 0.9745;
        this.context = this.canvas.getContext('2d');

        document.body.appendChild(this.canvas);
        // create car
        this.car = new car(this);
        this.car.init();
        // create background
        this.background = new background(this);
        this.background.init();
        //create health bar
        this.healthBar = new healthBar(this);
        this.healthBar.init();
        //create item
        this.item = new item(this);
        this.item.init();

        this.loop();

        this.listenKey();
    }

    this.listenKey = function(){
        document.addEventListener('keydown', function(event){
            console.log(event.key);
           if (event.key == 'ArrowLeft'){
               self.leftKeyIsPressed = true;
           } else if (event.key == 'ArrowUp'){
               self.upKeyIsPressed = true;
           } else if (event.key == 'ArrowRight'){
               self.rightKeyIsPressed = true;
           } else {
               self.downKeyIsPressed = true;
           }
        });
        document.addEventListener('keyup', function(event){
            if (event.key == 'ArrowLeft'){
                self.leftKeyIsPressed = false;
            } else if (event.key == 'ArrowUp'){
                self.upKeyIsPressed = false;
            } else if (event.key == 'ArrowRight'){
                self.rightKeyIsPressed = false;
            } else {
                self.downKeyIsPressed = false;
            }
        });
    }

    this.loop = function(){
       
        self.update();
        self.draw();
        self.car.collision();
        self.gameFrame ++;
      
       
       requestAnimationFrame(self.loop); // 50fps

    }
    this.update = function(){
        if (this.gameOver == false){
        this.background.update();
        this.car.update();
        this.myScore++;
        this.healthBar.update();
        //this.score.update();
        }
        else {return;}
    }

    this.draw = function(){
        this.clearScreen();
        this.background.draw();
        this.car.draw();
        this.text("Score: "+ this.myScore, '30px Cosmic Sans MS', 20, 50,  'white');
        this.healthBar.draw();
        this.item.draw();
        //this.score.draw();
    }

    this.clearScreen = function(){
        this.context.fillStyle = '#58a0c7';
        this.context.fillRect(0, 0, this.width, this.height);
    }

    this.text = function(txt, font, x, y, c){
        this.context.fillStyle = c;
        this.context.font = font;
        this.context.fillText(txt, x, y);

    }

    this.distance = function(x, y, m, n){
        var dx = x - m;
        var dy = y - n;
        return Math.sqrt(dx * dx + dy * dy);
    }
    this.handleItem = function(){
        
        
    }

    

}

var g = new game();
g.init(); */
