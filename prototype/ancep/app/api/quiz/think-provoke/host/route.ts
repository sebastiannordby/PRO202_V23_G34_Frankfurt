import getDatabaseAsync from "@/lib/mongodb";
import { HostGameDB } from "@/lib/models/quiz/think-provoke/host-game";
import { NextResponse } from "next/server";
import { QUIZ_COLLECTION, THINK_PROVOKE_COLLECTION } from "@/lib/mongo-collections";
import { ExistingGameResponse, StartGameCommand, StartGameResponse } from "@/lib/models/quiz/think-provoke/start-game";
import { MongoClient, ObjectId } from "mongodb";
import { Quiz } from "@/lib/models/quiz";

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
    const userEmail = searchParams.get('email')?.toLocaleLowerCase();
    
    let client: MongoClient | null = null;

    try
    {
        client = await getDatabaseAsync();
        const db = client.db("ancep");

        const existingStartedGame = await db
            .collection<HostGameDB>(THINK_PROVOKE_COLLECTION)
            .findOne({
                status: 'ongoing',
                hostEmail: userEmail,
            });
           
        if(existingStartedGame) {
            const quiz = await db
                .collection(QUIZ_COLLECTION)
                .findOne({
                    _id: new ObjectId(existingStartedGame.quizId)
                });

            if(quiz) {
                const response: ExistingGameResponse = {
                    quizId: quiz._id.toString(),
                    code: existingStartedGame.code
                };

                return NextResponse.json(response);
            }
        }

        return NextResponse.json(null);
    } finally {
        await client?.close();
    }
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
            const response: StartGameResponse = {
                code: existingGame.code
            };
            return NextResponse.json(response);
        }
    
        const generatedCode = generateCode();
        const response: StartGameResponse = {
            code: generatedCode
        };
        await db
            .collection<HostGameDB>(THINK_PROVOKE_COLLECTION)
            .insertOne({
                _id: new ObjectId(),
                quizId: command?.quizId,
                code: generatedCode,
                hostEmail: command.email,
                status: 'ongoing'
            });

        return NextResponse.json(response);
    } finally {
       await client?.close();
    }
}