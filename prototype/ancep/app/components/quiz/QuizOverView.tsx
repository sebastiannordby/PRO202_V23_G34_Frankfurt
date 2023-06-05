import { Quiz } from "@/lib/models/quiz";
import Link from "next/link";

export default function QuizOverView(props:{quiz:Quiz}){

    const {quiz} = props;

    return(
        <Link href="/activities/createquiz">
            <div className="flex bg-white flex-col  shadow-xl rounded p-2 mt-4 align-center items-center">
                <label>{quiz.Name}</label>
                <label>Antall spørsmål:{quiz.Questions.length}</label>
            </div>
        </Link>
    )

    

}