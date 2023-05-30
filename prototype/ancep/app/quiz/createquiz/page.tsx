"use client"

import { Question, QuestionType } from "@/lib/models/question";
import { Quiz } from "@/lib/models/quiz"
import { useEffect, useState } from 'react';

export default function createQuiz(){
    
    const [questions , setQuestions ] = useState<Question[]>();
    // const [quiz, setQuiz] = useState<Quiz>();


    // useEffect(()=>{

    //     setQuestions([{Id: "", Value:"Kan kuer snakke?", Type: QuestionType.Dilemma , QuizId:""}])
    //     setQuiz({Id:"", Name:"QuizName", Questions: questions ?? []})


    // },[])

    // De over kjørte ikke i bygg
    // Prøv npm run build


    // const QuizOptions:JSX.Element[] = () => {
    //     var test = Object.values(QuestionType).filter((V) => isNaN(Number(V)));
    //     var elements = test.map((data)=> <option>{data}</option>)
    //     return elements;
    // }

    return(
        <div className="flex flex-col p-1" >
            <input type="text" value={quiz?.Name}  className=" rounded border-black border border-[1px] mb-1"/>
            <ul>
                <li className="flex flex-col border rounded border-black">
                    <div className="flex">
                        <label>Spørsmåls type:</label>
                        <select title="Spørsmåls type">
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label>Spørsmål:</label>
                        <input type="text rounded border border-black border-[1px]"></input>
                    </div>
                </li>
                <button className="bg-blue-500 w-[50px] rounded mt-2">Ny</button>
            </ul>
        </div>
    )
}