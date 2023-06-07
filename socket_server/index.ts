import dotenv from "dotenv";
dotenv.config();
import { getDatabaseAsync } from './database-helper';
import { MongoClient } from "mongodb";
import { Socket, Server } from 'socket.io';

const express = require('express');
const app = express();
const http = require('http');
const PORT = process.env.PORT || 4000;

console.log('Server should run on port: ', PORT);

app.set('port', PORT);


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ['*', '*:*', 'http://localhost:3000'],
    }
});

export type ThinkProvokeRoom = {
    hostSocket: Socket;
    clients: Socket[];
    code: string;
};

const ROOMS: ThinkProvokeRoom[] = [];
const CABIN = [];


export type JoinUserCommand = {
    email: string;
    fullName: string;
    code: string;
}

function getRoomByCode(hostCode: string) {
    const room = ROOMS.find(x => x.code == hostCode);

    if(!room) {
        console.log('getRoomByCode(): Could not find room', hostCode);
    }

    return room;
}

function thinkProvokeClientJoin(socket: Socket, data: JoinUserCommand) {
    console.log('THINK PROVOKE | CLIENT TRIES TO JOIN: ', data.code, data.email, data.fullName);

    const room = getRoomByCode(data?.code);
    if(!room)
        return;

    const existingConnection = room.clients
        .find(x => x.data.username == data.email)

    socket.data.username = data.email;
    socket.data.code = data.code;
    socket.data.email = data.fullName;

    room.clients.push(socket);
    roomEmitServerList(room);

    console.log('THINK PROVOKE | CLIENT SUCCESSFULLY JOINED: ', data.code, data.email, data.fullName);
}

function roomEmitServerList(room: ThinkProvokeRoom | undefined) {
    if(!room?.hostSocket?.connected)  {
        console.log('roomEmitServerList: No host connected...');
        return;
    }
    
    const userList = room.clients
        .filter(x => x.connected)
        .map(x => {
            return {
                email: x.data.email,
                fullName: x.data.fullName,
                code: x.data.code
            };
        });

    console.log('Emiting user list: ' );

    room.hostSocket.emit(EVENT_SET_USER_LIST, userList);
}

async function thinkProvokeHostStart(socket: Socket, data: JoinUserCommand) {
    let client: MongoClient | null = null; 

    try {
        if(!data || !data.code) 
            return;

        socket.data.email = data.email;
        socket.data.fullName = data.fullName;
        socket.data.code = data.code;

        client = await getDatabaseAsync();
        const db = client.db("ancep");
        const quiz = await db
            .collection('think-provoke')
            .findOne({
                code: data.code
            });

        if(!quiz) 
            return;


        const room = getRoomByCode(data.code);
        if(room) {
            room.hostSocket = socket;
            roomEmitServerList(room);
        } else {
            ROOMS.push({
                code: data.code,
                hostSocket: socket,
                clients: []
            });
        }
    } finally {
        await client?.close();

        console.log('ROOMS ARE NOW: ', ROOMS.map(x => x.code));
    }
}

function onClientConnectionClose(socket: Socket) {
    if(socket.data.email && socket.data.code) {
        const room = getRoomByCode(socket.data.code);

        if(room) {
            console.log('User leaved room: ', room);
        }
    }
}

const EVENT_SET_USER_LIST = 'set-user-list';

const ON_THINK_PROVOKE_HOST = 'think-provoke-host';
const ON_THINK_PROVOKE_JOIN = 'think-provoke-join';
const ON_THINK_PROVOKE_LEAVE = 'think-provoke-leave';
const ON_JOIN_CABIN = 'join-cabin';
const ON_CABIN_MESSAGE = 'cabin-message';

io.on('connection', (socket: Socket) => {
    socket.on(ON_THINK_PROVOKE_JOIN, (data: any) => {
        thinkProvokeClientJoin(socket, data);
    });

    socket.on(ON_THINK_PROVOKE_HOST, async (data: JoinUserCommand) => {
        await thinkProvokeHostStart(socket, data);

        // socket.emit(EVENT_SET_USER_LIST);
    });

    
    socket.on(ON_THINK_PROVOKE_LEAVE, function (data: any) {
        const room = getRoomByCode(socket.data.code);
        roomEmitServerList(room);
    });

    socket.on(ON_JOIN_CABIN, (data: any) => {
        socket.join("cabin-room");
    });

    socket.on(ON_CABIN_MESSAGE, (data: any) => {
        io.to('cabin-room').emit('cabin-message', data)
    }); 
});


app.get('/', (req: any, res: any) => {
    res.json('Socket server up and running.');
});

server.listen(PORT, () => {
    console.log('listening on *:' + PORT);
});
