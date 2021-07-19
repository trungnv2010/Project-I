var healthBar = function(game){
    this.game = game;
    this.x = this.game.width - 300;
    this.y = 50;
    this.width = null;
    this.height = 20;
    this.maxHealth = 2000;
    this.color = "red";

    this.init = function(){
        this.width = 200;
        this.draw();
    }

    this.update = function(){


    }

    this.draw = function(){
        this.game.context.lineWidth = 5;
        this.game.context.strokeStyle = "#333";
        this.game.context.fillStyle = this.color;
        this.game.context.fillRect(this.x, this.y, this.width, this.height);
        this.game.context.strokeRect(this.x, this.y, this.maxHealth, this.h);
    }
}