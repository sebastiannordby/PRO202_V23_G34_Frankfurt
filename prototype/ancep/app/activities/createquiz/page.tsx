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
                        className="border border-secondary rounded bg-primary hover:border-primary hover:bg-white" 
                        onClick={()=> setShowEditQuestion(true)}>
                        Rediger
                    </button>
                </div>
            )
        })
    }

    const updateEditQuestion = (newValue:Question)=>{
        console.log(newValue.Answer?.MultipleChoice)
        setCurrentEditQuestion(newValue)
    }


    return(
        <div className="flex flex-col p-1 h-full overflow-y-hidden" >
            <div className="flex mb-1">
                <button className="bg-blue-500  rounded p-1 mr-2 text-xl" onClick={()=>setShowEditQuestion(true)}>Nytt spørsmål</button>
                <button className="bg-blue-500 p-1 rounded text-xl">Lagre</button>
            </div>

            <div>
                <label>Quiz Navn:</label>
                <input 

                    type="text" 
                    value={quiz?.Name} 
                    className=" rounded border-black border border-[1px] mb-1"
                    onChange={(event)=>{quiz.Name = event.target.value  }}  
                />
            </div>


            

            <div className="flex flex-col h-full max-h-full overflow-y-auto">
                <QuestionsView questions={testQuestions}/>
            </div>


           
           <EditQuestion 
                question={currentEditQuestion} 
                questionChanged={(newValue:Question)=>updateEditQuestion(newValue)}
                visible={showEditQuestion}
                visibleChanged={(visible:boolean)=>setShowEditQuestion(visible)}
            />

                
     
        </div>

    )

}