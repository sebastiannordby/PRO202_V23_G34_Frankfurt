import { type } from "os"
import { QuestionType } from "./question"

export class QuizAnswer  {
    TextAnswer:string = "" 
    MultipleChoice:string[] = [] 
    Dilemma: Dilemma = new Dilemma() 
}

export class Dilemma  {
    DilemmaQuestion:string = ""
    Dilemma1:string = ""
    Dilemma2:string = ""
    DilemmaTextAnswer:string = ""
}


