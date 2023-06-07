import getDatabaseAsync from '@/lib/mongodb';
import {NextResponse} from 'next/server';

export async function POST(req: Request) {
    const client = await getDatabaseAsync();
    const db = client.db("ancep");
    const {email, thought} = await req.json();

    const user = await db.collection('users').findOne({ email: email });
    const thoughtsLength = user?.thoughts ? user.thoughts.length : 0;

    if (thoughtsLength >= 10) {
        return NextResponse.json({ message: "Delete an element to push more!" });
    }
    const usersUpdated = await db.collection('users').updateOne(
        { email: email },
        {
            $push: {
                thoughts: thought
            }
        }
    );

    console.log('SET THOUGHT');

    await client.close();

    console.log('SET THOUGHT FINISHED');

    if (usersUpdated.matchedCount === 0) {
        return NextResponse.json({ message: "No user found" });
    }

    return NextResponse.json({ message: "THOUGHT ADDED" });
}