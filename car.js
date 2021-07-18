const oneDegree = Math.PI/180;

var car = function(game){
    this.game = game;

    this.x = 50;
    this.y = 50;

    this.degree = 0;
    this.speed = 3;


    this.img = null;
    this.loaded = false;
    var self = this;

    this.init = function(){
        this.img = new Image();
        this.img.onload = function(){
            self.loaded = true;
            
        }
        this.img.src = 'Car.png';
        

    }

    this.update = function(){
        
        if (this.game.upKeyIsPressed || this.game.downKeyIsPressed){
            if (this.game.leftKeyIsPressed){
                this.degree -= oneDegree;
            }

            if (this.game.rightKeyIsPressed){
                this.degree += oneDegree;
            }
        }
        
       
        if (this.game.upKeyIsPressed){
            self.goForward();
        }
        if (this.game.downKeyIsPressed){
            self.goBackWard();
        }
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
        console.log(this.loaded);
        if (this.loaded){
           console.log('whyy');
            this.game.context.save();
            this.game.context.translate(this.x + 47, this.y + 22);
            this.game.context.rotate(this.degree);
            this.game.context.drawImage(this.img, -47, -22);
            this.game.context.restore();
        }
    }
}