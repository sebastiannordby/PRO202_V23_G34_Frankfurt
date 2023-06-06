import { Quiz } from "@/lib/models/quiz";
import { QUIZ_COLLECTION } from "@/lib/mongo-collections";
import { json } from "stream/consumers";
import { Question } from "../models/question";


const streamReader = async (reader?:ReadableStreamDefaultReader<Uint8Array> ): Promise<string>=>{
    var readingDone:boolean = false;
    var stringValue:string = "";
    var decoder = new TextDecoder();

    if(reader === undefined) return "";

    while(!readingDone){
        var readRes = await reader?.read();
        
        var bytes = readRes?.value
        readingDone = readRes?.done ?? false;
        var decodedValue = decoder.decode(bytes);
        if(decodedValue.includes("<!DOCTYPE")){
            readingDone = true;
            return "";
        }
        stringValue += decodedValue;


        if(readingDone){
            reader?.releaseLock();
        }
    }

    return stringValue;
}




const GET = async <T>(url:string): Promise<T>=>{
    var response = await fetch(url, {
        method: "GET"
    })

    if(!response.ok){
        return null as T;
    }
    var jsonValue = await streamReader(response.body?.getReader());
    return JSON.parse(jsonValue)
}



const POST = async <T>(url:string, data:any): Promise<T>=>{

    var response = await fetch(url, {
        body: JSON.stringify(data),
        method: "POST"
    })

    if(!response.ok){
        return null as T;
    }

    var jsonValue = await streamReader(response.body?.getReader());
    return JSON.parse(jsonValue)
}


const QuizService = {

    add: (data:Quiz) => POST<Quiz>("/api/quiz/add", data),
    all: ()=>GET<Quiz[]>("/api/quiz/all"),
    single: (quizId:string)=>GET<Quiz>("/api/quiz/single/" + quizId),
    quizByUser:(userId:string) => GET<Quiz[]>("/api/quiz/user/" + userId),

}

const QuestionService = {
    all:(quizId:string)=> GET<Question[]>("/api/question/all/" + quizId),
    single:(questionId:string) => GET<Question>("/api/question/single/" + questionId),
    add:(question:Question) => POST<Question>("/api/question/add", question),
    

}
export {QuizService, QuestionService};

