import { Quiz } from "@/lib/models/quiz";
import Link from "next/link";
import { Dispatch } from "react";

export default function QuizOverView(props:{quiz:Quiz, removeQuizClicked:Dispatch<Quiz>}){

    const {quiz, removeQuizClicked} = props;

    return(
        <Link href={"/activities/createquiz/" + quiz._id}>
            <div className="flex bg-white   shadow-xl rounded p-2 mt-4 ">
                <div className="flex flex-col align-center items-center mx-auto">
                    <label>{quiz.Name}</label>
                    <label>Antall spørsmål:{quiz.Questions.length}</label>
                </div>
                <button className="btn bg-red-500 text-white" onClick={()=>removeQuizClicked(quiz)}>Slett</button>
            </div>
        </Link>
    )

    

}