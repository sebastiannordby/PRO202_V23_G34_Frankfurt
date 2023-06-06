import { Question } from "@/lib/models/question";
import { Quiz } from "@/lib/models/quiz";
import { QUESTION_COLLECTION, QUIZ_COLLECTION } from "@/lib/mongo-collections";
import getDatabaseAsync from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request){

    
    const newValue = JSON.parse(await req.json()) as Question;

    const client = await getDatabaseAsync();
    const db = client.db("ancep");
    const collection = await db.collection<Question>(QUESTION_COLLECTION);
  
    var exists = await collection.findOne({_id: newValue._id})

    if(exists !== null){
        const updateResult = await collection.updateOne({_id: newValue._id}, newValue)
        var newUpdatedQuestion = await collection.findOne({_id: newValue._id})
        await client.close();
        return NextResponse.json(newUpdatedQuestion);
    }

    const result = await collection.insertOne(newValue)

    var newQuestion = await collection.findOne({_id : result.insertedId}) ;

    await client.close();

    return NextResponse.json(newQuestion)
}