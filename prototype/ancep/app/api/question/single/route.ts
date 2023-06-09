import { Question } from "@/lib/models/question";
import { Quiz } from "@/lib/models/quiz";
import { QUIZ_COLLECTION } from "@/lib/mongo-collections";
import getDatabaseAsync from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { useParams } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    const {searchParams} = new URL(req.url);
    const questionId = searchParams.get("questionId") ?? "";
    const client = await getDatabaseAsync();
    const db = client.db("ancep");
    const question = await db.collection(QUIZ_COLLECTION).findOne({_id: new ObjectId(questionId)});
    
    await client.close();
  
    return NextResponse.json(question);
}