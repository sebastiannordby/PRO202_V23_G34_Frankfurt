import { Question, QuestionType } from "@/lib/models/question";
import Popup from "../client/Popup";
import { Dispatch, useEffect, useState } from "react";
import QuestionEditor from "./editviews/QuestionEditor";

export default function EditQuestion(
    props:{
        question:Question,
        visible:boolean, 
        visibleChanged:Dispatch<boolean>,
        confirmed:Dispatch<Question>
    }
)
{

    const
    {
        visible,
        question,
        confirmed,
        visibleChanged

    } = props;

    const [questionType, setQuestionType] = useState(QuestionType.TextAnswer);

    const [dilemma1, setDilemme1] = useState("");
    const [dilemma2, setDilemme2] = useState("");
    const [questionValue, setQuestionValue] = useState("");
    const [multipleChoiceAnswers, setMultipleAnswers] = useState<string[]>([]);


    useEffect(()=>{
        
        setDilemme1("")
        setDilemme2("")
        setQuestionValue?.("")
        setMultipleAnswers?.([])
        if(question !== undefined){
            setDilemme1?.(question.Answer.Dilemma.Dilemma1)
            setDilemme2?.(question.Answer.Dilemma.Dilemma2)
            setQuestionValue?.(question.Value)
            setMultipleAnswers?.(question.Answer.MultipleChoice)
        }


    },[visible])

  
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
                <button className="btn" key={key + "id"} onClick={()=>questionTypeSelected(data)}>
                    {data}
                </button>
            )
        })
      
        

        return custom;
    }


    const saveQuestion = ()=>{
        
        var newQuestion = new Question();
        newQuestion.Value = questionValue;
        newQuestion.Answer.Dilemma.Dilemma1 = dilemma1;
        newQuestion.Answer.Dilemma.Dilemma2 = dilemma2;
        newQuestion.Answer.MultipleChoice = multipleChoiceAnswers;
       confirmed(newQuestion)
    }


    const multipleChoiceEdited = (newValue: string[])=>{

        console.log(newValue);


        setMultipleAnswers(newValue);

    }


    return(

        <Popup 
            visible={visible} 
            visibleChanged={(value:boolean)=> visibleChanged?.(value)} 
            title="Nytt spørsmål" 
            Footer={
                <div className="flex justify-end">
                    <button className="btn-primary mr-2" onClick={()=>visibleChanged?.(false)}>Avbryt</button>
                    <button className="btn-primary" onClick={()=>saveQuestion()} >Legg til</button>
                </div>
            } 
    >

        <div className="flex flex-col max-h-full h-full">
            <div className="flex flex-col w-full    p-2 ">
                {/* <label className="w-max mx-auto text-2xl text-black">Spørsmåls type:</label>         */}
                <div className="grid grid-cols-3">
                    <QuizOptions click={(type:QuestionType)=> setQuestionType(type)} currentQuestionType={questionType}/>
                </div>
            </div> 
            <div className="m-4  flex flex-col  h-full max-h-full  overflow-hidden">

                <label className="text-2xl ml-2">Spørsmål:</label>
                <textarea className="custom-input h-[150px] min-h-[150px] mx-2" placeholder="Hvilke spørsmål vil du stille idag?" value={questionValue} onChange={(event)=>setQuestionValue(event.target.value)}/>
                <div className="flex flex-col overflow-y-scroll h-full">
                    <QuestionEditor 
                        type={questionType}
                        dilemma1={dilemma1} 
                        dilemma1Changed={setDilemme1}
                        dilemma2={dilemma2}
                        dilemma2Changed={setDilemme2}
                        multipleChoiceAnswers={multipleChoiceAnswers}
                        multipleChoiceAnswersChanged={multipleChoiceEdited}
                    />
                </div>
                
            </div>             
        </div>
    </Popup>
    )

}