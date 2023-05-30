"use client"

import { Question, QuestionType } from "@/lib/models/question";
import { Quiz } from "@/lib/models/quiz"
import { useEffect, useState } from 'react';
import { Type } from "typescript";

export default function CreateQuiz(){
    
    const [questions , setQuestions ] = useState<Question[]>();
    const [quiz, setQuiz] = useState<Quiz>();


    useEffect(()=>{

        setQuestions([{Id: "1", Value:"Kan kuer snakke?", Type: QuestionType.Dilemma , QuizId:"1"}])
        setQuiz({Id:"1", Name:"QuizName", Questions: questions ?? []})


    },[])


    const QuizOptions: Function = () => {
        var test = Object.values(QuestionType).filter((V) => isNaN(Number(V)));
        var elements = test.map((data)=> <option key={data}>{data}</option>)
        return elements;
    }

    
    const Questions: Function = (props:{quest:Question[]})=>{

        const {quest} = props;

        console.log("Kek\n" + quest);

        if(quest != undefined){
            return quest.map((data)=>{
                return(
                    <li key={data?.Id}>
                        <div className="flex">
                            <label>Spørsmåls type:</label>
                            <select title="Spørsmåls type" value={data.Type} onChange={(event)=>{data.Type = QuestionType[event.target.value as keyof typeof QuestionType]}}>
                                <QuizOptions/>
                            </select>
    
                        </div>
                        <div className="flex flex-col">
                            <label>Spørsmål:</label>
                            <input type="text rounded border border-black border-[1px]" value={data.Value} onChange={(event)=>data.Value = event.target.value} ></input>
                        </div>
                    </li>
                )
            })
        }
    }

    return(
        <div className="flex flex-col p-1" >
            <input type="text" value={quiz?.Name} onChange={(event)=>{quiz?.Name != undefined ? quiz.Name = event.target.value : "" }}  className=" rounded border-black border border-[1px] mb-1"/>
            <ul>
                <Questions quest={quiz?.Questions}/>   
            </ul>
            <button className="bg-blue-500 w-[50px] rounded mt-2">Ny</button>
        </div>
    )

}