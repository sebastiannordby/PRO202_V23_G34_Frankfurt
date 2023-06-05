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

export default function CreateQuiz(){
    
    const [quiz , setQuiz] = useState({} as Quiz);


    const [showEditQuestion, setShowEditQuestion ] = useState(false);

    const [currentEditQuestion, setCurrentEditQuestion] = useState(new Question());

    const [testQuestions, setTestQuestions] = useState<Question[]>();

    const [test, setTest] = useState<Question>(new Question());

    useEffect(()=>{
        test.Value = "Hvilken farge har kua";
        test.Answer.Dilemma.Dilemma1 = "Blå"
        test.Answer.Dilemma.Dilemma2 = "Rød"

        setTest(test);

        var customTest: Question[] = [];

        for (let i = 0; i < 10; i++) {

            customTest.push(test);
            
        }

        console.log(customTest);
        setTestQuestions(customTest);
    },[])


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

    return(
        <div className="flex flex-col p-1 h-full overflow-y-hidden main-layout" >

            <div className="flex flex-col w-full bg-white bg-opacity-[0.8] p-5 rounded-[1.5rem]">

                <div className="my-4 flex w-full h-[50px]">
                    <h1 className="text-2xl my-auto">Quiz Navn:</h1>
                    <input 
                        type="text" 
                        value={quiz?.Name} 
                        className="focus:border-primary custom-input focus:border my-auto rounded text-2xl  mx-2 shadow-xl"
                        onChange={(event)=>{quiz.Name = event.target.value  }}  
                    />
                    <button className="bg-primary text-white shadow-xl p-2 my-auto rounded text-xl h-min ml-auto">Lagre</button>

                </div>
               
                <button className="bg-white shadow-xl w-max  rounded p-1 mr-2 text-xl border-primary border mb-2" onClick={()=>createNewQuestion()}>Nytt spørsmål</button>
               
                <div className="flex flex-col h-full max-h-full overflow-y-auto">
                    <QuestionsView questions={testQuestions}/>
                </div>
                <EditQuestion 
                    question={currentEditQuestion} 
                    confirmed={()=>updateEditQuestion(currentEditQuestion)}
                    visible={showEditQuestion}
                    visibleChanged={(visible:boolean)=>setShowEditQuestion(visible)}
                />
            </div>
    
        </div>
    )
}