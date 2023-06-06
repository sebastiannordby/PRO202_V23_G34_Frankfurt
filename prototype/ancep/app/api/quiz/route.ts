import { Quiz } from "@/lib/models/quiz";
import { QUIZ_COLLECTION } from "@/lib/mongo-collections";
import getDatabaseAsync from "@/lib/mongodb";
import { WithId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    const res = NextResponse.next();
    const client = await getDatabaseAsync();
    const db = client.db("ancep");
    const quizes = await db.collection(QUIZ_COLLECTION).find().toArray();
  
    console.log('Quizes: ', quizes);

    await client.close();

  
    return NextResponse.json(quizes);
}


export async function POST(req: Request) : Promise<Quiz> {
    
    var jsonData = await req.json();

    const client = await getDatabaseAsync();
    const db = client.db("ancep");
    const collection = await db.collection<Quiz>('quizes');
  

    var result = await collection.insertOne(jsonData)


    var newQuizValue = await collection.findOne({_id : result.insertedId}) ;

    console.log(newQuizValue);

    await client.close();

    return newQuizValue as Quiz;
}