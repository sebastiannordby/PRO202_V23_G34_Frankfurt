import { Dispatch, useDebugValue, useEffect, useState } from "react";
import MultipleChoiceAnswerViewList from "../answer/MultipleChoiceAnswerViewList";

export default function MultipleChoiceQuestionEdit(
    props:{
        answers:string[],
        answersChanged:Dispatch<string[]>
    }
){

    const { answers, answersChanged} = props;

    const [answerToAdd, setAnswerToAdd] = useState("")


    useEffect(()=>{
        console.log("this fires")
        if(answers === undefined){
            answersChanged([]);
        }

    },[answers])

    
   

    const answerAdded = (newAnswer:string)=>{

        if(newAnswer == "") return;

        var org = answers;
        var index = org.indexOf(newAnswer);
        if(index == -1){
            
            org.push(newAnswer);
            answersChanged(org);
            setAnswerToAdd("");
        }
    }

    const removeAnswer = (answerToRemove:string)=>{

        var org = answers;
        var index = org.indexOf(answerToRemove)
        if(index !== -1){

            org.splice(index, 1);
            answersChanged(org);
        }
    }

    const onEnter = (key:string)=>{

        if(key == "Enter"){
            answerAdded(answerToAdd);
        }

    }

    return(
        <div>
            <div className="flex flex-col">
                <label className="p-1">Legg til svar alternativ</label>

                <div className={"flex" }>
                    <input value={answerToAdd} onKeyUp={(event)=>onEnter(event.key)} onChange={(event) => setAnswerToAdd(event.target.value)}/>
                    <button onClick={()=>answerAdded(answerToAdd)}>Legg til</button>
                </div>
            </div>
            {
                answers.map((data)=>
                    <div key={data} className="border rounded flex h-[50px]">
                        <label className="w-full my-auto">{data}</label>
                        <button className="bg-red-500 2-[25px] p-1" onClick={()=>removeAnswer(data)}>X</button>
                    </div>
                )
            }
        </div>
    )

}