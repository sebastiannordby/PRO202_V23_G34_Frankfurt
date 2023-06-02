import getDatabaseAsync from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { UserProfile } from '@/lib/models/user-profile';
import { Badge } from '@/lib/models/badge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get('email')?.toLocaleLowerCase();

  const client = await getDatabaseAsync;
  const db = client.db("ancep");
  const user = await db.collection<UserProfile>('users').findOne({ email: userEmail });
  const badges = await db.collection<Badge>('badges').find().toArray();

  if(user?.badges) {
    const result: Badge[] = [];

    user?.badges?.forEach(userBadgeType => {
      const badge = badges.find(badge => 
        badge.type == userBadgeType);

      if(badge) {
        result.push(badge);
      }
    });

    //console.log('UserBadges: ', result);

    return NextResponse.json(result);
  }

  return NextResponse.json([]);
}
export async function POST(req: Request) {
  const client = await getDatabaseAsync;
  const db = client.db("ancep");
  const {email, badges} = await req.json();

  if (!req.body || !email || !badges) {
    return NextResponse.json({ message: "No body provided" });
  }

  const updateResult = await db.collection('users').updateOne(
      { email: email},
      { $addToSet: { badges: { $each: badges } } }
  );

  if (updateResult.matchedCount === 0) {
    return NextResponse.json({ message: "No user found" });
  }

    return NextResponse.json({ message: "Badge Added" });
}



