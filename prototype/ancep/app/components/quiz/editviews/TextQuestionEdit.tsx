import { Dispatch, useEffect, useState } from "react";

export default function TextQuestionEdit(
    props:{
        questionValue:string, questionValueChanged:Dispatch<string> 
    }
)
{
    const{questionValue, questionValueChanged} = props;

    const [questionEditValue, setQuestionEditValue] = useState("");

    useEffect(()=>{
        if(questionValue !== undefined){
            setQuestionEditValue(questionValue)
        }
        
    },[])

    const valueChanged = (newValue:string)=>{
        setQuestionEditValue(newValue);
        questionValueChanged(newValue);
    }

    return(
        <div>
            <label>Spørsmål:</label>
            <input value={questionEditValue} onChange={(event)=>valueChanged(event.target.value)} />
        </div>
    )
}
