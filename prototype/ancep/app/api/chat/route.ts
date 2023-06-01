import { Server } from 'Socket.IO'
import { NextResponse } from 'next/server'
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: "1611082",
  key: "bef553a644fc3fdd487a",
  secret: "69ae677f423abc552ab4",
  cluster: "eu",
  useTLS: true
});

export default function POST(req: Request) {
    pusher.trigger("my-channel", "my-event", {
        message: "hello world"
    });
}