import getDatabaseAsync from '@/lib/mongodb';
import { NextResponse } from 'next/server';


export async function GET(req: Request) {
  const client = await getDatabaseAsync;
  const db = client.db("ancep");
  const badges = await db.collection('badges').find().toArray();
  console.log('Badges: ', badges);
  return NextResponse.json(badges);
}
export async function POST(req: Request) {
  const client = await getDatabaseAsync;
  const db = client.db("ancep");

  const {email, badges} = await req.json();

  console.log('req.body: ', req.body, 'req.body.email: ', email, 'req.body.badge: ', badges);



  if (!req.body || !email || !badges) {
    return NextResponse.json({ message: "No body provided" });
  }

  const updateResult = await db.collection('users').updateOne(
      { email: email},
      { $addToSet: { badges: badges } }
  );

  if (updateResult.matchedCount === 0) {
    return NextResponse.json({ message: "No user found" });
  }

    return NextResponse.json({ message: "User updated" });
}



