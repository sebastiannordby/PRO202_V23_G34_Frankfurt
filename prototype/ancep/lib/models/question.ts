export type Question = {
    Id:string,
    Value:string,
    Type:QuestionType,
    QuizId:string,

}

export enum QuestionType  {
    MultipleChoice,
    TextAnswer,
    Dilemma
}