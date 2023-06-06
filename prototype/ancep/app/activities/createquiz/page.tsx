"use client"

import DilemmaQuestionView from "@/app/components/quiz/DilemmaQuestionView";
import EditQuestion from "@/app/components/quiz/EditQuestion";
import Popup from "@/app/components/client/Popup";
import { QuizAnswer } from "@/lib/models/answer";
import { Question, QuestionType } from "@/lib/models/question";
import { Quiz } from "@/lib/models/quiz"
import { eventNames } from "process";
import { useEffect, useState } from 'react';
import { Type } from "typescript";
import { create } from "domain";
import { createInflateRaw } from "zlib";
import QuizService from "@/lib/services/quizService";

export default function CreateQuiz(){
    const [quiz , setQuiz] = useState(new Quiz());
    const [showEditQuestion, setShowEditQuestion ] = useState(false);
    const [currentEditQuestion, setCurrentEditQuestion] = useState(new Question());
    const [testQuestions, setTestQuestions] = useState<Question[]>();

    const [quizName, setQuizName] = useState("");
    


    const QuestionsView: Function = (props:{questions:Question[]})=>{
        const {questions} = props;

        return questions?.map((data:Question)=>{
            var key = (Math.random() * 10).toString();

            return(
                <div key={key} className="flex grid grid-cols-[5fr_1fr]">
                    <DilemmaQuestionView question={data} keyValue={key.toString()}/>
                    <button 
                        className="border bg-white hover:bg-primary hover:text-white" 
                        onClick={()=> setShowEditQuestion(true)}>
                        Rediger
                    </button>
                </div>
            )
        })
    }

    const updateEditQuestion = (newValue:Question)=>{
        console.log("On Page")
        console.log(newValue.Answer?.MultipleChoice)
        console.log("QuestionValue: " + newValue.Value)
        setCurrentEditQuestion(newValue)
    }


    const createNewQuestion = ()=>{
        var test = new Question();
        setCurrentEditQuestion(test);
        console.log(test);
        setShowEditQuestion(true)
    }

    const saveQuiz = async ()=>{

        if(quizName !== ""){

            quiz.Name = quizName;
            var result = setQuiz(quiz);

            console.log(result);
            
            QuizService.addQuiz(quiz)
        }
    }

    return(
        <div className="flex flex-col p-1 h-full overflow-y-hidden main-layout" >

            <div 
                className="content flex flex-col w-full bg-white bg-opacity-[0.8] p-5 rounded-[1.5rem]"
                style={{ height: '100% !important'}}>

                <div className="my-4 flex w-full h-[50px] align-items-center items-center">
                    <h1 className="text-xl my-auto">Quiz Navn:</h1>
                    <input 
                        type="text" 
                        value={quizName} 
                        placeholder="Tast inn quiz navn"
                        className="focus:border-primary custom-input focus:border my-auto rounded text-xl  mx-2 shadow-xl"
                        onChange={(event)=>{setQuizName(event.target.value)}}  />
                    <button className="bg-white shadow-xl w-max rounded p-1 mr-2 text-xl border-primary border" onClick={()=>createNewQuestion()}>Legg til spørsmål</button>
                </div>
               
                <div className="flex flex-col h-full max-h-full overflow-y-auto">
                    <QuestionsView questions={testQuestions}/>
                </div>

                <EditQuestion 
                    question={currentEditQuestion} 
                    confirmed={()=>updateEditQuestion(currentEditQuestion)}
                    visible={showEditQuestion}
                    visibleChanged={(visible:boolean)=>setShowEditQuestion(visible)}/>

                <div className="p-2 flex align-items-end">
                    <button className="bg-primary text-white shadow-xl p-2 my-auto rounded text-xl h-min ml-auto" onClick={()=>saveQuiz()}>Lagre</button>
                </div>
            </div>
        </div>
    )
}