var game = function(){
    this.canvas = null;
    this.context = null;

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    
    this.car = null;

    this.leftKeyIsPressed = false;
    this.rightKeyIsPressed = false;
    this.upKeyIsPressed = false;
    this.downKeyIsPressed = false;

    var self = this;

    this.init = function(){
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width * 0.98;
        this.canvas.height = this.height* 0.9745;
        this.context = this.canvas.getContext('2d');

        document.body.appendChild(this.canvas);

        this.car = new car(this);
        this.car.init();

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

        setTimeout(self.loop, 20); // 50fps

    }
    this.update = function(){
        this.car.update();
    }

    this.draw = function(){
        this.clearScreen();
        this.car.draw();
    }

    this.clearScreen = function(){
        this.context.fillStyle = '#58a0c7';
        this.context.fillRect(0, 0, this.width, this.height);
    }

}

var g = new game();
g.init();