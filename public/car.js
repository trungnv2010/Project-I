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

    collision(){
        var speedX = this.speed * Math.cos(this.degree);
        var speedY = this.speed * Math.sin(this.degree);
        if (this.x < 0 || this.x > canvas.width - 100 || this.y < 4 || this.y > canvas.height - 50){
            if (controller.upKeyIsPressed){
                this.x -= speedX * 2;
                this.y -= speedY * 2;
            } else {
                this.x += speedX * 2;
                this.y += speedY * 2;   
            }
            
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
