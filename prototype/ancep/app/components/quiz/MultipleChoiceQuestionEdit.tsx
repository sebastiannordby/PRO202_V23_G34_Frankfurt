import { Dispatch, useEffect, useState } from "react";

export default function MultipleChoiceQuestionEdit(
    props:{
        questionValue:string,
        questionValueChanged:Dispatch<string>,
        answers:string[],
        answersChanged:Dispatch<string[]>
    }
){

    const {questionValue, answers, answersChanged, questionValueChanged} = props;

    const[addAnswerVisible, setAddAnswerVisible] = useState<boolean>(false);

    const [viewAnswers, setViewAnswers] = useState<string[]>([])

    useEffect(()=>{
        if(answers !== undefined){
            setViewAnswers(answers);
        }


    },[])


    const AddAnswer:Function = (props:{visible:boolean, visibleChanged:Dispatch<boolean>, newAnswer:Dispatch<string>})=>{

        const {visible, visibleChanged, newAnswer} = props;

        const [answer, setAnswer] = useState("");

        const onEnter: Function =(key:string)=>{

            if(key === "Enter"){
                newAnswer(answer);
                setAnswer("");
            }

        }

        return(
            <div className={"flex" + visible ? "": " hidden"}>
                <input value={answer} onKeyUp={(event)=>onEnter(event.key)} onChange={(event) => setAnswer(event.target.value)}/>
                <button>Legg til</button>
            </div>
        )

    }

    
    const AnswerView:Function = (props:{answers:string[], removeClick:Dispatch<string>})=>{

        const {answers, removeClick} = props;

        const [viewAnswer, setViewAnswers] = useState<string[]>([]);
        
        useEffect(()=>{
            setViewAnswers(answers);
        },[])

        return viewAnswer?.map((data)=>{
            var key = Math.random() * 10;

            return(
                <div key={key} className="border rounded flex h-[50px]">
                    <label className="w-full my-auto">{data}</label>
                    <button className="bg-red-500 2-[25px] p-1" onClick={()=>removeClick(data)}>X</button>
                </div>
            )

        })
        

    }

    const answerAdded = (newAnswer:string)=>{

        viewAnswers.push(newAnswer);
        setViewAnswers(viewAnswers);
        answersChanged(viewAnswers);
        console.log(viewAnswers);
    }

    const removeAnswer = (answerToRemove:string)=>{

        console.log(answerToRemove);

        var index = viewAnswers.indexOf(answerToRemove)
        viewAnswers.splice(index, 1);
        setViewAnswers(viewAnswers);
        answersChanged(answers);
    }

    return(
        <div>
            <div>
                <label>Spørsmål:</label>
                <input value={questionValue} onChange={(event)=>questionValueChanged(event.target.value)}/>
            </div>
            <div className="flex flex-col">
                <button className="p-1 rounded bg-blue-500">Legg til svar alternativ</button>
                <AddAnswer visible={addAnswerVisible} visibleChanged={setAddAnswerVisible} newAnswer={answerAdded}/>
            </div>
            <div className="flex flex-col">
                <AnswerView answers={viewAnswers} removeClick={removeAnswer}/>
            </div>
        </div>
    )

}