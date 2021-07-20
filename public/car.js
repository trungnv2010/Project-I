const oneDegree = Math.PI/180;

var car = function(game){
    this.game = game;

    this.x = 150;
    this.y = 200;

    this.degree = 0;
    this.speed = 5;


    this.img = null;
    this.loaded = false;
    var self = this;

    this.init = function(){
        this.img = new Image();
        this.img.onload = function(){
            self.loaded = true;
            
        }
        this.img.src = './Image/redCar.png';
        

    }

    this.update = function(){
        
        if (this.game.upKeyIsPressed || this.game.downKeyIsPressed){
            if (this.game.leftKeyIsPressed){
                this.degree -= 2 * oneDegree;
            }

            if (this.game.rightKeyIsPressed){
                this.degree += 2 * oneDegree;
            }
        }
        
       
        if (this.game.upKeyIsPressed){
            self.goForward();
        }
        if (this.game.downKeyIsPressed){
            self.goBackWard();
        }
       
       // if (this.x >=1785 || this.x <=0 || this.y <=4) {
         //   this.game.gameOver = true;
         //  }
    }   

    this.goForward = function(){
        var speedX = this.speed * Math.cos(this.degree);
        var speedY = this.speed * Math.sin(this.degree);
        this.x += speedX;
        this.y += speedY;
    }
    
    this.goBackWard = function(){
        var speedX = this.speed * Math.cos(this.degree);
        var speedY = this.speed * Math.sin(this.degree);
        this.x -= speedX;
        this.y -= speedY;
    }

    this.draw = function(){
        
        if (this.loaded){
           
            this.game.context.save();
            this.game.context.translate(this.x + 47, this.y + 22);
            this.game.context.rotate(this.degree);
            this.game.context.drawImage(this.img, -47, -22);
            this.game.context.restore();
            
        }
    }

    this.collision = function(){
        var speedX = this.speed * Math.cos(this.degree);
        var speedY = this.speed * Math.sin(this.degree);
        if (this.x < 0 || this.x > this.game.canvas.width - 100 || this.y < 4 || this.y > this.game.canvas.height - 50){
            if (this.game.upKeyIsPressed){
                this.x -= speedX * 2;
                this.y -= speedY * 2;
            } else {
                this.x += speedX * 2;
                this.y += speedY * 2;   
            }
            
        }
    }

   
}