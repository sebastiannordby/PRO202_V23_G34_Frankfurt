import getDatabaseAsync from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const client = await getDatabaseAsync;
    const db = client.db("ancep");
    const users = await db.collection("users").find().toArray();

    client.close();

    return NextResponse.json(users);
}

export async function POST(req: Request) {
    const client = await getDatabaseAsync;
    const db = client.db("ancep");
    const {email, status} = await req.json();
    const usersUpdated = await db.collection('users').updateOne(
        { email: email },
        { $set: { status: status } }
    );

    client.close();

    if (usersUpdated.matchedCount === 0) {
        return NextResponse.json({ message: "No user found" });
    }

    return NextResponse.json({ message: "Status Updated" });
}

