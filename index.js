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
        console.log(data);
        io.sockets.emit('new message',{msg: data,dateAdd:moment().format('h:mm:ss ')});
    })
     


})


