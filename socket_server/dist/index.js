"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_helper_1 = require("./database-helper");
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
const ROOMS = {};
const CABIN = [];
io.on('connection', (socket) => {
    socket.on('think-provoke-join', (data) => {
        console.log('Data: ', data);
        if (data.hostCode && ROOMS[data.hostCode]) {
            ROOMS[data.hostCode].users.push(Object.assign(Object.assign({}, data), { socket: socket }));
            if (ROOMS[data.hostCode].hostSocket.connected) {
                ROOMS[data.hostCode].hostSocket.emit('think-provoke-joined', data);
            }
            else {
                console.log('COULD NOT JOIN');
            }
        }
    });
    socket.on('think-provoke-host', (data) => __awaiter(void 0, void 0, void 0, function* () {
        let client = null;
        try {
            console.info('think-provoke-host(data):', data);
            if (!data || !data.hostCode)
                return;
            client = yield (0, database_helper_1.getDatabaseAsync)();
            const db = client.db("ancep");
            const quiz = yield db.collection('think-provoke').findOne({
                code: data.hostCode
            });
            if (!quiz)
                return;
            console.log('QUIZ: ', quiz);
            if (!ROOMS[data.hostCode]) {
                ROOMS[data.hostCode] = {
                    users: [],
                    hostSocket: socket
                };
            }
            else {
                console.log('room already existing');
                ROOMS[data.hostCode].hostSocket = socket;
            }
        }
        finally {
            yield (client === null || client === void 0 ? void 0 : client.close());
        }
    }));
    socket.on('join-cabin', (data) => {
        console.log('JOINED CABIN: ', data);
        socket.join("cabin-room");
    });
    socket.on('cabin-message', (data) => {
        console.log('CABIN MESSAGE: ', data);
        io.to('cabin-room').emit('cabin-message', data);
    });
    console.log('a user connected');
});
app.get('/', (req, res) => {
    res.json('Wohooo. Socket server up and running.');
});
server.listen(PORT, () => {
    console.log('listening on *:' + PORT);
});
