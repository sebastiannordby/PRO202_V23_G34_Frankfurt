"use client"

import { HomeArrow } from "@/app/components/HomeArrow";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PusherClient from 'pusher-js';
import {Channel} from 'pusher-js';
import { THINK_PROVOKE_CHANNEL } from "@/lib/pusher-channels";
import { JoinUser } from "@/lib/models/quiz/think-provoke/join-user";

export default function HostThinkProvokePage() {
    const [hostCode, setHostCode] = useState<string>('Laster kode..');
    const { data: session } = useSession();
    const [joinedUsers, setJoinedUsers] = useState<JoinUser[]>([]);
    PusherClient.logToConsole = true;

    useEffect(() => {
        const pusher = new PusherClient('bef553a644fc3fdd487a', {
            cluster: 'eu'
        });
        
        const channel = pusher.subscribe(THINK_PROVOKE_CHANNEL);
       
        channel.bind('pusher:subscription_succeeded', function(members: any) {
            console.log('successfully subscribed!');
        });

        channel.bind('client-' + hostCode + '-join', function(user: JoinUser) {
            alert('Someone joined');
            joinedUsers.push(user);
            setJoinedUsers(joinedUsers);
        });
    }, []);

    useEffect(() => {
        if(session?.user) {
            (async() => {
                const res = await fetch(
                    '/api/quiz/think-provoke/host?email=' + session?.user?.email);
                
                if(res.ok) {
                    const jsonObj = await res?.json();
                    const {code} = jsonObj;
        
                    setHostCode(code);
                } else {
                    alert('Kunne ikke starte spill: ' + await res.text());
                }
            })();
        }
    }, [ session ]);

    return (
        <main className="main-layout">
            <HomeArrow />
            
            <div className="content" style={{ height: '100% !important'}}>
                <h1 className="page-title">Tankevekker - Host</h1>

                <div className="p-2">
                    <h3 className="text-lg">Din kode: {hostCode}</h3>
                    <input 
                        value={hostCode}
                        disabled
                        className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                        focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Kode?"/>
                </div>

                <div className="mt-2 p-2">
                    <h3 className="text-lg">Brukere som er med i spillet</h3>

                    <div className="flex flex-col gap-2">
                        {joinedUsers?.map(x => 
                            <div key={x.email} className="p-4">
                                <span>{x.name} - {x.email}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}