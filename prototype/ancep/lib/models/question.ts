import { QuizAnswer } from "./answer";

export class Question  {
    Id:string = "";
    Value:string = "";
    Type:QuestionType = QuestionType.TextAnswer
    QuizId:string = ""
    Answer:QuizAnswer = new QuizAnswer()


}

export enum QuestionType  {
    TextAnswer,
    Dilemma,
    MultipleChoice,
}