"use client"

import DilemmaQuestionView from "@/app/components/client/DilemmaQuestionView";
import EditQuestion from "@/app/components/client/EditQuestion";
import Popup from "@/app/components/client/Popup";
import { QuizAnswer } from "@/lib/models/answer";
import { Question, QuestionType } from "@/lib/models/question";
import { Quiz } from "@/lib/models/quiz"
import { eventNames } from "process";
import { useEffect, useState } from 'react';
import { Type } from "typescript";

export default function CreateQuiz(){
    
    const [quiz , setQuiz] = useState({} as Quiz);

    const [questions, setQuestions] = useState<JSX.Element[]>();

    const [showEditQuestion, setShowEditQuestion ] = useState(false);

    const [currentEditQuestion, setCurrentEditQuestion] = useState({} as Question);

    const [test, setTest] = useState<Question>(new Question());

    useEffect(()=>{
        test.Value = "Hvilken farge har kua";
        test.Answer.Dilemma.Dilemma1 = "Blå"
        test.Answer.Dilemma.Dilemma2 = "Rød"

        setTest(test);

        var customTest: JSX.Element[] = [];

        for (let i = 0; i < 10; i++) {

            customTest.push(
            <div className="flex grid grid-cols-[5fr_1fr]">
                <DilemmaQuestionView question={test} key={test.Value + i}/>
                <button className="border border-secondary rounded bg-primary hover:border-primary hover:bg-white">Rediger</button>
            </div>
            )
            
        }

        console.log(customTest);
        setQuestions(customTest);
    },[])


    return(
        <div className="flex flex-col p-1 h-full overflow-y-hidden" >
            <input 
                type="text" 
                value={quiz?.Name} 
                className=" rounded border-black border border-[1px] mb-1"
                onChange={(event)=>{quiz.Name = event.target.value  }}  
            />


            

            <div className="flex flex-col h-full max-h-full overflow-y-auto">
                    {questions}
            </div>


            <button className="bg-blue-500 w-[50px] rounded mt-2" onClick={()=>setShowEditQuestion(true)}>Ny</button>
           
           <EditQuestion 
                question={currentEditQuestion} 
                questionChanged={(newValue:Question)=>setCurrentEditQuestion(newValue)}
                visible={showEditQuestion}
                visibleChanged={(visible:boolean)=>setShowEditQuestion(visible)}
            />

                
     
        </div>

    )

}