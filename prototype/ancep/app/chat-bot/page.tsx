"use client"
import { HomeArrow } from "../components/HomeArrow";
import { useEffect } from "react";

export default function ChatBotPage() {

    useEffect(() => {
        document.title = 'Chatbot';
    }, []);
    
    return (
        <main className="main-layout">
            <HomeArrow />

            <div className="content">
                <h1 className="page-title">Chatbot - AI</h1>
                <p className="text-sm">Chat med Arne Næss</p>

                <div className="p-2 h-auto flex flex-col gap-2 relative">
                    <textarea 
                        style={{ resize: 'none'}}
                        className="bg-gray-50 h-64 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                        focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        disabled={true}>
                        Hei! Jeg er en kunstlig intelligens og kan masse om Arne Næss.
                        Spør meg om hva du vil så skal jeg svare så godt jeg kan.
                    </textarea>

                    <div className="flex gap-2">
                        <input 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                            focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Kjente du Arne Næss?"/>

                        <button 
                            data-modal-hide="defaultModal" 
                            type="button" 
                            className="ml-auto text-white bg-pink-600 hover:bg-pink-600 focus:ring-4 
                                focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5
                                py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                                dark:focus:ring-blue-800">Send</button>
                                
                    </div>
                </div>
            </div>
        </main>
    );
}