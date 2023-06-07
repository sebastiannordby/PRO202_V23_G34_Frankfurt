"use client"

import DilemmaQuestionView from "@/app/components/quiz/DilemmaQuestionView";
import EditQuestion from "@/app/components/quiz/EditQuestion";
import { Question } from "@/lib/models/question";
import { Quiz } from "@/lib/models/quiz"
import { useEffect, useState } from 'react';
import {QuestionService, QuizService} from "@/lib/services/quizService";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CreateQuiz(){
    const [quiz , setQuiz] = useState(new Quiz());
    const [showEditQuestion, setShowEditQuestion ] = useState(false);
    const [currentEditQuestion, setCurrentEditQuestion] = useState(new Question());
    const [questions, setQuestions] = useState<Question[]>();
    const [quizName, setQuizName] = useState("");
    const {quizId} = useParams()
    const {data:session} = useSession();
    const router = useRouter();



    useEffect(()=>{
        (async()=>{

            if(quizId !== undefined){
                var data = await QuizService.single(quizId)
                if(data !== null){
                    setQuiz(data);
                    setQuizName(data.Name);
                }
            }

        })()
       
        refreshQuestions();

        

    },[])


    const refreshQuestions = async ()=>{
        var quest = await QuestionService.all(quizId)

        console.log(quest);
        setQuestions(quest);
    }
    
    
    const QuestionsView: Function = (props:{questions:Question[]})=>{
        const {questions} = props;

        return questions?.map((data:Question)=>{
            var key = (Math.random() * 10).toString();

            return(
                <div key={key} className="flex grid grid-cols-[5fr_1fr]">
                    <DilemmaQuestionView question={data} keyValue={key.toString()}/>
                    <button 
                        className="border bg-white hover:bg-primary hover:text-white" 
                        onClick={()=> {setCurrentEditQuestion(data); setShowEditQuestion(true);}}>
                        Rediger
                    </button>
                </div>
            )
        })
    }

    const updateEditQuestion = async (newValue:Question)=>{
        
        var email = session?.user?.email ?? "";
        var _quizId = quizId;

        setShowEditQuestion(false);

        if(quizId === "" || quizId === undefined){
            var quiz = await insertQuiz(quizName, email);
            _quizId = quiz._id ?? "";
        }
        newValue.QuizId = _quizId;
        await QuestionService.add(newValue);
        router.push("/activities/createquiz/" + _quizId);
    }


    const createNewQuestion = ()=>{
        var test = new Question();
        setCurrentEditQuestion(test);
        console.log(test);
        setShowEditQuestion(true)
    }

    const insertQuiz = async (quizName:string, email:string) : Promise<Quiz> =>{

        
        if(email === ""){
            console.error("Du må være logget inn for å lage aktivitet");
        }
        quiz.Name = quizName;
        quiz.Email = email ?? "";

        
        var data = await QuizService.add(quiz)
        setQuiz(data);
        return data;
    
    }


    const saveQuiz = async ()=>{

        var result = await insertQuiz(quizName, session?.user?.email ?? "");
        setQuiz(result);

        router.push("/activities/createquiz/"+ result._id);

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
                    <QuestionsView questions={questions}/>
                </div>

                <EditQuestion 
                    question={currentEditQuestion} 
                    confirmed={(newValue:Question)=>updateEditQuestion(newValue)}
                    visible={showEditQuestion}
                    visibleChanged={(visible:boolean)=>setShowEditQuestion(visible)}/>

                <div className="p-2 flex align-items-end">
                    <button className="bg-primary text-white shadow-xl p-2 my-auto rounded text-xl h-min ml-auto" onClick={()=>saveQuiz()}>Lagre</button>
                </div>
            </div>
        </div>
    )
}