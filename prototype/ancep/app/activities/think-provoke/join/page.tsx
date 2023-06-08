"use client"
import { HomeArrow } from "@/app/components/HomeArrow";
import { FunctionComponent, useEffect, useState } from "react";
import { getJoinChannelName, getSocketServerAdr } from "@/lib/pusher-channels";
import { useSession } from "next-auth/react";
import { JoinUser } from "@/lib/models/quiz/think-provoke/join-user";
import { io, Socket } from 'socket.io-client';
import { Question, QuestionType } from "@/lib/models/question";
import { useRouter } from "next/navigation";

const EVENT_SET_GAME_STARTED = 'client-set-game-started';
const EVENT_SET_QUESTION = 'client-set-question';
const SEND_ANSWER = 'client-send-answer';
const EVENT_CLIENT_QUIT = 'client-quit';

export type GameStartedEvent = {
    question: Question;
    selectedQuizId: string;
};

export default function JoinThinkProvokePage() {
    const router = useRouter();
    const [hostCode, setHostCode] = useState<string | undefined>('');
    const [socket, setSocket] = useState<Socket>();
    const [currentQuestion, setCurrentQuestion] = useState<Question>();
    const [isQuizStarted, setIsQuizStarted] = useState(false);
    const [isInLobby, setIsInLobby] = useState(false);
    const [hasAnsweredQuestion, setHasAnsweredQuestion] = useState<boolean>(false);
    const [currentAnswer, setCurrentAnswer] = useState<string>();
    const { data: session } = useSession({
        required: true
    });

    useEffect(() => {
        const URL: string = getSocketServerAdr();
        const nSocket = io(URL, { transports : ['websocket'] });

        nSocket.connect();

        nSocket.on(EVENT_SET_GAME_STARTED, (command: GameStartedEvent) => {
            setCurrentQuestion(command.question);
            setIsQuizStarted(true);
        });

        nSocket.on(EVENT_SET_QUESTION, (question: Question) => {
            if(!question)
                return;

            setCurrentQuestion(question);
            setCurrentAnswer(undefined);
            setHasAnsweredQuestion(false);
        });

        nSocket.on(EVENT_CLIENT_QUIT, () => {
            socket?.disconnect();
            router.push('/');
        });

        setSocket(nSocket);

        return () => {
            nSocket?.emit('think-provoke-leave');
            nSocket?.close();
            setHostCode(undefined);
        };
    }, []);

    const joinGame = () => {
        if(hostCode?.length == 8) {
            const joinUser: JoinUser = {
                email: session?.user?.email ?? 'En feil har oppstått',
                fullName: session?.user?.name ?? 'En feil har oppstått',
                code: hostCode
            };

            socket?.emit(getJoinChannelName(hostCode), joinUser);
            setIsInLobby(true);
        } else {
            alert('Kode for å bli med må være 8 karakterer lang.');
        }
    };

    const onAnswerSelected = (answer: string) => {
        if(hasAnsweredQuestion) 
            return;

        console.info('User answered:', answer);
        setHasAnsweredQuestion(true);
        setCurrentAnswer(answer);
        socket?.emit(SEND_ANSWER, {
            email: session?.user?.email,
            questionId: currentQuestion?._id,
            answer: answer,
            fullName: session?.user?.name
        });
    };

    if(isQuizStarted) {
        if(hasAnsweredQuestion) {
            return(
                <main className="main-layout"
                    style={{background: "url('/images/think-provoke/join/background.png')"}}>
                    <div className="content text-center">
                        <h1>Spørsmål: {currentQuestion?.Value}</h1>
                        <p className="mt-2">Ditt svar: {currentAnswer}</p>
                    </div>
                </main>
            );
        }

        return (
            <main className="main-layout"
                style={{background: "url('/images/think-provoke/join/background.png')"}}>
                <div className="content">
                    <div className="flex flex-col justify-center">
                        <h1 className="mb-4 text-xl text-center">{currentQuestion?.Value}</h1>

                        <QuizQuestion 
                            sendAnswer={onAnswerSelected}
                            question={currentQuestion}/>
                    </div>
                </div>
            </main>
        );
    }

    if(isInLobby) {
        return (
            <main className="main-layout"
                style={{background: "url('/images/think-provoke/join/background.png')"}}>
                <div className="content text-center">
                    <h1>Venter på at verten skal starte.</h1>
                    <p>Vennligst vent 😎</p>
                </div>
            </main>
        );
    }

    return (
        <main className="main-layout"
            style={{background: "url('/images/think-provoke/join/background.png')"}}>
            
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

type QuizQuestionParams = {
    question: Question | undefined;
    sendAnswer: (answer: string) => void | undefined; 
};

const  QuizQuestion:FunctionComponent<QuizQuestionParams> = ({ question, sendAnswer }) => {
    const [textAnswer, setTextAnswer] = useState('');

    const sendTextAnswer = () => {
        sendAnswer(textAnswer);
        setTextAnswer('');
    };

    if(question?.Type == QuestionType.Dilemma) {
        return (
            <div className="flex gap-4 justify-center">
                <div
                    className="p-4 border border-slate-300 cursor-pointer rounded-md" 
                    onClick={() => sendAnswer(question.Answer.Dilemma.Dilemma1)}>
                        <p>{question.Answer.Dilemma.Dilemma1}</p>
                </div>
                <div
                    className="p-4 border border-slate-300 cursor-pointer rounded-md"
                    onClick={() => sendAnswer(question.Answer.Dilemma.Dilemma2)}>
                        <p>{question.Answer.Dilemma.Dilemma2}</p>
                </div>
            </div>
        );
    } else if(question?.Type == QuestionType.MultipleChoice) {
        return (
            <div className="flex gap-2 p-2 flex-wrap justify-center">
                {
                    question.Answer.MultipleChoice.map(x => 
                        <div 
                            key={x}
                            onClick={() => sendAnswer(x)}
                            className="p-2 px-5 rounded-md cursor-pointer border border-slate-300">{x}</div>
                    )
                }
            </div>
        );
    } else if(question?.Type == QuestionType.TextAnswer) {
        return (
            <div className="flex flex-col gap-2 p-2 justify-center">
                <p>Skriv ditt svar under: </p>

                <textarea 
                    rows={5}
                    value={textAnswer}
                    onChange={(e) => setTextAnswer(e.target.value)}
                    className="resize-none p-4 rounded-md">
                </textarea>

                <button 
                    onClick={sendTextAnswer}
                    data-modal-hide="defaultModal" 
                    type="button" 
                    className="ml-auto w-24 text-white bg-pink-600 hover:bg-pink-600 focus:ring-4 
                        focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm
                        p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                        dark:focus:ring-blue-800">Ferdig</button>
            </div>
        );
    } 

    return (<h1>Her er det noe feil?</h1>);
}