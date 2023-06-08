import { Question } from "@/lib/models/question";
import { isPropertySignature } from "typescript";

export default function MultipleChoiceQuestionView(props:{question:Question}){

    const {question} = props;

    return(
        <div className="flex flex-col w-full">
            <textarea className="p-2 w-full resize-none" disabled={true} value={question.Value}/>
            <div className="flex flex-col w-full gap-2 p-2">
                {
                    question.Answer.MultipleChoice.map((data)=>
                        <label key={data} className="bg-blue-300 w-full p-1 rounded">
                            {data}
                        </label>
                    )
                }
            </div>
        </div>
    )
}