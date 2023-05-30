import { Question } from "./question"

export type Quiz ={
    Id: string,
    Name: string,
    Questions: Question[]
}