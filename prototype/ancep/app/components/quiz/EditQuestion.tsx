import { Question, QuestionType } from "@/lib/models/question";
import Popup from "../client/Popup";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import DilemmaQuestionEdit from "./editviews/DilemmaQuestionEdit";
import MultipleChoiceQuestionEdit from "./editviews/MultipleChoiceQuestionEdit";

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
            setDilemme1(question.Answer.Dilemma.Dilemma1)
            setDilemme2(question.Answer.Dilemma.Dilemma2)
            setQuestionValue?.(question.Value)
            setMultipleAnswers?.(question.Answer.MultipleChoice)
        }
    },[visible])

    const saveQuestion = ()=>{
        
        var newQuestion = new Question();
        newQuestion.Value = questionValue;
        newQuestion.Answer.Dilemma.Dilemma1 = dilemma1;
        newQuestion.Answer.Dilemma.Dilemma2 = dilemma2;
        newQuestion.Answer.MultipleChoice = multipleChoiceAnswers;
       confirmed(newQuestion)
    };

    return(
        <Popup 
            visible={visible} 
            visibleChanged={(value:boolean)=> visibleChanged?.(value)} 
            title="Legg til et nytt spørsmål" 
            Footer={
                <div className="flex justify-end">
                    <button className="btn-primary mr-2" onClick={()=>visibleChanged?.(false)}>Avbryt</button>
                    <button className="btn-primary" onClick={()=>saveQuestion()} >Legg til</button>
                </div>
            }>
            <div className="flex flex-col max-h-full h-full p-4">
                <div className="flex flex-col w-full p-2 ">
                    <label className="text-xl text-black">Velg spørsmålstype</label>        
                    <div className="grid grid-cols-3 gap-2 mt-3">
                        <button className="btn"  onClick={() => setQuestionType(QuestionType.TextAnswer)}>Tekst svar</button>
                        <button className="btn"  onClick={() => setQuestionType(QuestionType.Dilemma)}>Dilemma</button>
                        <button className="btn"  onClick={() => setQuestionType(QuestionType.MultipleChoice)}>Flerspørsmål</button>
                    </div>
                </div> 
                <div className="flex flex-col h-full max-h-full  overflow-hidden mt-4">
                    <label className="text-xl ml-2">Spørsmål</label>
                    <textarea className="custom-input h-[150px] min-h-[150px] mt-3 mx-2" placeholder="Hvilke spørsmål vil du stille idag?" value={questionValue} onChange={(event)=>setQuestionValue(event.target.value)}/>
                    <div className="flex flex-col overflow-y-scroll h-full">
                        <QuestionEditor 
                            type={questionType}
                            dilemma1={dilemma1} 
                            dilemma1Changed={setDilemme1}
                            dilemma2={dilemma2}
                            dilemma2Changed={setDilemme2}
                            multipleChoiceAnswers={multipleChoiceAnswers}
                            multipleChoiceAnswersChanged={setMultipleAnswers}
                        />
                    </div>
                </div>             
            </div>
        </Popup>
    );
}

function QuestionEditor(
    props:{
        type:QuestionType, 
        multipleChoiceAnswers:string[],
        dilemma1:string,
        dilemma2:string, 
        multipleChoiceAnswersChanged:Dispatch<SetStateAction<string[]>>,
        dilemma1Changed:Dispatch<string>,
        dilemma2Changed:Dispatch<string>
}) {
    const {
            type, 
            dilemma1, 
            dilemma2, 
            multipleChoiceAnswers, 
            dilemma1Changed, 
            dilemma2Changed,
            multipleChoiceAnswersChanged,
    } = props;

    if(type == QuestionType.Dilemma) {
        return(
            <DilemmaQuestionEdit 
                dilemma1={dilemma1}
                dilemma1Changed={dilemma1Changed}
                dilemma2={dilemma2}
                dilemma2Changed={dilemma2Changed}/>
        );
    } else if(type == QuestionType.MultipleChoice) {
        return(
            <MultipleChoiceQuestionEdit 
                answers={multipleChoiceAnswers}
                answersChanged={multipleChoiceAnswersChanged}/>
        );
    } else if(type == QuestionType.TextAnswer) {
        return <h1>Kommer</h1>;
    } else {
        return <></>;
    }
}