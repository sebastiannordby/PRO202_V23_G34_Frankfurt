import { QUESTION_COLLECTION } from "@/lib/mongo-collections";
import getDatabaseAsync from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request){


    const {searchParams} = new URL(req.url);
    const questionId = searchParams.get("questionId") ?? "";
    
    const client = await getDatabaseAsync();
    const db = client.db("ancep");
    const collection = await db.collection(QUESTION_COLLECTION);
  
    await collection.findOneAndDelete({_id: new ObjectId(questionId)})

    console.log(`Question: ${questionId} deleted`);

    return NextResponse.json(true);
}