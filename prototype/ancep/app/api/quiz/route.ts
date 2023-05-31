import getDatabaseAsync from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const res = NextResponse.next();
    const client = await getDatabaseAsync;
    const db = client.db("ancep");
    const quizes = await db.collection('quizes').find().toArray();
  
    console.log('Quizes: ', quizes);
  
    return NextResponse.json(quizes);
}


export async function POST(req: Request){
    const res = NextResponse.next();
    const client = await getDatabaseAsync;
    const db = client.db("ancep");
    const quizes = await db.collection('quizes').find().toArray();
    quizes.push()
    
}