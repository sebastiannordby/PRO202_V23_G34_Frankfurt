import getDatabaseAsync from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { useSession } from "next-auth/react";


export async function GET(req: Request) {

    const client = await getDatabaseAsync;
    const db = client.db("ancep");
    const users = await db.collection("users").find().toArray();
    console.log('Users: ', users);
    return NextResponse.json(users);
}