import { El_Messiri } from "next/font/google";
import { Dispatch, useState, useEffect } from "react";

export default function AnswerViewList (props:{answers:string[], removeClick:Dispatch<string>}){

    const {answers, removeClick} = props;

    const [viewElements, setViewElements] = useState<JSX.Element[]>();
    useEffect(()=>{


        var elements = answers.map((data)=>{
                   
                    
            return(

                <div key={data} className="border rounded flex h-[50px]">
                    <label className="w-full my-auto">{data}</label>
                    <button className="bg-red-500 2-[25px] p-1" onClick={()=>removeClick(data)}>X</button>
                </div>
            )
        })
        setViewElements(elements);
    },[answers])


    return(
        <div className="flex flex-col h-full max-h-full overfly-scroll">
            {viewElements}
        </div>
    )

        

}