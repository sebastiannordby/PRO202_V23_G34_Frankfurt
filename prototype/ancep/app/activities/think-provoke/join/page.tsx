"use client"
import { HomeArrow } from "@/app/components/HomeArrow";
import { useEffect, useState } from "react";
import { THINK_PROVOKE_CHANNEL, getClientPusher, getJoinChannelName, getSocketServerAdr } from "@/lib/pusher-channels";
import { useSession } from "next-auth/react";
import { JoinUser } from "@/lib/models/quiz/think-provoke/join-user";
import { io, Socket } from 'socket.io-client';

export default function JoinThinkProvokePage() {
    const [hostCode, setHostCode] = useState('');
    const [socket, setSocket] = useState<Socket>();
    const { data: session } = useSession({
        required: true
    });

    useEffect(() => {
        const URL: string = getSocketServerAdr();
        const nSocket = io(URL, { transports : ['websocket'] });

        nSocket.connect();

        setSocket(nSocket);
    }, []);

    const joinGame = () => {
        if(hostCode?.length == 8) {
            const joinUser: JoinUser = {
                email: session?.user?.email ?? 'En feil har oppstått',
                name: session?.user?.name ?? 'En feil har oppstått',
                hostCode: hostCode
            };

            socket?.emit(getJoinChannelName(hostCode), joinUser);
            alert('Du ble med i spillet. Sitt for å avvente');
        } else {
            alert('Kode for å bli med må være 8 karakterer lang.');
        }
    };

    return (
        <main className="main-layout">
            <HomeArrow />
            
            <div className="content">
                <h1 className="page-title mt-2">Tankevekker - Bli med</h1>

                <div>
                    <h3 className="text-lg">Tast inn tilgangskode</h3>
                    <div className="flex gap-2 mt-2">
                        <input 
                            value={hostCode}
                            onChange={(e) => setHostCode(e.target.value.replace(' ', ''))}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                            focus:border-blue-500 block flex-grow p-2.5 dark:bg-gray-700 dark:border-gray-600 
                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Tilgangskode"/>
                        <button 
                            data-modal-hide="defaultModal" 
                            type="button" 
                            onClick={joinGame}
                            className="ml-auto text-white bg-pink-600 hover:bg-pink-600 focus:ring-4 
                                focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm
                                p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                                dark:focus:ring-blue-800">Bli med</button>
                    </div>
                </div>
            </div>
        </main>
    );
}