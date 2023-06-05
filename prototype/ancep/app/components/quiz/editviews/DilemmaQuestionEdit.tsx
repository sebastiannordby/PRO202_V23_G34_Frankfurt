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
        <div>
            <div className="grid grid-cols-2">
                <label>Dilemma1:</label>
                <label>Dilemma2:</label>
                <input value={dilemma1} onChange={(event) => dilemma1Changed(event.target.value)} />
                <input value={dilemma2} onChange={(event)=> dilemma2Changed(event.target.value)}/>
            </div>

        </div>
    )

}