import { Quiz } from "@/lib/models/quiz";
import { QUIZ_COLLECTION } from "@/lib/mongo-collections";
import getDatabaseAsync from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request){

    
    const jsonData = await req.json();
    const quiz = jsonData as Quiz;
    const objectId = new ObjectId(jsonData._id);

    console.log(objectId);

    const client = await getDatabaseAsync();
    const db = client.db("ancep");
    const collection = await db.collection(QUIZ_COLLECTION);
  
    const exists = await collection.findOne({_id: objectId })

    if(exists !== null){
        const updateResult = await collection.updateOne({_id: objectId}, {"$set": {Name: quiz.Name} as Quiz} );
        const updatedValue = await collection.findOne({_id: objectId});

        await client.close();
        return NextResponse.json(updatedValue);
    }

    const result = await collection.insertOne(jsonData)

    var newQuizValue = await collection.findOne({_id : result.insertedId}) ;

    await client.close();

    return NextResponse.json(newQuizValue)
}