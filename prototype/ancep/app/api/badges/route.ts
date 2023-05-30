import getDatabaseAsync from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  console.log('Hig');
  const res = NextResponse.next();

    const client = await getDatabaseAsync;
    const db = client.db("ancep");
    const badges = await db.collection('badges').find().toArray();

    console.log('Badges: ', badges);

    return NextResponse.json(badges);
  }
