"use client"

import { HomeArrow } from "@/app/components/HomeArrow";
import { Quiz } from "@/lib/models/quiz";
import { useState } from "react";

export default function SoloThinkProvokePage() {
    const [quizes, setQuizes] = useState<Quiz[]>([
        {
            Email:"test@hot.no",
            Name: 'Quiz 1',
            Questions: []
        }
    ]);

    return (
        <main className="main-layout">
            <HomeArrow />
            
            <div className="content">
                <h1 className="page-title">Tankevekker - Solo</h1>
                <h3>Klikk på et av valgene nedenfor for å starte</h3>

                <div className="flex flex-col gap-2 p-2 ">
                    {quizes?.map(x => 
                        <div 
                            key={x.Name} 
                            className="p-2 border hover:cursor-pointer border-slate-400 px-4 rounded-md">
                            {x.Name}
                        </div>    
                    )}
                </div>
            </div>
        </main>
    );
}