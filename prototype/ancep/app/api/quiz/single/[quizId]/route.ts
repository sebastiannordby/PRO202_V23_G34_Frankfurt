import { Quiz } from "@/lib/models/quiz";
import { QUIZ_COLLECTION } from "@/lib/mongo-collections";
import getDatabaseAsync from "@/lib/mongodb";
import { NextApiRequest } from "next";
import { Raleway } from "next/font/google";
import { useParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url);

    const quizId = searchParams.get("quizId") ?? "";

    console.log("QuizId: " + quizId);

    const client = await getDatabaseAsync();
    const db = client.db("ancep");
    const quizes = await db.collection<Quiz>(QUIZ_COLLECTION).findOne({_id:quizId,});
  
    console.log('Quizes: ', quizes);

    await client.close();

  
    return NextResponse.json(quizes);
}