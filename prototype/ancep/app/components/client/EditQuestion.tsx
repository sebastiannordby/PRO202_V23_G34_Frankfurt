import { Question, QuestionType } from "@/lib/models/question";
import Popup from "./Popup";
import { Dilemma, QuizAnswer } from "@/lib/models/answer";
import { use, useDeferredValue, useEffect, useState } from "react";
import { Quiz } from "@/lib/models/quiz";
import { setRequestMeta } from "next/dist/server/request-meta";
import { eventNames } from "process";

export default function EditQuestion(props:{question:Question, questionChanged:Function, visible:boolean, visibleChanged:Function}){

    const{question, questionChanged, visible, visibleChanged} = props;

    const [questionType, setQuestionType] = useState(QuestionType.TextAnswer);

    const [editQuestion, setEditQuestion] = useState(new Question())

  
    const QuizOptions: Function = () => {
        var test = Object.values(QuestionType).filter((V) => isNaN(Number(V)));
        var elements = test.map((data)=> <option key={data + "id"}>{data}</option>)
        return elements;
    }



    const DilemmaQuestionEdit:Function = ()=>{

        const [question, setQuestion] = useState("");
        const [dilemma1, setDilemma1] = useState("");
        const [dilemma2, setDilemma2] = useState("");

        const questionChanged = (newValue:string)=>{

            setQuestion(newValue);
            if(newValue === ""){
                
                editQuestion.Value = "";
            }
            else{

            }
            editQuestion.Value = newValue;
            setEditQuestion(editQuestion);
        }

        const dilemma1Changed = (newValue:string)=>{
            setDilemma1(newValue);
            if(newValue === ""){
                
                editQuestion.Answer.Dilemma.Dilemma1 = "";
            }
            else{

                editQuestion.Answer.Dilemma.Dilemma1 = question;
            }
            setEditQuestion(editQuestion);

        }

        const dilemma2Changed = (newValue:string)=>{
            setDilemma2(newValue);
            if(newValue === ""){
                
                editQuestion.Answer.Dilemma.Dilemma2 = "";
            }
            else{

                editQuestion.Answer.Dilemma.Dilemma2 = question;
            }
            setEditQuestion(editQuestion);

        }

        return(
            <div className="flex flex-col">
                <div className="flex">
                    <label>Spørsmål:</label>
                    <input className="custom-input" value={question} onChange={(event) => questionChanged(event.target.value)}/>
                </div>
                <div>
                    <label>Dilemma1</label>
                    <input className="custom-input" value={dilemma1} onChange={(event)=>dilemma1Changed(event.target.value)}/>
                </div>
                <div>
                    <label>Dilemma2</label>
                    <input className="custom-input" value={dilemma2} onChange={(event)=>dilemma2Changed(event.target.value)}/>
                </div>

            </div>
        )
    }


    const TextQuestion: Function  = ()=>{

        const [question, setQuestion] = useState("");

        const questionChanged: Function = (newValue:string)=>{

            setQuestion(newValue);
            editQuestion.Value = newValue;
        }

        return(
            <div>
                <label>Spørsmål:</label>
                <input value={question} />
            </div>
        )
    }



    return(

        <Popup 
            visible={visible} 
            visibleChanged={(value:boolean)=> visibleChanged?.(value)} 
            title="Nytt spørsmål" 
            Footer={
                <div className="flex justify-end">
                    <button onClick={()=>visibleChanged?.(false)}>Avbryt</button>
                    <button onClick={()=>questionChanged?.(question)} >Legg til</button>
                </div>
            } 
    >

        <div className="flex flex-col">
            <div className="flex flex-row">
                <label>Spørsmåls type:</label>        
                <select 
                    value={questionType}
                    onChange={(event)=>{
                        var newType = QuestionType[event.target.value as keyof typeof QuestionType]
                        question.Type = newType;
                        setQuestionType(newType)
                    }}
                >
                    <QuizOptions/>
                </select>        
            </div>
                
            <DilemmaQuestionEdit/>

        </div>
    </Popup>
    )

}