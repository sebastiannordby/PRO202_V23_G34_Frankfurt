import { Quiz } from "@/lib/models/quiz";
import { Dispatch, useEffect, useState } from "react";
import QuizOverView from "./QuizOverView";
import { QuizService } from "@/lib/services/quizService";

export default function QuizListView(props:{removeQuizClicked:Dispatch<Quiz>, quizes:Quiz[]}){


    const {quizes, removeQuizClicked} = props;

    const [quizView, setQuizView]  = useState<JSX.Element[]>();

    useEffect(()=>{
        var quizViewValue = quizes?.map((data)=>{
            var key = (Math.random() * 10).toString();
            return(
                <QuizOverView key={key} quiz={data} removeQuizClicked={removeQuizClicked}/>
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