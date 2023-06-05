import { QuestionType, Question } from "@/lib/models/question";
import { Dispatch, useDebugValue, useEffect, useState } from "react";
import DilemmaQuestionEdit from "./DilemmaQuestionEdit";
import MultipleChoiceQuestionEdit from "./MultipleChoiceQuestionEdit";
import TextQuestionEdit from "./TextQuestionEdit";

export default function QuestionEditor(
    props:{
        type:QuestionType, 
        question:Question, 
        questionChanged:Dispatch<Question>
    })
    {

    const{type, question, questionChanged} = props;

    const[editQuestionValue, setEditQuestion] = useState("");
    


    useEffect(()=>{
        setEditQuestion(question!== undefined ? question.Value : "");
    },[]);


    const questionValueChanged = (newValue:string)=>{
        var quest  = question;
        quest.Value = newValue;
        questionChanged(quest);
        setEditQuestion(newValue);
    }


    const multipleChoiceAnswerModified = (newValue:string[])=>{
        var quest = question; 
        quest.Answer.MultipleChoice = newValue 
        questionChanged(quest)
        console.log(question.Answer.MultipleChoice);
    }


    const dilemma1Changed = (newValue:string)=>{
        var quest = question; 
        quest.Answer.Dilemma.Dilemma1 = newValue;
        questionChanged(quest);
    }
    const dilemma2Changed = (newValue:string)=>{
        var quest = question
        quest.Answer.Dilemma.Dilemma2 = newValue;
        questionChanged(quest);
    }



    switch(type){

        case QuestionType.Dilemma:
            return(
                <DilemmaQuestionEdit 
                    questionValue={editQuestionValue} 
                    questionValueChanged={questionValueChanged}
                    dilemma1={question.Answer.Dilemma.Dilemma1}
                    dilemma1Changed={dilemma1Changed}
                    dilemma2={question.Answer.Dilemma.Dilemma2}
                    dilemma2Changed={dilemma2Changed}
                />
            )
        case QuestionType.MultipleChoice:
            return(
                <MultipleChoiceQuestionEdit 
                    questionValue={editQuestionValue} 
                    questionValueChanged={questionValueChanged}
                    answers={question.Answer.MultipleChoice}
                    answersChanged={(newValue)=>multipleChoiceAnswerModified(newValue)}
                />
            )
        case QuestionType.TextAnswer:
            return(
                <TextQuestionEdit questionValue={editQuestionValue} questionValueChanged={questionValueChanged}/>
            )
    }


}