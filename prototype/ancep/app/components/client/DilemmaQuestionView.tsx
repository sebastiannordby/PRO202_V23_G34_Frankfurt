import { Question } from "@/lib/models/question";

export default function DilemmaQuestionView(props:{question:Question, key:string}){
    const {question, key} = props;
    return(
        <div key={key} className="flex flex-col border rounded p-2 bg-white">
            <label>{question.Value}</label>
            <div className="grid grid-cols-2 gap-1">
                <label className="p-2 border rounded bg-blue-300">{question.Answer.Dilemma.Dilemma1}</label>
                <label className="p-2 border rounded bg-blue-300" >{question.Answer.Dilemma.Dilemma2}</label>
            </div>

        </div>
    )

}