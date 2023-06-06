import { Question } from "./question"

export class Quiz {
    _id?: string;
    Email:string = "";
    Name: string = "";
    Questions: Question[] = [];
}