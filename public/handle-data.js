var socket = io("http://localhost:3000");


socket.on("go-forward", function(){
        console.log("go forward");
        controller.upKeyIsPressed = true;
    });
    socket.on("go-backward", function(){
        console.log("go backward");
        controller.downKeyIsPressed = true;
    })
    socket.on("go-left", function(){
        console.log("go left");
        controller.leftKeyIsPressed = true;
        controller.rightKeyIsPressed = false;
    });
    socket.on("go-right", function(){

        console.log("go right");
        controller.rightKeyIsPressed = true;
        controller.leftKeyIsPressed = false;
    });
    socket.on("go-right-stop", function(){

        console.log("go right-stop");
        controller.rightKeyIsPressed = false;
    });
    socket.on("go-left-stop", function(){

        console.log("go left-stop");
        controller.leftKeyIsPressed =false;
    });
    socket.on("go-forward-stop", function(){

        console.log("go forward stop");
        controller.upKeyIsPressed =false;
    });
    socket.on("go-backward-stop", function(){

        console.log("go backward stop"); 
        controller.downKeyIsPressed =false;
    });
    socket.on("go-straight", function(){
        controller.rightKeyIsPressed = "false";
        controller.leftKeyIsPressed = "false";
    });
    socket.on("start-game", function(){
        
        gameStart();
    });
$(document).ready(function(){
   console.log("say hi");
})