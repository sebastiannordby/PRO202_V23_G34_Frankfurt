import { Question } from "@/lib/models/question";

export default function TextQuestionView(props:{ question:Question }){
    const {question} = props;

    return(
        <textarea disabled className="my-auto resize-none p-4 w-full h-44 rounded-md" value={question.Value}/>
    );
}