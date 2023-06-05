import { Question, QuestionType } from "@/lib/models/question";
import Popup from "../client/Popup";
import { Dispatch, useEffect, useState } from "react";
import QuestionEditor from "./editviews/QuestionEditor";

export default function EditQuestion(props:{question:Question, questionChanged:Dispatch<Question>, visible:boolean, visibleChanged:Dispatch<boolean>}){

    const{question, questionChanged, visible, visibleChanged} = props;

    const [questionType, setQuestionType] = useState(QuestionType.TextAnswer);

    const [editQuestion, setEditQuestion] = useState(new Question())


    const questionModified = (newValue:Question)=>{
    
        questionChanged(newValue)
    }

  
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
            <QuestionEditor type={questionType} question={question} questionChanged={(newValue:Question)=>questionModified(newValue)}/>
        </div>
    </Popup>
    )

}