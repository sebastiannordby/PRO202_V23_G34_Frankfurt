import getDatabaseAsync from "@/lib/mongodb";
import { HostGame } from "@/lib/models/quiz/think-provoke/host-game";
import { NextResponse } from "next/server";
import { THINK_PROVOKE_COLLECTION } from "@/lib/mongo-collections";

function generateCode() {
    var code = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 8; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
    }

    return code;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get('email')?.toLocaleLowerCase() ?? '';

    if(!userEmail){
        return;
    }

    const client = await getDatabaseAsync;
    const db = client.db("ancep");

    const existingGame = await db
        .collection<HostGame>(THINK_PROVOKE_COLLECTION)
        .findOne({
            hostEmail: userEmail,
            status: 'ongoing'
        });

    if(existingGame) {
        return NextResponse.json({
            code: existingGame.code
        });
    }

    const generatedCode = generateCode();
    await db
        .collection<HostGame>(THINK_PROVOKE_COLLECTION)
        .insertOne({
            code: generatedCode,
            hostEmail: userEmail,
            status: 'ongoing'
        });

    client.close();
    
    return NextResponse.json({
        code: generateCode
    });
}