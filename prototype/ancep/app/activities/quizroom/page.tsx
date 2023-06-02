"use client"
import DilemmaQuestionView from "@/app/components/client/DilemmaQuestionView";
import { Question } from "@/lib/models/question";
import { Quiz } from "@/lib/models/quiz";
import { useEffect, useState } from "react";


export default function QuizRoom(){

    const [questions, setQuestions] = useState<JSX.Element[]>();
    const [test, setTest] = useState(new Question());


    useEffect(()=>{
        test.Value = "Hvilken farge har kua";
        test.Answer.Dilemma.Dilemma1 = "Blå"
        test.Answer.Dilemma.Dilemma2 = "Rød"

        setTest(test);

        var customTest: JSX.Element[] = [];

        for (let i = 0; i < 10; i++) {

            customTest.push(
                <div>
                    <DilemmaQuestionView question={test} key={test.Value + i}/>
                    <button className="border rounded p-1 text-xl bg-primary hover:bg-secondary">Rediger</button>
                </div>
            )
            
        }

        console.log(customTest);
        setQuestions(customTest);

    },[])

    


    const QuizView: Function = ()=>{
        return(
            <div className="flex flex-col border rounded h-full overflow-y-auto max-h-full">

            {questions}            

        </div>
        )
    }

    return(
        <div className="flex h-full flex-col">
            <label>AktivitetsNavn</label>
            <QuizView/>
        </div>
    )
}