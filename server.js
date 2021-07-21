var express = require("express");
var app = express();
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);

server.listen(3000);
io.on("connection", function(socket){
    console.log("co nguoi vua ket noi: ", socket.id);
    socket.on("go-forward", function(){
        console.log("go forward");
        socket.broadcast.emit("go-forward");

    });
    socket.on("go-backward", function(){
        console.log("go backward");
        socket.broadcast.emit("go-backward");
    })
    socket.on("go-left", function(){
        console.log("go left");
        socket.broadcast.emit("go-left");
    });
    socket.on("go-right", function(){
        console.log("go right");
        socket.broadcast.emit("go-right");
    });
    socket.on("go-right-stop", function(){

        console.log("go right-stop");
        socket.broadcast.emit("go-right-stop")
    });
    socket.on("go-left-stop", function(){

        console.log("go left-stop");
        socket.broadcast.emit("go-left-stop")
    });
    socket.on("go-forward-stop", function(){

        console.log("go forward stop");
        socket.broadcast.emit("go-forward-stop")
    });
    socket.on("go-backward-stop", function(){

        console.log("go backward stop");
        socket.broadcast.emit("go-backward-stop")
    });
});

app.get("/", function(req, res){
    res.render("index.ejs");
});