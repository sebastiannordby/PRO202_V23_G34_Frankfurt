import { NextResponse } from 'next/server';
import Pusher from 'pusher';

export async function POST(request: Request) {
    const pusher = new Pusher({
        appId: "1611082",
        key: "bef553a644fc3fdd487a",
        secret: "69ae677f423abc552ab4",
        cluster: "eu",
        useTLS: true
    });

    const body = await request.formData();
    const socketId = body.get('socket_id')?.toString() ?? '';
    const channel = body.get('channel_name')?.toString() ?? '';

    console.log({
        socketId, channel
    })

    const authResponse = pusher.authorizeChannel(socketId, channel);

    return NextResponse.json(authResponse);
}