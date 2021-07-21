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
