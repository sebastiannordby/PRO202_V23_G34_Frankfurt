"use client"
import PusherClient from 'pusher-js';
import {Channel} from 'pusher-js';
import { KeyboardEvent, useState } from 'react';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { HomeArrow } from '@/app/components/HomeArrow';
import { v4 as uuidv4 } from 'uuid';
import { AddBadge } from '@/app/components/AddBadge';

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
    const [animationVisible, setAnimationVisible] = useState(true);
    const { addBadgeToProfile } = AddBadge();

    useEffect(() => {
        setTimeout(() => {
            setAnimationVisible(false);
        }, 5000);
    }, []);

    useEffect(() => {
        const newPusherClient = new PusherClient('bef553a644fc3fdd487a', {
            cluster: 'eu'
        });

        setPusherClient(newPusherClient);

        const newChannel = newPusherClient.subscribe(channelName);

        newChannel.bind('pusher:subscription_succeeded', function(members: any) {
            console.log('successfully subscribed!');
        });

        newChannel.bind(eventName, function(newMessage: any) {
            const newMessages = [...messages, newMessage];

            console.log(newMessages);

            messages.push(newMessage);
            setMessages(messages);
        });

        setChannel(newChannel);
    }, []);

    const onInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && newMessage?.length > 0) {

            if(newMessage?.toLocaleLowerCase()?.includes("kom frem arne")) {
                open('/images/arne-busk.jpg', '_blank');
                addBadgeToProfile('10');
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
            messages.push(chatMessage);

            setMessages(messages);
            setNewMessage('');
            addBadgeToProfile('3')
        }
    };

    return (
        <main className="main-layout think-cabin">
            <HomeArrow />

            <div className="content h-full flex-grow" 
                style={{maxHeight: '700px', display: animationVisible ? 'none' : 'flex'}}>
                <h1 className="page-title">Velkommen til tankehytta</h1>
                <p className="text-lg">Del dine tanker med andre</p>

                <div className="flex mt-2 flex-col h-full w-full  overflow-hidden">
                    <div className="bg-white p-2 overflow-auto flex-grow h-full border border-slate-300">
                        {messages?.map(x => 
                            <div key={x.id}>
                                <p>
                                    <span>{x.user}: {x.message}</span>
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="mt-2">
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

            <div className="video" style={{ display: animationVisible ? 'flex' : 'none'}}>
                <video 
                    autoPlay muted loop>
                    <source src="/videos/tankevekker.mp4" type="video/mp4" />
                </video>
            </div>
        </main>
    );
}