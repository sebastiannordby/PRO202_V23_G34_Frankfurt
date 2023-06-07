import { Question } from "@/lib/models/question";

export default function TextQuestionView(props:{question:Question}){

    const {question} = props;

    return(
            <label className="my-auto ">{question.Value}</label>
    )
    

}