"use client";

import QuizListView from "@/app/components/quiz/QuizListView";
import QuizOverView from "@/app/components/quiz/QuizOverView";
import { Quiz } from "@/lib/models/quiz";
import { useEffect, useState } from "react";

export default function ActivityOverview(){

    const [quizes, setQuizes] = useState<Quiz[]>([]);
    
    useEffect(()=>{
        var test:Quiz = new Quiz();
        test._id = "test";
        test.Name = "Min nye test quiz"

        var testList:Quiz[] = [];

        for (let i = 0; i < 10; i++) {
            testList.push(test);
        }
        setQuizes(testList);

    },[])


    return (
        <div className="flex flex-col">
            <h1 className="mx-auto">Mine Aktiviter</h1>
            <QuizListView quizes={quizes}/>
        </div>
    )
}