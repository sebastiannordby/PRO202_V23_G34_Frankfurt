import { Quiz } from "@/lib/models/quiz";
import Link from "next/link";

export default function QuizOverView(props:{quiz:Quiz}){

    const {quiz} = props;

    return(
        <Link href="/activities/createquiz">
            <div className="flex flex-col border border-[2px] rounded p-2 mt-1 align-center items-center">
                <label>{quiz.Name}</label>
                <label>Antall spørsmål:{quiz.Questions.length}</label>
            </div>
        </Link>
    )

    

}