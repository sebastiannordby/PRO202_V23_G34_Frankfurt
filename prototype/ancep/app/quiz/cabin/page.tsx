"use client"
import PusherClient from 'pusher-js';
import {Channel} from 'pusher-js';
import { KeyboardEvent, useState } from 'react';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { HomeArrow } from '@/app/components/HomeArrow';
import { v4 as uuidv4 } from 'uuid';


const channelName: string = 'private-cabin';
const eventName: string = "client-message";

type ChatMessage = {
    message: string;
    user: string;
    id: string;
}

PusherClient.logToConsole = true;

export default function CabinChatPage() {
    const { data: session } = useSession();
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [pusherClient, setPusherClient] = useState<PusherClient>();
    const [channel, setChannel] = useState<Channel>();

    useEffect(() => {

        let newPusherClient = new PusherClient('bef553a644fc3fdd487a', {
            cluster: 'eu'
        });

        setPusherClient(newPusherClient);

        let newChannel = newPusherClient.subscribe(channelName);

        newChannel.bind('pusher:subscription_succeeded', function(members: any) {
            console.log('successfully subscribed!');
        });

        newChannel.bind(eventName, function(newMessage: any) {
            setMessages([...messages, newMessage]);
        });

        setChannel(newChannel);
    }, []);

    const onInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && newMessage?.length > 0) {

            if(newMessage?.toLocaleLowerCase()?.includes("kom frem arne")) {
                open('/images/arne-busk.jpg', '_blank');
            }

            if(!channel?.subscribed) {
                throw Error("Not subscribed");
            }

            const chatMessage: ChatMessage = {
                message: newMessage,
                user: session?.user?.email ?? 'Ikke pålogget',
                id: uuidv4()
            };

            channel.trigger(eventName, chatMessage);

            setMessages([ ...messages, chatMessage ]);
            setNewMessage('');
        }
    };

    return (
        <main className="main-layout">
            <HomeArrow />

            <div className="content h-full flex-grow">
                <h1 className="page-title">Velkommen til chatten</h1>

                <div className="flex flex-col h-full w-full max-h-96 overflow-hidden">
                    <div className="p-2 overflow-auto flex-grow h-full border border-slate-300">
                        {messages?.map(x => 
                            <div key={x.id}>
                                <p>
                                    <span>{x.user}: {x.message}</span>
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="p-2">
                        <input 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                            focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={newMessage}
                            placeholder="Skriv en melding.."
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyUp={(e) => onInput(e)}></input>
                    </div>    
                </div>
            </div>
        </main>
        
        
    );
}