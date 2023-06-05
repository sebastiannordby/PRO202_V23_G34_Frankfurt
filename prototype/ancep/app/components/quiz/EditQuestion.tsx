import { Question, QuestionType } from "@/lib/models/question";
import Popup from "../client/Popup";
import { Dilemma, QuizAnswer } from "@/lib/models/answer";
import { Dispatch, use, useDeferredValue, useEffect, useState } from "react";
import { Quiz } from "@/lib/models/quiz";
import { setRequestMeta } from "next/dist/server/request-meta";
import { eventNames } from "process";
import MultipleChoiceQuestionEdit from "./MultipleChoiceQuestionEdit";

export default function EditQuestion(props:{question:Question, questionChanged:Function, visible:boolean, visibleChanged:Function}){

    const{question, questionChanged, visible, visibleChanged} = props;

    const [questionType, setQuestionType] = useState(QuestionType.TextAnswer);

    const [editQuestion, setEditQuestion] = useState(new Question())

  
    const QuizOptions: Function = (props:{click:Dispatch<QuestionType>, currentQuestionType: QuestionType}) => {
        const {click, currentQuestionType} = props;

        const[type, setType] = useState(QuestionType.TextAnswer);
        const [typeString, setTypeString] = useState<string>("");

        const [elements, setElements] = useState<JSX.Element[]>()
 
        const [allTypes, setAllTypes] = useState<string[]>();

        useEffect(()=>{
            var types = Object.values(QuestionType).filter((V) => isNaN(Number(V))) as string[];
            setAllTypes(types)
            setElements(custom);
        },[])

        const questionTypeSelected = (value:string)=>{
            var typeSelected = QuestionType[value as keyof typeof QuestionType];
            setTypeString(value);
            setType(typeSelected);
            click(typeSelected);
        }

        var custom = allTypes?.map((data:string)=>{ 
            var key = Math.random() * 10;
            return(
                <button className={"p-1 border rounded " + (typeString == data ? " bg-green-500" : " bg-blue-500")} key={key + "id"} onClick={()=>questionTypeSelected(data)}>
                    {data}
                </button>
            )
        })
      
        

        return custom;
    }



 


    const TextQuestionEdit: Function  = (props:{questionValue:string, questionValueChanged:Function })=>{

        const{questionValue, questionValueChanged} = props;
        return(
            <div>
                <label>Spørsmål:</label>
                <input value={questionValue} onChange={()=>questionValueChanged?.()} />
            </div>
        )
    }

    const DilemmaQuestionEdit : Function = 
    (props:
        {
            questionValue:string, 
            questionValueChanged:Dispatch<string>, 
            dilemma1:string, 
            dilemma1Changed:Dispatch<string>, 
            dilemma2:string,
            dilemma2Changed:Dispatch<string>
        }
    )=>
    {

        const{questionValue, dilemma1, dilemma2, questionValueChanged, dilemma1Changed, dilemma2Changed} = props;

        return(
            <div>
                <div>
                    <label>Spørsmål:</label>
                    <input value={questionValue}/>
                </div>
                <div className="grid grid-cols-2">
                    <label>Dilemma1:</label>
                    <label>Dilemma2:</label>
                    <input value={dilemma1} onChange={(event) => dilemma1Changed(event.target.value)} />
                    <input value={dilemma2} onChange={(event)=> dilemma2Changed(event.target.value)}/>
                </div>

            </div>
        )

    }

   


    const QuestionEditor: Function = (props:{type:QuestionType, question:Question, questionChanged:Dispatch<Question>})=>{

        const{type, question, questionChanged} = props;





        const questionAnswerModified = (newValue:string[])=>{
            question.Answer.MultipleChoice = newValue; 
            questionChanged(question)
        }

        switch(type){

            case QuestionType.Dilemma:
                return(
                    <DilemmaQuestionEdit />
                )
            case QuestionType.MultipleChoice:
                return(
                    <MultipleChoiceQuestionEdit 
                        questionValue={question.Value} 
                        questionValueChanged={(newValue)=>{question.Value = newValue;  questionChanged(question);}}
                        answers={question.Answer.MultipleChoice}
                        answersChanged={(newValue)=>questionAnswerModified(newValue)}
                    />
                )
            case QuestionType.TextAnswer:
                return(
                    <TextQuestionEdit/>
                )
        }


    }




    return(

        <Popup 
            visible={visible} 
            visibleChanged={(value:boolean)=> visibleChanged?.(value)} 
            title="Nytt spørsmål" 
            Footer={
                <div className="flex justify-end">
                    <button className="mr-2 border rounded border-color" onClick={()=>visibleChanged?.(false)}>Avbryt</button>
                    <button onClick={()=>questionChanged?.(question)} >Legg til</button>
                </div>
            } 
    >

        <div className="flex flex-col">
            <div className="flex flex-row">
                <label>Spørsmåls type:</label>        
                <div className="flex">
                    <QuizOptions click={(type:QuestionType)=> setQuestionType(type)} currentQuestionType={questionType}/>

                </div>
            </div>              
            <QuestionEditor type={questionType} question={editQuestion} questionChanged={(newValue:Question)=>setEditQuestion(newValue)}/>
        </div>
    </Popup>
    )

}