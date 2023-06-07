import getDatabaseAsync from "@/lib/mongodb";
import { HostGameDB } from "@/lib/models/quiz/think-provoke/host-game";
import { NextResponse } from "next/server";
import { THINK_PROVOKE_COLLECTION } from "@/lib/mongo-collections";
import { StartGameCommand } from "@/lib/models/quiz/think-provoke/start-game";
import { MongoClient, ObjectId } from "mongodb";

function generateCode() {
    var code = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 8; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        code += characters[randomIndex];
    }

    return code;
}


export async function POST(request: Request) {
    const command = (await request.json()) as StartGameCommand;
    let client: MongoClient | null = null;

    try
    {
        client = await getDatabaseAsync();
        const db = client.db("ancep");
    
        const existingGames = await db
            .collection<HostGameDB>(THINK_PROVOKE_COLLECTION)
            .find({
                hostEmail: command.email,
                status: 'ongoing',
            }).toArray();
    
        const existingGame = existingGames.find(x => 
            x.quizId == command.quizId);
        const gamesToTerminate = existingGames.filter(x => 
            x != existingGame);
    
        for(let i = 0; i < gamesToTerminate.length; i++) {
            const gameToTerminate = gamesToTerminate[i];
    
            await db.collection(THINK_PROVOKE_COLLECTION)
                .updateOne(
                    {
                        _id: gameToTerminate._id
                    }, 
                    {
                        $set: {
                            status: 'terminated'
                        }
                    }
                );
        }
    
        if(existingGame) {
            console.log('Existing game: ', existingGame);
            return NextResponse.json({
                code: existingGame.code
            });
        }
    
        const generatedCode = generateCode();
        await db
            .collection<HostGameDB>(THINK_PROVOKE_COLLECTION)
            .insertOne({
                _id: new ObjectId(),
                quizId: command?.quizId,
                code: generatedCode,
                hostEmail: command.email,
                status: 'ongoing'
            });
    
        await client.close();
    
        return NextResponse.json({
            code: generateCode
        });
    } finally {
        client?.close();
    }
}