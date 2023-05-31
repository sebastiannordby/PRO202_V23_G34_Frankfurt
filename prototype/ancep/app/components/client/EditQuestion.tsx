import { Question, QuestionType } from "@/lib/models/question";
import Popup from "./Popup";
import { Dilemma, QuizAnswer } from "@/lib/models/answer";
import { use, useDeferredValue, useEffect, useState } from "react";
import { Quiz } from "@/lib/models/quiz";
import { setRequestMeta } from "next/dist/server/request-meta";

export default function EditQuestion(props:{question:Question, questionChanged:Function, visible:boolean, visibleChanged:Function}){

    const {question , questionChanged, visible, visibleChanged } = props;


    const [quiz , setQuiz] = useState({} as Quiz)

    const[questionType, setQuestionType] = useState(QuestionType.TextAnswer);

    useEffect(()=>{
        console.log("test")
        var quest:Question[] = [{Id: "1", Value:"Kan kuer snakke?", Type: QuestionType.Dilemma , QuizId:"1", Answer:{} as QuizAnswer}]
        setQuiz({Id:"1", Name:"QuizName", Questions: quest, });

        setQuestionType(question.Type);

    },[]);


    const QuizOptions: Function = () => {
        var test = Object.values(QuestionType).filter((V) => isNaN(Number(V)));
        var elements = test.map((data)=> <option key={data + "id"}>{data}</option>)
        return elements;
    }


    const MultipleChoice: Function = (props:{existingAnswers:string[], existingAnswersChanged:Function})=>{

        const{existingAnswers, existingAnswersChanged} = props;

        const[editAnswers, setEditAnswers] = useState<string[]>([]);

        useEffect(()=>{

            setEditAnswers(existingAnswers);

        },[])


        const ExistingAnswers :Function = ()=>{
            return existingAnswers.map((value)=>
                <li key={value}>
                    <label>
                        {value}
                    </label>
                    <button onClick={()=>{
                        var index = editAnswers.indexOf(value);
                        if(index > -1){
                            editAnswers.splice(index, 1);
                            setEditAnswers(editAnswers);
                        }
                    }}
                    >X</button>
                </li>
            );
        }


        return(

            <div>
                <ul>
                    <ExistingAnswers/>
                </ul>
            </div>

        )





    }


    const QuestionAnswerType: Function = (props:{answer:QuizAnswer, answerChanged:Function})=>{

        const {answer, answerChanged} = props

        const [editAnswer , setEditAnswer] = useState<QuizAnswer>({} as QuizAnswer);

        useEffect(()=>{
            setEditAnswer(answer);
        }, [])

        switch(questionType){
            
            case QuestionType.Dilemma:

            console.log(editAnswer)
            console.log(editAnswer.Dilemma)


            return(
                <div>
                    <label>Dilemma Spørsmål</label>                    
                    <input value={editAnswer.Dilemma.DilemmaQuestion} 
                        
                        onChange={(event)=> {
                            console.log()
                            editAnswer.Dilemma.DilemmaQuestion = event.target.value;
                            setEditAnswer(editAnswer);
                        }}/>

                    <div className="flex justify-between">
                        <input value={editAnswer.Dilemma.DilemmaAnswers[0]} 
                            onChange={(event)=>{
                                if(editAnswer.Dilemma.DilemmaAnswers == undefined) editAnswer.Dilemma.DilemmaAnswers = [];

                                editAnswer.Dilemma.DilemmaAnswers[0] = event.target.value;
                                setEditAnswer(editAnswer);


                        }}/>

                        <input 
                            value={editAnswer.Dilemma?.DilemmaAnswers[1]} 
                            onChange={(event)=>{
                                editAnswer.Dilemma.DilemmaAnswers[1] = event.target.value
                                setEditAnswer(editAnswer);
                                answerChanged?.(editAnswer);
                            }}
                        />

                    </div>
                    
                </div>
            )

            case QuestionType.TextAnswer:
            return(
                <div>
                    <label>Tekst spørsmål</label>
                    <div>
                        <input 
                            value={question.Value} 
                            onChange={(event)=>{
                                question.Value = event.target.value;
                            }}

                        />
                    </div>
                </div>
            )

            case QuestionType.MultipleChoice:
            return(
               <MultipleChoice existingAnswers={question.Answer.MultipleChoice} existingAnswersChanged={(newValue:string[])=>question.Answer.MultipleChoice = newValue}/>
            )
        }

        

    }
    
    const QuestionsView: Function = (props:{quest:Question[]})=>{

        const {quest} = props;
        if(quest != undefined){
            return quest.map((data)=>{

                return(
                    <li>
                        
                    </li>
                )
            })
        }
        else{
            return <span>Ingen spørsmål i quizen</span>
        }
    
    }

    const EditQuestion: Function = ()=>{

        if(question != undefined){
                return(
                    <div>
                        <div className="flex">
                            <label>Spørsmåls type:</label>
                            <select 
                                title="Spørsmåls type" 
                                value={questionType} 
                                onChange={(event)=>{
                                    var newType = QuestionType[event.target.value as keyof typeof QuestionType]
                                    question.Type = newType;
                                    setQuestionType(newType)
                                }}>


                                <QuizOptions/>

                            </select>
                        </div>
                        <QuestionAnswerType answer={question.Answer}/>
                    </div>
                )
        }
    }




    return(

        <Popup 
            visible={visible} 
            visibleChanged={(value:boolean)=> visibleChanged?.(value)} 
            BodyContent={<EditQuestion/>} 
            title="Nytt spørsmål" 
            Footer={
                <div className="flex justify-end">
                    <button onClick={()=>visibleChanged?.(false)}>Avbryt</button>
                    <button onClick={()=>questionChanged?.(question)} >Legg til</button>
                </div>
            } 
    />
    )

}