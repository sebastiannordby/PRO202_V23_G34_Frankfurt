import { Question } from "@/lib/models/question";
import { Quiz } from "@/lib/models/quiz";
import { QUIZ_COLLECTION } from "@/lib/mongo-collections";
import getDatabaseAsync from "@/lib/mongodb";
import { useParams } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    const {questionId} = useParams();
    const client = await getDatabaseAsync();
    const db = client.db("ancep");
    const question = await db.collection<Question>(QUIZ_COLLECTION).findOne({_id:questionId});
  
    await client.close();
  
    return NextResponse.json(question);
}