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