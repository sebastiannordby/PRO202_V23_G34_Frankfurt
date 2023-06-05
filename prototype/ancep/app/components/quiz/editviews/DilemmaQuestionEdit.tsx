import { Dispatch } from "react";

export default function  DilemmaQuestionEdit 
(props:
    {
        dilemma1:string, 
        dilemma1Changed:Dispatch<string>, 
        dilemma2:string,
        dilemma2Changed:Dispatch<string>
    }
)
{

    const{dilemma1, dilemma2, dilemma1Changed, dilemma2Changed} = props;

    return(
        <div className="h-full p-2">
            <div className="grid grid-cols-2  h-full gap-2">
                <div className="flex-col  flex h-full">
                    <label>Dilemma1:</label>
                    <textarea className="custom-input h-full text-black" placeholder="Et dilemma?" value={dilemma1} onChange={(event) => dilemma1Changed(event.target.value)} />
                </div>
                <div className="flex flex-col h-full">
                    <label>Dilemma2:</label>
                    <textarea className="custom-input h-full text-black" placeholder="To dilemma?" value={dilemma2} onChange={(event)=> dilemma2Changed(event.target.value)}/>
                </div>
            </div>

        </div>
    )

}