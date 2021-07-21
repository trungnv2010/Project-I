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