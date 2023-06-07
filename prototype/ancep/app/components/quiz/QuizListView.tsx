import { Quiz } from "@/lib/models/quiz";
import { useEffect, useState } from "react";
import QuizOverView from "./QuizOverView";
import { QuizService } from "@/lib/services/quizService";

export default function QuizListView(){

    const [quizView, setQuizView]  = useState<JSX.Element[]>();



    const removeQuiz = async (_quiz:Quiz)=>{

        await QuizService.remove(_quiz._id ?? "");
        await refreshQuizes();
    }

    const refreshQuizes = async ()=>{
        var quiz = await QuizService.all();

        console.log(quiz);
        var quizViewValue = quiz?.map((data)=>{
            var key = (Math.random() * 10).toString();
            return(
                <QuizOverView key={key} quiz={data} removeQuizClicked={removeQuiz}/>
            )
        })
        setQuizView(quizViewValue);
    }

    useEffect(()=>{
        (async()=>{
            await refreshQuizes();
        })()
        
    },[])

    

    return (
        <div className="flex flex-col h-full overflow-y-auto p-2 roudnded-[1.5rem] overflow-y-scroll h-[calc(100%_-_5rem)]">
            {quizView}
        </div>

    )
}