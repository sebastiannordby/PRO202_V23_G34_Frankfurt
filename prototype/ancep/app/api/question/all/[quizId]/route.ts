import { Question } from "@/lib/models/question";
import { Quiz } from "@/lib/models/quiz";
import { QUESTION_COLLECTION, QUIZ_COLLECTION } from "@/lib/mongo-collections";
import getDatabaseAsync from "@/lib/mongodb";
import { useParams } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    const {quizId} = useParams();
    
    const client = await getDatabaseAsync();
    const db = client.db("ancep");
    const questions = await db.collection<Question>(QUESTION_COLLECTION).find({QuizId:quizId}).toArray();
  
    await client.close();
  
    return NextResponse.json(questions);
}

