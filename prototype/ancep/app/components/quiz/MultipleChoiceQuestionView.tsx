import { Question } from "@/lib/models/question";
import { isPropertySignature } from "typescript";

export default function MultipleChoiceQuestionView(props:{question:Question}){

    const {question} = props;

    return(
        <div className="flex flex-col">
            <textarea disabled={true} value={question.Value}/>
            <div className="flex flex-col">
                {
                    question.Answer.MultipleChoice.map((data)=>
                        <label key={data} className="bg-blue-300 m-1 w-full p-1 rounded">
                            {data}
                        </label>
                    )
                }
            </div>
        </div>
    )
}