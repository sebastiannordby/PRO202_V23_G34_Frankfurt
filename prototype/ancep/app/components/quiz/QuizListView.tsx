import { Quiz } from "@/lib/models/quiz";
import { useEffect, useState } from "react";
import QuizOverView from "./QuizOverView";

export default function QuizListView(props:{quizes:Quiz[]}){
    const {quizes} = props;

    const [quizView, setQuizView]  = useState<JSX.Element[]>();

    useEffect(()=>{
    
        console.log("QuizListView:");
        console.log(quizes);
        var quizViewValue = quizes?.map((data)=>{
            var key = (Math.random() * 10).toString();
            return(
                <QuizOverView key={key} quiz={data}/>
            )
        })
        setQuizView(quizViewValue);
        
    },[quizes])

    

    return (
        <div className="flex flex-col h-full m-2 overflow-y-auto ">
            {quizView}
        </div>

    )
}