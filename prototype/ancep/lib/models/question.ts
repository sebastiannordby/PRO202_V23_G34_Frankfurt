import { QuizAnswer } from "./answer";

export type Question = {
    Id:string,
    Value:string,
    Type:QuestionType,
    QuizId:string,
    Answer:QuizAnswer,


}

export enum QuestionType  {
    MultipleChoice,
    TextAnswer,
    Dilemma
}