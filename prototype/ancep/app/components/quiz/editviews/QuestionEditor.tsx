import { QuestionType, Question } from "@/lib/models/question";
import { Dispatch, useDebugValue, useEffect, useState } from "react";
import DilemmaQuestionEdit from "./DilemmaQuestionEdit";
import MultipleChoiceQuestionEdit from "./MultipleChoiceQuestionEdit";

export default function QuestionEditor(
    props:{
        type:QuestionType, 
        multipleChoiceAnswers:string[],
        dilemma1:string,
        dilemma2:string, 
        multipleChoiceAnswersChanged:Dispatch<string[]>,
        dilemma1Changed:Dispatch<string>,
        dilemma2Changed:Dispatch<string>
    })
    {

    const {
            type, 
            dilemma1, 
            dilemma2, 
            multipleChoiceAnswers, 
            dilemma1Changed, 
            dilemma2Changed,
            multipleChoiceAnswersChanged,
    } = props;


        


    switch(type){

        case QuestionType.Dilemma:
            return(
                <DilemmaQuestionEdit 
                    dilemma1={dilemma1}
                    dilemma1Changed={dilemma1Changed}
                    dilemma2={dilemma2}
                    dilemma2Changed={dilemma2Changed}
                />
            )
        case QuestionType.MultipleChoice:
            return(
                <MultipleChoiceQuestionEdit 
                    answers={multipleChoiceAnswers}
                    answersChanged={multipleChoiceAnswersChanged}
                />
            )
        default:
        return (<div/>);
    }

   

}