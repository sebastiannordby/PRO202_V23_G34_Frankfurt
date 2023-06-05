import { Dispatch, useDebugValue, useEffect, useState } from "react";

export default function MultipleChoiceQuestionEdit(
    props:{
        questionValue:string,
        questionValueChanged:Dispatch<string>,
        answers:string[],
        answersChanged:Dispatch<string[]>
    }
){

    const {questionValue, answers, answersChanged, questionValueChanged} = props;

    const[internalAnswers, setInternalAnswers] = useState<string[]>([]);


useEffect(()=>{
    setInternalAnswers(answers);
},[])

    const AddAnswer:Function = (props:{newAnswer:Dispatch<string>})=>{

        const {newAnswer} = props;

        const [answer, setAnswer] = useState("");

        const onEnter: Function =(key:string)=>{

            if(key === "Enter"){
                newAnswer(answer);
                setAnswer("");
            }

        }

        return(
            <div className={"flex" }>
                <input value={answer} onKeyUp={(event)=>onEnter(event.key)} onChange={(event) => setAnswer(event.target.value)}/>
                <button>Legg til</button>
            </div>
        )

    }

    
    const AnswerViewList:Function = (props:{answers:string[], removeClick:Dispatch<string>})=>{

        const {answers, removeClick} = props;


        const [view, setView] = useState<JSX.Element[]>();
      
        useEffect(()=>{

            console.log("answers from AnswerViewList:\n"+answers)
           

            var viewList = answers.map((data)=>{
                var key = Math.random() * 10;
    
                return(
                    <div key={key} className="border rounded flex h-[50px]">
                        <label className="w-full my-auto">{data}</label>
                        <button className="bg-red-500 2-[25px] p-1" onClick={()=>removeClick(data)}>X</button>
                    </div>
                )
    
            })

            setView(viewList);


        },[])

        
        return(
            <div className="flex flex-col">
                {view}
            </div>
        ) ;

    }

    const answerAdded = (newAnswer:string)=>{
        var org = internalAnswers;
        org.push(newAnswer);
        answersChanged(org);
        setInternalAnswers(org)
    }

    const removeAnswer = (answerToRemove:string)=>{
        var index = answers.indexOf(answerToRemove)
        answers.splice(index, 1);
        answersChanged(answers);
    }

    return(
        <div>
            <div>
                <label>Spørsmål:</label>
                <input value={questionValue} onChange={(event)=>questionValueChanged(event.target.value)}/>
            </div>
            <div className="flex flex-col">
                <label className="p-1">Legg til svar alternativ</label>
                <AddAnswer newAnswer={answerAdded}/>
            </div>
            <AnswerViewList answers={internalAnswers} removeClick={removeAnswer}/>
        </div>
    )

}