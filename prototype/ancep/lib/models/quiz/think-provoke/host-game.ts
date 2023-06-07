import { ObjectId } from "mongodb"

export type HostGameDB = {
    _id?: ObjectId;
    code: string;
    quizId: string;
    hostEmail: string;
    status: 'ongoing' | 'terminated' | 'finished';
}

export type HostGame = {
    _id: string;
    code: string;
    quizId: string;
    hostEmail: string;
    status: 'ongoing' | 'terminated' | 'finished';
}