import getDatabaseAsync from '@/lib/mongodb';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
    const client = await getDatabaseAsync();
    const db = client.db("ancep");
    const {email, picture} = await req.json();
    const usersUpdated = await db.collection('users').updateOne(
        { email: email },
        { $set: { picture: picture } }
    );

    console.log('SET PICTURE');

    await client.close();

    console.log('SET PICTURE FINISHED');

    if (usersUpdated.matchedCount === 0) {
        return NextResponse.json({ message: "No user found" });
    }

    return NextResponse.json({ message: "Profile Picture Updated" });
}