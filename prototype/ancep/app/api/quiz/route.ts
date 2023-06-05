import { Quiz } from "@/lib/models/quiz";
import getDatabaseAsync from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const res = NextResponse.next();
    const client = await getDatabaseAsync();
    const db = client.db("ancep");
    const quizes = await db.collection('quizes').find().toArray();
  
    console.log('Quizes: ', quizes);

    await client.close();

  
    return NextResponse.json(quizes);
}


export async function POST(req: Request){
    
    var newQuizJson = await req.json();

    const res = NextResponse.next();
    const client = await getDatabaseAsync();
    const db = client.db("ancep");
    const collection = await db.collection('quizes');
  

    collection.insertOne({},newQuizJson)

    await client.close();

  
    
}