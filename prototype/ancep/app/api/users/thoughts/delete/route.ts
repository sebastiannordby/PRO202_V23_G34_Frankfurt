import getDatabaseAsync from "@/lib/mongodb";
import {NextResponse} from "next/server";
export async function POST(req: Request) {
    console.log('DELETE endpoint called');

    try {
        const client = await getDatabaseAsync();
        console.log('Connected to the database');
        const db = client.db("ancep");
        console.log('Database selected');
        const {email, thoughtToDelete } = await req.json();
        console.log(`Received email: ${email}, thought: ${thoughtToDelete}`);

        const result = await db.collection('users').updateOne(
            { email: email },
            {
                $pull: { thoughts: thoughtToDelete }
            }
        );

        console.log('DELETE operation performed', result);

        await client.close();
        console.log('Database connection closed');

        if (result.matchedCount === 0) {
            console.log('No user found');
            return NextResponse.json({ message: "No user found" });
        }

        console.log('Thought deleted successfully');
        return NextResponse.json({ message: "THOUGHT DELETED" });

    } catch (err) {
        console.log('Error in DELETE endpoint:', err);
        return NextResponse.json({ message: "Error" + err });
    }
}