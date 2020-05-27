var app = require('express')(); // means import express, and that your app is an express app
var http = require('http').createServer(app); // the http module, using it has a createServer function, yu pass your express app to it.
var io = require('socket.io')(http); // creates this inputoutput stream that connects it to this html module.

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

app.get('/about', function(req, res){
    res.send('<h1>This is about page</h1>');
  });

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('new message', function(message) {
        console.log(`User ${socket.id} sent ${message}`)
        socket.emit("message", message)
        socket.broadcast.emit("message", message);
    });
});




http.listen(8080, function(){
  console.log('listening on port 8080');
});
