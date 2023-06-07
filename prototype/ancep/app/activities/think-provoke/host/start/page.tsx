"use client"

import { HomeArrow } from "@/app/components/HomeArrow";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { JoinUser } from "@/lib/models/quiz/think-provoke/join-user";
import { io, Socket } from 'socket.io-client';
import { getSocketServerAdr } from "@/lib/pusher-channels";
import { Quiz } from "@/lib/models/quiz";
import { StartGameCommand, StartGameResponse } from "@/lib/models/quiz/think-provoke/start-game";

export default function HostThinkProvokePage() {
    const [hostCode, setHostCode] = useState<string>('Laster kode..');
    const { data: session } = useSession();
    const [socket, setSocket] = useState<Socket>();
    const [socketOn, setSocketOn] = useState(false);
    const [joinedUsers, setJoinedUsers] = useState<JoinUser[]>([]);
    const [quizes, setQuizes] = useState<Quiz[]>([]);
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz>();
    const [quizStarted, setQuizStarted] = useState(false);

    useEffect(() => {
        (async() => {
            const response = await fetch('/api/quiz/all');
            const quizesRes = (await response.json()) as Quiz[];

            setQuizes(quizesRes);
        })();
    }, []);

    const startQuiz = async () => {
        if((session?.user?.email?.length ?? 0 > 0) && !socketOn) {
            const startQuizCommand: StartGameCommand = {
                email: session?.user?.email ?? '',
                quizId: selectedQuiz?._id ?? ''
            };

            const res = await fetch('/api/quiz/think-provoke/host',
            {
                method: 'POST',
                body: JSON.stringify(startQuizCommand)
            });
            
            if(res.ok) {
                const game = (await res?.json()) as StartGameResponse;
    
                setHostCode(game.code);

                const URL: string = getSocketServerAdr();
                const nSocket = io(URL, { transports : ['websocket'] });

                nSocket.connect();
                nSocket.on('think-provoke-joined', (data: JoinUser) => {
                    console.log('DATA: ', data);
                    setJoinedUsers(users => [...users, data]);
                });

                setSocket(socket);
                setSocketOn(true);

                nSocket.emit('think-provoke-host', {
                    hostCode: game.code
                });

                setQuizStarted(true);
            } else {
                alert('Kunne ikke starte spill: ' + await res.text());
            }
        }
    };

    if(!quizStarted) {
        return (
            <main className="main-layout">
                <HomeArrow/>

                <div className="content">
                    <h1 className="page-title">Velg hvem spill du vil hoste</h1>

                    <div className="p-2 flex flex-col gap-2">
                        {
                            quizes?.map(quiz => 
                                <div 
                                    key={quiz.Name}
                                    className={"p-3 py-5 border border-slate-400 rounded-md " + 
                                        (selectedQuiz == quiz ? " bg-pink-600 text-white" : "")} 
                                    onClick={() => setSelectedQuiz(quiz)}>
                                    {quiz.Name}
                                </div>
                            )
                        }
                    </div>
                    <div className="p-2 flex items-end">
                        <button 
                            onClick={startQuiz}
                            data-modal-hide="defaultModal" 
                            type="button" 
                            className="ml-auto w-24 text-white bg-pink-600 hover:bg-pink-600 focus:ring-4 
                                focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm
                                p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                                dark:focus:ring-blue-800">Start Quiz</button>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="main-layout">
            <HomeArrow />
            
            <div className="content" style={{ height: '100% !important'}}>
                <h1 className="page-title">Quiz - {selectedQuiz?.Name}</h1>
                <p className="mt-2">Del ut tilgangskoden nedenfor så andre kan bli med</p>

                <div className="p-2 mt-4">
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