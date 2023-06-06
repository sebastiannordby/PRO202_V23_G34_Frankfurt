import { Quiz } from "@/lib/models/quiz";
import { QUIZ_COLLECTION } from "@/lib/mongo-collections";
import { json } from "stream/consumers";


const GET = async <T>(url:string): Promise<T>=>{

    return {} as T;
}



const POST = async <T>(url:string, data:any): Promise<T>=>{

    var response = await fetch(url, {
        body: JSON.stringify(data),
        method: "POST"
    })

    if(!response.ok){
        return null as T;
    }

    var jsonValue = await response.json()
    console.log(jsonValue);

    return JSON.parse(jsonValue) as T;
}


const QuizService = {

    addQuiz: (data:Quiz)=> POST("/api/quiz", data),

}

export default QuizService;

