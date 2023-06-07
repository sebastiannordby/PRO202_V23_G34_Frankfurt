"use client"

import { HomeArrow } from "@/app/components/HomeArrow";
import { Quiz } from "@/lib/models/quiz";
import { useEffect, useState } from "react";

export default function SoloThinkProvokePage() {
    const [quizes, setQuizes] = useState<Quiz[]>();

    useEffect(() => {
        (async() => {
            const response = await fetch('/api/quiz/all');
            const quiz = (await response.json()) as Quiz[];

            setQuizes(quiz);
        })();
    }, []);

    return (
        <main className="main-layout">
            <HomeArrow />
            
            <div className="content">
                <h1 className="page-title">Tankevekker - Solo</h1>
                <h3>Klikk på et av valgene nedenfor for å starte</h3>

                <div className="flex flex-col gap-2 p-4">
                    {quizes?.map(x => 
                        <div 
                            key={x.Name} 
                            className="p-3 py-5 border hover:scale-105 hover:cursor-pointer border-slate-400 px-4 rounded-md">
                            {x.Name}
                        </div>    
                    )}
                </div>
            </div>
        </main>
    );
}