import { ObjectId } from "mongodb"

export type HostGame = {
    _id?: ObjectId;
    code: string;
    hostEmail: string;
    status: 'ongoing' | 'finished';
}