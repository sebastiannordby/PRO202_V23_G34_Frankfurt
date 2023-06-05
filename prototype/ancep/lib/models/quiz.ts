import { Question } from "./question"

export class Quiz {
    _id?: string;
    Name: string = "";
    Questions: Question[] = [];
}