const express = require('express');
const app = express();
const http = require('http');
app.set('port', 4000);

const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
    cors: {
        origin: ['*', '*:*', 'http://localhost:3000'],
    }
});

const ROOMS = { };

io.on('connection', (socket) => {
    socket.on('think-provoke-join', (data) => {
        console.log('Data: ', data);
        if(data.hostCode && ROOMS[data.hostCode]) {
            ROOMS[data.hostCode].users.push({
                ...data,
                socket: socket
            });

            if(ROOMS[data.hostCode].hostSocket.connected) {
                ROOMS[data.hostCode].hostSocket.emit(
                    'think-provoke-joined', data);
            } else {
                console.log('COULD NOT JOIN');
            }
        }
    });

    socket.on('think-provoke-host', data => {
        console.log('Host', data );
        
        if(!ROOMS[data.hostCode]) {
            ROOMS[data.hostCode] = {
                users: [],
                hostSocket: socket
            };
        } else {
            console.log('room already existing');
            ROOMS[data.hostCode].hostSocket = socket;
        }
    });

    console.log('a user connected');
});

app.get('/', (req, res) => {
    res.json('Wohooo. Socket server up and running.');
});

server.listen(4000, () => {
    console.log('listening on *:4000');
});
