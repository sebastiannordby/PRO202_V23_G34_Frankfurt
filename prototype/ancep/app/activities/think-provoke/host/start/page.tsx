"use client"

import { HomeArrow } from "@/app/components/HomeArrow";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { JoinUser } from "@/lib/models/quiz/think-provoke/join-user";
import { io, Socket } from 'socket.io-client';
import { getSocketServerAdr } from "@/lib/pusher-channels";
import { Quiz } from "@/lib/models/quiz";
import { ExistingGameResponse, StartGameCommand, StartGameResponse } from "@/lib/models/quiz/think-provoke/start-game";
import { TeminateGameCommand } from "@/lib/models/quiz/think-provoke/terminate-game";

export default function HostThinkProvokePage() {
    const [hostCode, setHostCode] = useState<string>('Laster kode..');
    const { data: session } = useSession({
        required: true
    });
    const [socket, setSocket] = useState<Socket>();
    const [socketOn, setSocketOn] = useState(false);
    const [joinedUsers, setJoinedUsers] = useState<JoinUser[]>([]);
    const [quizes, setQuizes] = useState<Quiz[]>([]);
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [quizStarted, setQuizStarted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(session?.user?.email) {
            (async() => {
                const quizesResponse = await fetch('/api/quiz/all');
                const quizesObj = (await quizesResponse.json()) as Quiz[];
                const onGoingQuizRes = await fetch('/api/quiz/think-provoke/host?email=' + session?.user?.email);
                const onGoingQuizObj = (await onGoingQuizRes.json()) as ExistingGameResponse;
                console.log('HERE: ', {
                    onGoingQuizObj
                });
    
                if(onGoingQuizObj) {
                    const onGoingQuiz = quizesObj
                        .find(x => x._id == onGoingQuizObj.quizId);
    
                    console.log('HERE: ', {
                        onGoingQuiz,
                        onGoingQuizObj
                    });
    
                    if(onGoingQuiz) {
                        setSelectedQuiz(onGoingQuiz);
                        setHostCode(onGoingQuizObj.code);
                        setQuizStarted(true);
                    }
                }
    
                setQuizes(quizesObj);
                setIsLoading(false);
            })();
        }
    }, [ session ]);

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

            console.log('RESPONSE: ', res);
            
            const game = (await res.json()) as StartGameResponse;
            if(!game?.code?.length)
                return;

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
        }
    };

    const stopQuiz = async() => {
        if(confirm("Er du sikker på at du vil avslutte denne quizen?")) {
            const command: TeminateGameCommand = {
                code: hostCode
            };

            const response = await fetch('/api/quiz/think-provoke/host/terminate', {
                method: 'POST',
                body: JSON.stringify(command)
            });

            if(response.ok) {
                setSelectedQuiz(null);
                setHostCode('');
                setQuizStarted(false);
            } else {
                alert('Kunne ikke terminere spill');
            }
        }
    };

    if(isLoading) {
        return (
            <main className="main-layout">
                <div className="content">
                    <h1>Leter etter eksisterende quizer. Vennligst vent...</h1>
                </div>
            </main>
        );
    }

    if(!quizStarted) {
        return (
            <main className="main-layout">
                <HomeArrow/>

                <div className="content">
                    <h1 className="page-title">Velg hvem quiz du vil være vert for</h1>

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
                <div className="flex gap-2 justify-between">
                    <div>
                        <h1 className="page-title">Quiz - {selectedQuiz?.Name}</h1>
                        <p className="mt-2">Del ut tilgangskoden nedenfor så andre kan bli med</p>
                    </div>

                    <button 
                        onClick={stopQuiz}
                        data-modal-hide="defaultModal" 
                        type="button" 
                        className="ml-auto w-24 self-start text-white bg-pink-600 hover:bg-pink-600 focus:ring-4 
                            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm
                            p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                            dark:focus:ring-blue-800">Avslutt</button>
                </div>

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