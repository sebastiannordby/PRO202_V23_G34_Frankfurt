import { HostGameDB } from "@/lib/models/quiz/think-provoke/host-game";
import { TeminateGameCommand } from "@/lib/models/quiz/think-provoke/terminate-game";
import { THINK_PROVOKE_COLLECTION } from "@/lib/mongo-collections";
import getDatabaseAsync from "@/lib/mongodb";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    let client : MongoClient | null = null;

    try {
        const command = (await request.json()) as TeminateGameCommand;

        if(!command || command.code?.length == 0)
            return;

        client = await getDatabaseAsync();
        const db = client.db('ancep');
        const game = await db
            .collection<HostGameDB>(THINK_PROVOKE_COLLECTION)
            .findOne({ 
                code: command.code
            });

        console.log('Game: ', game);

        if(game) {
            await db
                .collection<HostGameDB>(THINK_PROVOKE_COLLECTION)
                .updateOne(
                {
                    code: command.code
                }, 
                {
                    $set: {
                        status: 'terminated'
                    }
                }
            );

            return new Response('Game terminated', {
                status: 200
            });
        }

        return new Response('No game to terminate', {
            status: 500
        })
    } finally {
        await client?.close();
    }
}