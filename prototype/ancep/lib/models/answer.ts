import { type } from "os"
import { QuestionType } from "./question"

export type QuizAnswer = {
        TextAnswer:string, 
        MultipleChoice:string[], 
        Dilemma: Dilemma
        
}

export type Dilemma = {
    DilemmaQuestion:string
    DilemmaAnswers1:string, 
    DilemmaTextAnswer:string
}

