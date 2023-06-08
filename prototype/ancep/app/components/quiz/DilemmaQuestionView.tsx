import { Question } from "@/lib/models/question";

export default function DilemmaQuestionView(props:{question:Question, keyValue?:string}){
    const {question, keyValue} = props;
    return(
        <div key={keyValue} className="flex flex-col  rounded bg-white">
            <textarea disabled className="w-full resize-none p-2" value={question.Value}/>

            <div className="flex flex-col p-2 rounded">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex p-2 flex-col rounded bg-blue-300">
                        <label >{question.Answer.Dilemma.Dilemma1}</label>
                    </div>
                    <div className="flex p-2 flex-col rounded bg-blue-300">
                        <label >{question.Answer.Dilemma.Dilemma2}</label>
                    </div>
                </div>
            </div>
          
        </div>
    )

}