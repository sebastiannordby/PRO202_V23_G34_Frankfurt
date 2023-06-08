import { ObjectId } from "mongodb";import { QuizAnswer } from "./answer";

export class Question  {
    _id?:string;
    Value:string = "";
    Type:QuestionType = QuestionType.TextAnswer
    QuizId:string = ""
    Answer:QuizAnswer = new QuizAnswer()
}

export enum QuestionType  {
    TextAnswer = 0,
    Dilemma = 1,
    MultipleChoice = 2,
}