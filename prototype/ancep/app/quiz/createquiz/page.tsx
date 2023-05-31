"use client"

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

    const [showEditQuestion, setShowEditQuestion ] = useState(false);

    const [currentEditQuestion, setCurrentEditQuestion] = useState({} as Question);

    return(
        <div className="flex flex-col p-1" >
            <input 
                type="text" 
                value={quiz?.Name} 
                className=" rounded border-black border border-[1px] mb-1"
                onChange={(event)=>{quiz.Name = event.target.value  }}  
            />
            <ul>
                <li>Ingen spørsmål</li>
            </ul>
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