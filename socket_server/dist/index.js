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
exports.ThinkRoomQuestionType = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_helper_1 = require("./database-helper");
const socket_io_1 = require("socket.io");
const express = require('express');
const app = express();
const http = require('http');
const PORT = process.env.PORT || 4000;
console.log('Server should run on port: ', PORT);
app.set('port', PORT);
const server = http.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: ['*', '*:*', 'http://localhost:3000'],
    }
});
var ThinkRoomQuestionType;
(function (ThinkRoomQuestionType) {
    ThinkRoomQuestionType[ThinkRoomQuestionType["TextAnswer"] = 0] = "TextAnswer";
    ThinkRoomQuestionType[ThinkRoomQuestionType["Dilemma"] = 1] = "Dilemma";
    ThinkRoomQuestionType[ThinkRoomQuestionType["MultipleChoice"] = 2] = "MultipleChoice";
})(ThinkRoomQuestionType || (exports.ThinkRoomQuestionType = ThinkRoomQuestionType = {}));
let ROOMS = [];
const CABIN = [];
function getRoomByCode(hostCode) {
    const room = ROOMS.find(x => x.code == hostCode);
    if (!room) {
        console.log('getRoomByCode(): Could not find room', hostCode);
    }
    return room;
}
function thinkProvokeClientJoin(socket, data) {
    console.log('THINK PROVOKE | CLIENT TRIES TO JOIN: ', data.code, data.email, data.fullName);
    const room = getRoomByCode(data === null || data === void 0 ? void 0 : data.code);
    if (!room)
        return;
    const existingConnection = room.clients
        .find(x => x.data.username == data.email);
    socket.data.username = data.email;
    socket.data.code = data.code;
    socket.data.email = data.fullName;
    room.clients.push(socket);
    roomEmitServerList(room);
    socket.join(getRoomChannelName(data.code));
    console.log('THINK PROVOKE | CLIENT SUCCESSFULLY JOINED: ', data.code, data.email, data.fullName);
}
function getRoomChannelName(code) {
    return "think-provoke-" + code;
}
function roomEmitServerList(room) {
    var _a;
    if (!((_a = room === null || room === void 0 ? void 0 : room.hostSocket) === null || _a === void 0 ? void 0 : _a.connected)) {
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
    console.log('Emiting user list: ');
    room.hostSocket.emit(EVENT_SET_USER_LIST, userList);
}
function thinkProvokeHostEstablish(socket, data) {
    return __awaiter(this, void 0, void 0, function* () {
        let client = null;
        try {
            if (!data || !data.code)
                return;
            socket.data.email = data.email;
            socket.data.fullName = data.fullName;
            socket.data.code = data.code;
            client = yield (0, database_helper_1.getDatabaseAsync)();
            const db = client.db("ancep");
            const quiz = yield db
                .collection('think-provoke')
                .findOne({
                code: data.code
            });
            if (!quiz)
                return;
            const room = getRoomByCode(data.code);
            if (room) {
                room.hostSocket = socket;
                roomEmitServerList(room);
            }
            else {
                ROOMS.push({
                    code: data.code,
                    hostSocket: socket,
                    clients: [],
                    answers: []
                });
            }
        }
        finally {
            yield (client === null || client === void 0 ? void 0 : client.close());
            console.log('ROOMS ARE NOW: ', ROOMS.map(x => x.code));
        }
    });
}
function thinkProvokeSetQuestion(socket, questionId) {
    var _a;
    const room = getRoomByCode(socket.data.code);
    if (!room)
        return;
    console.info('thinkProvokeSetQuestion: ', questionId);
    const question = (_a = room.questions) === null || _a === void 0 ? void 0 : _a.find(x => x._id == questionId);
    console.info('thinkProvokeSetQuestion: ', question);
    io.to(getRoomChannelName(room.code)).emit(EVENT_CLIENT_SET_QUESTION, question);
}
function thinkProvokeQuit(socket, code) {
    var _a, _b;
    const room = getRoomByCode(code);
    (_a = room === null || room === void 0 ? void 0 : room.hostSocket) === null || _a === void 0 ? void 0 : _a.disconnect();
    io.to(getRoomChannelName(code)).emit(EVENT_CLIENT_QUIT);
    (_b = room === null || room === void 0 ? void 0 : room.clients) === null || _b === void 0 ? void 0 : _b.forEach(x => {
        x.disconnect();
    });
    ROOMS = ROOMS.filter(x => x.code !== code);
}
function thinkProvokeClientAnswer(socket, answer) {
    var _a;
    const room = getRoomByCode(socket.data.code);
    if (!room)
        return;
    room.answers.push(answer);
    (_a = room === null || room === void 0 ? void 0 : room.hostSocket) === null || _a === void 0 ? void 0 : _a.emit(EVENT_SET_GAME_ANSWERS, room.answers.filter(x => x.questionId == answer.questionId));
}
function thinkProvokeStart(code, command) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        console.info('thinkProvokeStart() invoked with command: ', command);
        if (!code)
            return;
        const room = getRoomByCode(code);
        if (!room)
            return;
        console.info('thinkProvokeStart() emitting to clients and host');
        room.questions = command.questions;
        (_a = room === null || room === void 0 ? void 0 : room.hostSocket) === null || _a === void 0 ? void 0 : _a.emit(EVENT_SET_GAME_STARTED, {
            questions: command.questions,
            selectedQuizId: command.selectedQuestionId
        });
        const question = (_b = room.questions) === null || _b === void 0 ? void 0 : _b.find(x => x._id == command.selectedQuestionId);
        console.info('thinkProvokeSetQuestion: ', question);
        io.to(getRoomChannelName(room.code)).emit(EVENT_CLIENT_SET_QUESTION, question);
        io.to(getRoomChannelName(room.code)).emit(EVENT_CLIENT_SET_GAME_STARTED, {
            questions: command.questions,
            selectedQuizId: command.selectedQuestionId,
            question: question
        });
        roomEmitServerList(room);
    });
}
function onClientConnectionClose(socket) {
    if (socket.data.email && socket.data.code) {
        const room = getRoomByCode(socket.data.code);
        if (room) {
            console.log('User leaved room: ', room);
        }
    }
}
const EVENT_SET_USER_LIST = 'set-user-list';
const EVENT_SET_GAME_STARTED = 'set-game-started';
const EVENT_SET_GAME_ANSWERS = 'set-game-answers';
const EVENT_CLIENT_SET_GAME_STARTED = 'client-set-game-started';
const EVENT_CLIENT_SET_QUESTION = 'client-set-question';
const EVENT_CLIENT_QUIT = 'client-quit';
const ON_THINK_PROVOKE_QUIT = 'think-provoke-host-quit';
const ON_THINK_PROVOKE_HOST = 'think-provoke-host-establish';
const ON_THINK_PROVOKE_JOIN = 'think-provoke-join';
const ON_THINK_PROVOKE_LEAVE = 'think-provoke-leave';
const ON_THINK_PROVOKE_START = 'think-provoke-start';
const ON_THINK_PROVOKE_SET_QUESTION = 'think-provoke-set-question';
const ON_CLIENT_SEND_ANSWER = 'client-send-answer';
const ON_JOIN_CABIN = 'join-cabin';
const ON_CABIN_MESSAGE = 'cabin-message';
io.on('connection', (socket) => {
    socket.on(ON_THINK_PROVOKE_JOIN, (data) => {
        thinkProvokeClientJoin(socket, data);
    });
    socket.on(ON_THINK_PROVOKE_HOST, (data) => __awaiter(void 0, void 0, void 0, function* () {
        yield thinkProvokeHostEstablish(socket, data);
        // socket.emit(EVENT_SET_USER_LIST);
    }));
    socket.on(ON_CLIENT_SEND_ANSWER, (answer) => {
        thinkProvokeClientAnswer(socket, answer);
    });
    socket.on(ON_THINK_PROVOKE_LEAVE, (data) => {
        const room = getRoomByCode(socket.data.code);
        roomEmitServerList(room);
    });
    socket.on(ON_THINK_PROVOKE_QUIT, ({ code }) => {
        thinkProvokeQuit(socket, code);
    });
    socket.on(ON_THINK_PROVOKE_START, (command) => __awaiter(void 0, void 0, void 0, function* () {
        yield thinkProvokeStart(socket.data.code, command);
    }));
    socket.on(ON_THINK_PROVOKE_SET_QUESTION, (questionId) => __awaiter(void 0, void 0, void 0, function* () {
        thinkProvokeSetQuestion(socket, questionId);
    }));
    socket.on(ON_JOIN_CABIN, (data) => {
        socket.join("cabin-room");
    });
    socket.on(ON_CABIN_MESSAGE, (data) => {
        io.to('cabin-room').emit('cabin-message', data);
    });
});
app.get('/', (req, res) => {
    res.json('Socket server up and running.');
});
server.listen(PORT, () => {
    console.log('listening on *:' + PORT);
});
