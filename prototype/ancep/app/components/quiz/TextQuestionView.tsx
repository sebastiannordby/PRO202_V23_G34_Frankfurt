import { Question } from "@/lib/models/question";

export default function TextQuestionView(props:{question:Question}){

    const {question} = props;

    return(
            <textarea disabled className="my-auto " value={question.Value}/>
    )
    

}