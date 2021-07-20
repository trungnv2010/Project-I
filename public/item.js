var item = function(game){
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.init = function(){
        do {
            var x = Math.round(Math.random() * (this.game.canvas.width - 1));
            var y = Math.round(Math.random() * (this.game.canvas.height - 1));
        }
        
        while (!this.valid(x, y))
        //console.log(x, y);
        this.x = x;
        this.y = y;
    }

    this.update = function(){

    }

    this.valid = function(x, y){
        
        if (this.game.distance(this.game.car.x + 47, this.game.car.y + 22, x, y) > 100){
        return true;
        } else {
        return false;
        }
    }

    this.draw = function(){
        this.game.context.fillStyle = 'red';
        this.game.context.beginPath();
        this.game.context.arc(this.x, this.y, 20, 0, Math.PI * 2);
        this.game.context.fill();
        this.game.context.closePath();
    }

}