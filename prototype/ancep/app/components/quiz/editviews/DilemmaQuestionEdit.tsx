import { Dispatch } from "react";

export default function  DilemmaQuestionEdit 
(
    props: {
        dilemma1:string, 
        dilemma1Changed:Dispatch<string>, 
        dilemma2:string,
        dilemma2Changed:Dispatch<string>
    }
){
    const{dilemma1, dilemma2, dilemma1Changed, dilemma2Changed} = props;

    return(
        <div className="h-full p-2 mt-2">
            <div className="grid grid-cols-2 h-full gap-4">
                <div className="flex-col  flex h-full">
                    <label className="text-xl">Dilemma 1</label>
                    <textarea 
                        rows={5} 
                        className="mt-2 resize-none custom-input text-black"
                        placeholder="Et dilemma?" 
                        value={dilemma1}
                        onChange={(event) => dilemma1Changed(event.target.value)} />
                </div>
                <div className="flex flex-col h-full">
                    <label className="text-xl">Dilemma 2</label>
                    <textarea
                        rows={5}
                        className="mt-2 custom-input resize-none text-black"
                        placeholder="To dilemma?" 
                        value={dilemma2}
                        onChange={(event)=> dilemma2Changed(event.target.value)}/>
                </div>
            </div>
        </div>
    );
}