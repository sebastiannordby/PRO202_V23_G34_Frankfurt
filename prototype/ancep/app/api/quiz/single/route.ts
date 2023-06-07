import { Quiz } from "@/lib/models/quiz";
import { QUIZ_COLLECTION } from "@/lib/mongo-collections";
import getDatabaseAsync from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextApiRequest } from "next";
import { Raleway } from "next/font/google";
import { useParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url);

    const quizId = searchParams.get("quizId") ?? "";


    console.log("Quizid:" + quizId)
    const client = await getDatabaseAsync();
    const db = client.db("ancep");
    const collection = db.collection(QUIZ_COLLECTION);
    const quiz = await collection.findOne({_id: new ObjectId(quizId)});
  

    console.log(quiz);
    
    await client.close();

  
    return NextResponse.json(quiz);
}