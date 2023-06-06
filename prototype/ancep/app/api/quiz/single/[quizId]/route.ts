import { Quiz } from "@/lib/models/quiz";
import { QUIZ_COLLECTION } from "@/lib/mongo-collections";
import getDatabaseAsync from "@/lib/mongodb";
import { NextApiRequest } from "next";
import { Raleway } from "next/font/google";
import { useParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {

    const{ query } = req;

    console.log("QuizId: " + query?.quizId);

    const client = await getDatabaseAsync();
    const db = client.db("ancep");
    const quizes = await db.collection<Quiz>(QUIZ_COLLECTION).findOne({_id:query.quizId,});
  
    console.log('Quizes: ', quizes);

    await client.close();

  
    return NextResponse.json(quizes);
}