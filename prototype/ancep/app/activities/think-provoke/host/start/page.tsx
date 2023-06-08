"use client"

import { io, Socket } from 'socket.io-client';
import { HomeArrow } from "@/app/components/HomeArrow";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { JoinUser } from "@/lib/models/quiz/think-provoke/join-user";
import { getSocketServerAdr } from "@/lib/pusher-channels";
import { Quiz } from "@/lib/models/quiz";
import { ExistingGameResponse, StartGameCommand, StartGameResponse } from "@/lib/models/quiz/think-provoke/start-game";
import { TeminateGameCommand } from "@/lib/models/quiz/think-provoke/terminate-game";
import { QuestionService } from "@/lib/services/quizService";
import { Question } from "@/lib/models/question";
import { useRouter } from 'next/navigation';

const THINK_PROVOKE_ESTABLISH = 'think-provoke-host-establish';
const THINK_PROVOKE_QUIT = 'think-provoke-host-quit';
const THINK_PROVOKE_JOIN = 'think-provoke-join';
const THINK_PROVOKE_LEAVE = 'think-provoke-leave';
const THINK_PROVOKE_START = 'think-provoke-start';
const EVENT_SET_GAME_ANSWERS = 'set-game-answers';
const SET_QUESTION_COMMAND = 'think-provoke-set-question';

export type ThinkProvokeAnswer = {
    email: string;
    fullName: string;
    answer: string;
    questionId: string;
};

