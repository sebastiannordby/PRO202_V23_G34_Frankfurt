import dotenv from "dotenv";
dotenv.config();
import { getDatabaseAsync } from './database-helper';
import { MongoClient } from "mongodb";
const express = require('express');
const app = express();
const http = require('http');

const PORT = process.env.PORT || 4000;

console.log('Server should run on port: ', PORT);

app.set('port', PORT);


const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
    cors: {
        origin: ['*', '*:*', 'http://localhost:3000'],
    }
});



const ROOMS: any = { };
const CABIN = [];

io.on('connection', (socket: any) => {
    socket.on('think-provoke-join', (data: any) => {
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

    socket.on('think-provoke-host', async (data: any) => {
        let client: MongoClient | null = null; 
      
        try {
            console.info('think-provoke-host(data):', data );

            if(!data || !data.hostCode) 
                return;
    
            client = await getDatabaseAsync();
            const db = client.db("ancep");
            const quiz = await db.collection('think-provoke').findOne({
                code: data.hostCode
            });
    
            if(!quiz) 
                return;

            console.log('QUIZ: ', quiz);
            
            if(!ROOMS[data.hostCode]) {
                ROOMS[data.hostCode] = {
                    users: [],
                    hostSocket: socket
                };
            } else {
                console.log('room already existing');
                ROOMS[data.hostCode].hostSocket = socket;
            }
        }
        finally {
            await client?.close();
        }
    });

    socket.on('join-cabin', (data: any) => {
        console.log('JOINED CABIN: ', data);
        socket.join("cabin-room");
    });

    socket.on('cabin-message', (data: any) => {
        console.log('CABIN MESSAGE: ', data);
        io.to('cabin-room').emit('cabin-message', data)
    });

    console.log('a user connected');
});


app.get('/', (req: any, res: any) => {
    res.json('Wohooo. Socket server up and running.');
});

server.listen(PORT, () => {
    console.log('listening on *:' + PORT);
});
