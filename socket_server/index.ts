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
    questions?: ThinkRoomQuestion[];
    answers: ThinkProvokeAnswer[];
};

export type ThinkProvokeAnswer = {
    email: string;
    answer: string;
    questionId: string;
};

export enum ThinkRoomQuestionType  {
    TextAnswer,
    Dilemma,
    MultipleChoice,
}

export type ThinkProvokeDilemma = {
    DilemmaQuestion:string;
    Dilemma1:string;
    Dilemma2:string;
    DilemmaTextAnswer:string;
}

export type ThinkProvokeQuizAnswer = {
    TextAnswer: string;
    MultipleChoice: string[];
    Dilemma: ThinkProvokeDilemma;
}

export type ThinkRoomQuestion =  {
    _id?: string;
    Value: string;
    Type: ThinkRoomQuestionType;
    QuizId: string;
    Answer: ThinkProvokeQuizAnswer;
}

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
    socket.join(getRoomChannelName(data.code));
    console.log('THINK PROVOKE | CLIENT SUCCESSFULLY JOINED: ', data.code, data.email, data.fullName);
}

function getRoomChannelName(code: string | undefined) {
    return "think-provoke-" + code;
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

async function thinkProvokeHostEstablish(socket: Socket, data: JoinUserCommand) {
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
                clients: [],
                answers: []
            });
        }
    } finally {
        await client?.close();

        console.log('ROOMS ARE NOW: ', ROOMS.map(x => x.code));
    }
}

function thinkProvokeSetQuestion(socket: Socket, questionId: string) {
    const room = getRoomByCode(socket.data.code);
    if(!room)
        return;

    console.info('thinkProvokeSetQuestion: ', questionId);
    const question = room.questions?.find(x => x._id == questionId);
    console.info('thinkProvokeSetQuestion: ', question);

    io.to(getRoomChannelName(room.code)).emit(
        EVENT_CLIENT_SET_QUESTION, question);
}

function thinkProvokeClientAnswer(socket: Socket, answer: ThinkProvokeAnswer) {
    const room = getRoomByCode(socket.data.code);
    if(!room)
        return;

    room.answers.push(answer);
    room?.hostSocket?.emit(EVENT_SET_GAME_ANSWERS, 
        room.answers.filter(x => x.questionId == answer.questionId));
}

async function thinkProvokeStart(code: string | undefined, command: ThinkProvokeStartCommand) {
    console.info('thinkProvokeStart() invoked with command: ', command);

    if(!code)
        return;

    const room = getRoomByCode(code);
    if(!room)
        return;


    console.info('thinkProvokeStart() emitting to clients and host');
    room.questions = command.questions;

    room?.hostSocket?.emit(EVENT_SET_GAME_STARTED, {
        questions: command.questions,
        selectedQuizId: command.selectedQuestionId
    });

    
    const question = room.questions?.find(x => x._id == command.selectedQuestionId);
    console.info('thinkProvokeSetQuestion: ', question);

    io.to(getRoomChannelName(room.code)).emit(
        EVENT_CLIENT_SET_QUESTION, question);

    io.to(getRoomChannelName(room.code)).emit(EVENT_CLIENT_SET_GAME_STARTED, {
        questions: command.questions,
        selectedQuizId: command.selectedQuestionId,
        question: question
    });

    roomEmitServerList(room);
}

function onClientConnectionClose(socket: Socket) {
    if(socket.data.email && socket.data.code) {
        const room = getRoomByCode(socket.data.code);

        if(room) {
            console.log('User leaved room: ', room);
        }
    }
}

type ThinkProvokeStartCommand = {
    code: string;
    questions: ThinkRoomQuestion[];
    selectedQuestionId: string;
}

const EVENT_SET_USER_LIST = 'set-user-list';
const EVENT_SET_GAME_STARTED = 'set-game-started';
const EVENT_SET_GAME_ANSWERS = 'set-game-answers';
const EVENT_CLIENT_SET_GAME_STARTED = 'client-set-game-started';
const EVENT_CLIENT_SET_QUESTION = 'client-set-question';

const ON_THINK_PROVOKE_HOST = 'think-provoke-host-establish';
const ON_THINK_PROVOKE_JOIN = 'think-provoke-join';
const ON_THINK_PROVOKE_LEAVE = 'think-provoke-leave';
const ON_THINK_PROVOKE_START = 'think-provoke-start';
const ON_THINK_PROVOKE_SET_QUESTION = 'think-provoke-set-question';
const ON_CLIENT_SEND_ANSWER = 'client-send-answer';
const ON_JOIN_CABIN = 'join-cabin';
const ON_CABIN_MESSAGE = 'cabin-message';

io.on('connection', (socket: Socket) => {
    socket.on(ON_THINK_PROVOKE_JOIN, (data: any) => {
        thinkProvokeClientJoin(socket, data);
    });

    socket.on(ON_THINK_PROVOKE_HOST, async (data: JoinUserCommand) => {
        await thinkProvokeHostEstablish(socket, data);

        // socket.emit(EVENT_SET_USER_LIST);
    });

    socket.on(ON_CLIENT_SEND_ANSWER, (answer: ThinkProvokeAnswer) => {
        thinkProvokeClientAnswer(socket, answer);
    });

    socket.on(ON_THINK_PROVOKE_LEAVE, (data: any) => {
        const room = getRoomByCode(socket.data.code);
        roomEmitServerList(room);
    });

    socket.on(ON_THINK_PROVOKE_START, async(command: ThinkProvokeStartCommand) => {
        await thinkProvokeStart(socket.data.code, command);
    });

    socket.on(ON_THINK_PROVOKE_SET_QUESTION, async (questionId: string) => {
        thinkProvokeSetQuestion(socket, questionId);
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
