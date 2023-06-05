import getDatabaseAsync from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const client = await getDatabaseAsync();
    const db = client.db("ancep");
    const users = await db.collection("users").find().toArray();

    await client.close();

    return NextResponse.json(users);
}

export async function POST(req: Request) {
    const client = await getDatabaseAsync();
    const db = client.db("ancep");
    const {email, status} = await req.json();
    const usersUpdated = await db.collection('users').updateOne(
        { email: email },
        { $set: { status: status } }
    );

    console.log('SET STATUS');

    await client.close();

    console.log('SET STATUS FINISHED');

    if (usersUpdated.matchedCount === 0) {
        return NextResponse.json({ message: "No user found" });
    }

    return NextResponse.json({ message: "Status Updated" });
}

