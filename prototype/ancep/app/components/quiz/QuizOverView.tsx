import { Quiz } from "@/lib/models/quiz";
import Link from "next/link";
import { Dispatch } from "react";

export default function QuizOverView(props:{quiz:Quiz, removeQuizClicked:Dispatch<Quiz>}){

    const {quiz, removeQuizClicked} = props;

    return(

        <div className="flex bg-white  shadow-xl rounded p-2 mt-4 ">
            <Link className="mx-auto " href={"/activities/createquiz/" + quiz._id}>
                    <div className="flex w-full h-full flex-col align-center items-center mx-auto">
                        <label className="m-auto">{quiz.Name}</label>
                    </div>
            </Link>
            <button className="btn bg-red-500 text-white" onClick={()=>removeQuizClicked(quiz)}>Slett</button>
        </div>
    )

    

}