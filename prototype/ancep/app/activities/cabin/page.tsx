"use client"
import { KeyboardEvent, useState } from 'react';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { HomeArrow } from '@/app/components/HomeArrow';
import { v4 as uuidv4 } from 'uuid';
import { AddBadge } from '@/app/components/AddBadge';
import { io, Socket } from 'socket.io-client';
import { getSocketServerAdr } from '@/lib/pusher-channels';

const channelName: string = 'private-cabin';
const eventName: string = "client-message";

type ChatMessage = {
    message: string;
    user: string;
    id: string;
}

export default function CabinChatPage() {
    const { data: session } = useSession();
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [animationVisible, setAnimationVisible] = useState(true);
    const { addBadgeToProfile } = AddBadge();
    const [ socket, setSocket ] = useState<Socket>();

    useEffect(() => {
        if((session?.user?.email?.length ?? 0 > 0) && !socket) {
            const URL: string = getSocketServerAdr();
            const nSocket = io(URL, { transports : ['websocket'] });

            nSocket.connect();
            nSocket.on('cabin-message', (message: ChatMessage) => {
                setMessages(mess => [...mess, message]);
            });
            
            nSocket.emit('join-cabin');
            setSocket(nSocket);
        }
    }, [ session ]);

    useEffect(() => {
        setTimeout(() => {
            setAnimationVisible(false);
        }, 5000);
    }, []);

    const onInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && newMessage?.length > 0) {
            if(newMessage?.toLocaleLowerCase()?.includes("kom frem arne")) {
                open('/images/arne-busk.jpg', '_blank');
                addBadgeToProfile('10');
            }

            sendMessage();
        }
    };

    const sendMessage = () => {
        const chatMessage: ChatMessage = {
            message: newMessage,
            user: session?.user?.name ?? 'Ikke pålogget',
            id: uuidv4()
        };

        socket?.emit('cabin-message', chatMessage);      
        setNewMessage('');
        addBadgeToProfile('3');
    };

    return (
        <main className="main-layout think-cabin">
            <HomeArrow />

            <div className="content h-full flex-grow" 
                style={{maxHeight: '700px', display: animationVisible ? 'none' : 'flex'}}>
                <h1 className="page-title">Velkommen til tankehytta</h1>
                <p className="text-lg">Del dine tanker med andre</p>

                <div className="flex mt-2 flex-col h-full w-full  overflow-hidden">
                    <div className="bg-white rounded-lg p-2 overflow-auto flex-grow h-full border border-slate-300">
                        {messages?.map(x => 
                            <div key={x.id}>
                                <p>
                                    <span>{x.user}: {x.message}</span>
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2 mt-2">
                        <input 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                            focus:border-blue-500 block flex-grow p-2.5 dark:bg-gray-700 dark:border-gray-600 
                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={newMessage}
                            placeholder="Skriv en melding.."
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyUp={(e) => onInput(e)}></input>
                        <button 
                            onClick={sendMessage}
                            data-modal-hide="defaultModal" 
                            type="button" 
                            className="ml-auto w-24 text-white bg-pink-600 hover:bg-pink-600 focus:ring-4 
                                focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm
                                p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                                dark:focus:ring-blue-800">Send</button>
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