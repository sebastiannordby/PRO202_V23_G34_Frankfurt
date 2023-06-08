"use client";

import QuizListView from "@/app/components/quiz/QuizListView";
import { Quiz } from "@/lib/models/quiz";
import {QuizService} from "@/lib/services/quizService";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ActivityOverview(){

    const [quizes, setQuizes] = useState<Quiz[]>([]);


    useEffect(()=>{
        (async ()=>{
            await refresh();
        })();
    },[])

    const refresh = async ()=>{
        var data = await QuizService.all();
        setQuizes(data);
    }


    const removeQuiz = async (quiz:Quiz)=>{
        console.log("remove started");
        await QuizService.remove(quiz._id ??"");

        await refresh();
        console.log("remove ended")
    }

    return (
        <div className="flex flex-col main-layout h-full">
            <div className="w-full bg-white bg-opacity-[0.7] p-4 rounded-[1.5rem] h-full overflow-hidden max-h-full">
                <div className="flex justify-between w-full">
                    <h1 className="mx-auto text-4xl">Mine Aktiviter</h1>
                    <Link className="btn-primary" href="/activities/createquiz">
                        Lag ny
                    </Link>
                </div>

                <QuizListView quizes={quizes} removeQuizClicked={removeQuiz}/>
            </div>
        </div>
    )
}