import { Quiz } from "@/lib/models/quiz";
import { useEffect, useState } from "react";
import QuizOverView from "./QuizOverView";
import { QuizService } from "@/lib/services/quizService";

export default function QuizListView(props:{quizes:Quiz[]}){
    const {quizes} = props;

    const [quizView, setQuizView]  = useState<JSX.Element[]>();


    const removeQuiz = async (_quiz:Quiz)=>{

        await QuizService.remove(_quiz._id ?? "");

    }

    const refreshQuizes = ()=>{
        
    }

    useEffect(()=>{
    
        console.log("QuizListView:");
        console.log(quizes);
        var quizViewValue = quizes?.map((data)=>{
            var key = (Math.random() * 10).toString();
            return(
                <QuizOverView key={key} quiz={data} removeQuizClicked={removeQuiz}/>
            )
        })
        setQuizView(quizViewValue);
        
    },[quizes])

    

    return (
        <div className="flex flex-col h-full overflow-y-auto p-2 roudnded-[1.5rem] overflow-y-scroll h-[calc(100%_-_5rem)]">
            {quizView}
        </div>

    )
}