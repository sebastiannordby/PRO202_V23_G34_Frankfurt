import { Dispatch, SetStateAction, useDebugValue, useEffect, useState } from "react";
import MultipleChoiceAnswerViewList from "../answer/MultipleChoiceAnswerViewList";

export default function MultipleChoiceQuestionEdit(
    props:{
        answers:string[],
        answersChanged:Dispatch<SetStateAction<string[]>>
    }
){
    const { answers, answersChanged} = props;
    const [answerToAdd, setAnswerToAdd] = useState("")

    useEffect(()=>{
        if(answers === undefined){
            answersChanged([]);
        }
    },[answers])
   

    const answerAdded = (newAnswer:string)=>{
        if(newAnswer == "") 
            return;

        const index = answers.indexOf(newAnswer);

        if(index == -1) {
            answersChanged([...answers, newAnswer]);
            setAnswerToAdd("");
        } else {
            alert(newAnswer + ' er allerede registrert som et svar');
        }
    }

    const removeAnswer = (answerToRemove:string)=>{
        const index = answers.indexOf(answerToRemove)
        
        if(index !== -1) {
            const arr = [...answers];
            arr.splice(index, 1);
            answersChanged(arr);
        }
    }

    const onEnter = (key:string)=>{
        if(key == "Enter"){
            answerAdded(answerToAdd);
        }
    }

    return(
        <div className="mx-2">
            <div className="flex flex-col">
                <label className="p-1">Legg til svar alternativ</label>

                <div className={"flex " }>
                    <input className="custom-input " value={answerToAdd} onKeyUp={(event)=>onEnter(event.key)} onChange={(event) => setAnswerToAdd(event.target.value)}/>
                    <button className="btn-primary ml-2" onClick={()=>answerAdded(answerToAdd)}>Legg til</button>
                </div>
            </div>
            <div className="flex flex-col h-full max-h-full mt-2">
                {
                    answers.map((data)=>
                        <div key={data} className="border rounded flex h-[50px] p-2 border-black text-black my-1">
                            <label className="w-full my-auto">{data}</label>
                            <button 
                                className="bg-red-500 h-[35px] w-[35px] text-white rounded border border-red-500 text-xl hover:bg-white 
                                    hover:text-red-500 flex justify-center p-1" 
                                onClick={()=>removeAnswer(data)}>X</button>
                        </div>
                    )
                }
            </div>
        </div>
    );
}