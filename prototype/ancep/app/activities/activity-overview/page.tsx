"use client";

import QuizListView from "@/app/components/quiz/QuizListView";
import QuizOverView from "@/app/components/quiz/QuizOverView";
import { Quiz } from "@/lib/models/quiz";
import {QuizService} from "@/lib/services/quizService";
import { stat } from "fs";
import { ObjectId } from "mongodb";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ActivityOverview(){

    const [quizes, setQuizes] = useState<Quiz[]>([]);
    
    const {status, data:session} = useSession();

    useEffect(()=>{

        (async()=>{
            
            console.log("This runs");
            var data = await QuizService.all();
            console.log(data);
            setQuizes(data);

        })();

        var test:Quiz = new Quiz();
        test._id = "test";
        test.Name = "Min nye test quiz"

        var testList:Quiz[] = [];

        for (let i = 0; i < 10; i++) {
            testList.push(test);
        }



    },[])


    return (
        <div className="flex flex-col main-layout">
            <div className="w-full bg-white bg-opacity-[0.7] p-4 rounded-[1.5rem] h-full overflow-hidden max-h-full">
                <div className="flex justify-between w-full">
                    <h1 className="mx-auto text-4xl">Mine Aktiviter</h1>
                    <Link className="btn-primary" href="/activities/createquiz">
                        Lag ny
                    </Link>
                </div>

                <QuizListView quizes={quizes}/>
            </div>
        </div>
    )
}