export default function HostThinkProvokePage() {
    const router = useRouter();
    const { data: session } = useSession({ required: true });
    const [hostCode, setHostCode] = useState<string>('Laster kode..');
    const [socket, setSocket] = useState<Socket>();
    const [socketOn, setSocketOn] = useState(false);
    const [joinedUsers, setJoinedUsers] = useState<JoinUser[]>([]);
    const [quizes, setQuizes] = useState<Quiz[]>([]);
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [quizLobbyOpen, setQuizLobbyOpen] = useState(false);
    const [isGameRunning, setIsGameRunning] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(-1);
    const [currentQuestion, setCurrentQuestion] = useState<Question>();
    const [currentQuestionAnswers, setCurrentQuestionAnswers] = useState<ThinkProvokeAnswer[]>([]);

    useEffect(() => {
        if(session?.user?.email) {
            (async() => {
                const quizesResponse = await fetch('/api/quiz/all');
                const quizesObj = (await quizesResponse.json()) as Quiz[];
                const onGoingQuizRes = await fetch('/api/quiz/think-provoke/host?email=' + session?.user?.email);
                const onGoingQuizObj = (await onGoingQuizRes.json()) as ExistingGameResponse;
    
                if(onGoingQuizObj) {
                    const onGoingQuiz = quizesObj
                        .find(x => x._id == onGoingQuizObj.quizId);
    
                    if(onGoingQuiz) {
                        setSelectedQuiz(onGoingQuiz);
                        setHostCode(onGoingQuizObj.code);
                        socketOpenGameLobby(onGoingQuizObj.code);
                    }
                }
    
                setQuizes(quizesObj);
                setIsLoading(false);
            })();
        }
    }, [ session ]);

    const openQuizLobby = async () => {
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

            const game = (await res.json()) as StartGameResponse;
            if(!game?.code?.length)
                return;

            setHostCode(game.code);
            socketOpenGameLobby(game.code);

            // return () => {
            //     socket?.close();
            //     setSocketOn(false);
            //     setQuizLobbyOpen(false);
            //     setSelectedQuiz(null);
            //     setQuizes([]);
            //     setIsLoading(true);
            // };
        }
    };

    const startGame = async() => {
        if(!confirm("Er du sikker på at du vil starte spillet?"))
            return;
        
        const questions = await QuestionService.all(selectedQuiz?._id ?? '');
        if(!questions || questions.length === 0 ) {
            alert('Det er ingen spørsmål i valgt quiz...');
            return;
        }

        if(!socket) {
            alert('Du har mistet forbindelsen..');
            return;
        }

        setQuestions(questions);
        setCurrentQuestionIndex(0);
        setCurrentQuestion(questions[0]);

        socket?.emit(THINK_PROVOKE_START, {
            code: hostCode,
            questions: questions,
            selectedQuestionId: questions[0]._id
        });
    };

    const socketOpenGameLobby = (code: string) => {
        console.info('socketOpenGameLobby: ', code);
        const URL: string = getSocketServerAdr();
        const nSocket = io(URL, { transports : ['websocket'] });

        nSocket.connect();
        nSocket.on('set-user-list', (data: JoinUser[]) => {
            console.info('set-user-list: ', data);
            setJoinedUsers(data ?? []);
        });

        nSocket.on('set-game-started', async (data: any) => {
            console.info('set-game-started: ', data);

            setIsGameRunning(true);
        });

        nSocket.on(EVENT_SET_GAME_ANSWERS, (anwers: ThinkProvokeAnswer[]) => {
            setCurrentQuestionAnswers(anwers);
        });

        setSocket(nSocket);
        setSocketOn(true);

        nSocket.emit(THINK_PROVOKE_ESTABLISH, {
            code: code
        });

        setQuizLobbyOpen(true);
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
                socket?.emit(THINK_PROVOKE_QUIT, {
                    code: hostCode
                });
                
                setSelectedQuiz(null);
                setHostCode('');
                setQuizLobbyOpen(false);
                setIsGameRunning(false);
                router.push('/');
            } else {
                alert('Kunne ikke terminere spill');
            }
        }
    };

    const gotoNextQuestion = () => {
        if(currentQuestionIndex + 1 <= questions.length) {
            const question = questions[currentQuestionIndex + 1];

            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCurrentQuestion(question);
            setCurrentQuestionAnswers([]);
            socket?.emit(SET_QUESTION_COMMAND, question._id);
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

    if(isGameRunning) {
        return (
            <main className="main-layout">
                <div className="content">
                    <div className="flex gap-2 w-full justify-between">
                        <div>
                            <h1>Spørsmål - {currentQuestionIndex + 1}</h1>
                            <p className="mt-2 text-lg">{currentQuestion?.Value}</p>
                        </div>
                        <div className="self-start flex gap-2">
                            <button 
                                onClick={gotoNextQuestion}
                                disabled={currentQuestionIndex + 1 == questions.length}
                                data-modal-hide="defaultModal" 
                                type="button" 
                                className={
                                    "ml-auto w-24 text-white bg-pink-600 hover:bg-pink-600 focus:ring-4" +
                                    "focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm" +
                                    "p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700" +
                                    "dark:focus:ring-blue-800" +
                                    (currentQuestionIndex + 1 == questions.length ? ' hidden' : '')
                                }>Neste spørsmål</button>
                            <button 
                                onClick={stopQuiz}
                                data-modal-hide="defaultModal" 
                                type="button" 
                                className="ml-auto w-24 text-white bg-pink-600 hover:bg-pink-600 focus:ring-4 
                                    focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm
                                    p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                                    dark:focus:ring-blue-800">Avslutt</button>
                        </div>    
                    </div>

                    <h2>Svar:</h2>
                    {
                        currentQuestionAnswers?.map(x => 
                            <div key={x.email} className="p-2">
                                {x.email} - {x.answer}
                            </div>
                        )
                    }
                </div>
            </main>
        );
    }

    if(!quizLobbyOpen) {
        return (
            <main className="main-layout">
                <HomeArrow/>

                <div className="content">
                    <h1 className="page-title">Velg hvilken quiz du vil være vert for</h1>

                    <div className="p-2 flex flex-col gap-2">
                        {
                            quizes?.map(quiz => 
                                <div 
                                    key={quiz._id}
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
                            onClick={openQuizLobby}
                            data-modal-hide="defaultModal" 
                            type="button" 
                            className="ml-auto w-24 text-white bg-pink-600 hover:bg-pink-600 focus:ring-4 
                                focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm
                                p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                                dark:focus:ring-blue-800">Åpne spill</button>
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

                    <div className="flex flex-col gap-2 max-h-52 overflow-auto">
                        {joinedUsers?.map(x => 
                            <div key={x.email} className="p-4">
                                <span>{x.fullName} - {x.email}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-2 flex align-items-end">
                    <button 
                        onClick={startGame}
                        data-modal-hide="defaultModal" 
                        type="button" 
                        className="ml-auto w-24 self-start text-white bg-pink-600 hover:bg-pink-600 focus:ring-4 
                            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm
                            p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                            dark:focus:ring-blue-800">Start</button>
                </div>
            </div>
        </main>
    );
}