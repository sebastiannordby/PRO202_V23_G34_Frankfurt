import { Quiz } from "@/lib/models/quiz";
import { QUIZ_COLLECTION } from "@/lib/mongo-collections";
import getDatabaseAsync from "@/lib/mongodb";
import { NextApiRequest } from "next";
import { useParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url);

    const email = searchParams.get("email") ?? ""; 

    const client = await getDatabaseAsync();
    const db = client.db("ancep");
    const quizes = await db.collection<Quiz>(QUIZ_COLLECTION).find().toArray();
  
    console.log('Quizes: ', quizes);

    await client.close();
  
    return NextResponse.json(quizes);
}

