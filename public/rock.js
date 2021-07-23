class Rock {
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