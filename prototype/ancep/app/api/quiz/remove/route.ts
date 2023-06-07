import { Question } from "@/lib/models/question";
import { QUESTION_COLLECTION, QUIZ_COLLECTION } from "@/lib/mongo-collections";
import getDatabaseAsync from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request){


    const {searchParams} = new URL(req.url);
    const quizId = searchParams.get("quizId") ?? "";
    
    const client = await getDatabaseAsync();
    const db = client.db("ancep");
    const questionCollection = await db.collection(QUESTION_COLLECTION);
    const quizCollection = await db.collection(QUIZ_COLLECTION);

    await questionCollection.deleteMany({QuizId: quizId });

    await quizCollection.findOneAndDelete({_id: new ObjectId(quizId)});



    return NextResponse.json(true);
}