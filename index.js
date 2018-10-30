const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const moment = require('moment');
const users = [];
const connections = [];

server.listen(process.env.PORT || 3000);

console.log('Server is running');

app.get('/',(req,resp)=>{
    resp.sendFile(__dirname +'/index.html');
})

io.sockets.on('connection',(socket)=>{
    connections.push(socket);
    console.log('Connected: %s sockets connected',connections.length);

    //Disconnect
    socket.on('disconnect',(data)=>{

        connections.splice(connections.indexOf(socket),1);
        console.log('Disconnected: %s socket connected' , connections.length);
    })
    socket.on('send message',(data)=>{
        
        
        io.sockets.emit('new message',{username:socket.username,msg: data,dateAdd:moment().format('h:mm:ss ')});
    })
     
    socket.on('new user',(data,callback)=>{
        callback(true) ;
        socket.username = data;
        users.push(socket.username);
        updateUsernames();
      
    })
     
    function  updateUsernames(){
        io.sockets.emit('get users' , users);
    }


})


