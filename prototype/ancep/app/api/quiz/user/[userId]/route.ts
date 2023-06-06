import { Quiz } from "@/lib/models/quiz";
import { QUIZ_COLLECTION } from "@/lib/mongo-collections";
import getDatabaseAsync from "@/lib/mongodb";
import { useParams } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    const {userId} = useParams()
    const client = await getDatabaseAsync();
    const db = client.db("ancep");
    const quizes = await db.collection<Quiz>(QUIZ_COLLECTION).find({Email: userId}).toArray();
  
    console.log('Quizes: ', quizes);

    await client.close();
  
    return NextResponse.json(quizes);
}

