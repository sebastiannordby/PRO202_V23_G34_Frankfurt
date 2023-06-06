import { Quiz } from "@/lib/models/quiz";
import { QUIZ_COLLECTION } from "@/lib/mongo-collections";
import getDatabaseAsync from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request){

    
    const jsonData = await req.json();

    const client = await getDatabaseAsync();
    const db = client.db("ancep");
    const collection = await db.collection<Quiz>(QUIZ_COLLECTION);
  

    const result = await collection.insertOne(jsonData)

    var newQuizValue = await collection.findOne({_id : result.insertedId}) ;

    await client.close();

    return NextResponse.json(newQuizValue)
}