import { Question } from "@/lib/models/question";

export default function DilemmaQuestionView(props:{question:Question}){
    const {question} = props;
    return(
        <div className="flex flex-col  rounded p-2 bg-white">
            <label className="w-full ">{question.Value}</label>

            <div className="flex flex-col border p-1 rounded border-black">
                <label className="text-[15px]">Svar alternativer:</label>
                <div className="grid grid-cols-2 gap-1">
                    <div className="flex p-1 flex-col rounded p-1 bg-blue-300">
                        <label>A:</label>
                        <label >{question.Answer.Dilemma.Dilemma1}</label>
                    </div>
                    <div className="flex p-1 flex-col rounded p-1 bg-blue-300">
                        <label>B:</label>
                        <label >{question.Answer.Dilemma.Dilemma2}</label>
                    </div>
                </div>
            </div>
          
        </div>
    )

}