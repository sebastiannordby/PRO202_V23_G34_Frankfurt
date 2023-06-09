"use client"
import Link from "next/link";
import { HomeArrow } from "../components/HomeArrow";
import { useEffect } from "react";

export default function QuizPage() {
    useEffect(() => {
        document.title = 'Aktiviteter';
    }, []);

    return(
        <main className="main-layout">
            <HomeArrow />
            
            <div className="content">
                <h1 className="page-title">Aktiviteter</h1>
                <p className="text-lg">Morsomme aktiviteter alene eller med andre</p>
                
                <div 
                    className="h-full p-2 mx-auto w-full gap-2 flex flex-col justify-center items-center text-center lg:mb-0 md:flex-row md:flex-wrap lg:text-left mt-6 text-white max-w-3xl">
                    <Link
                        href="/activities/cabin"
                        className="h-36 flex gap-3 items-center card cabin-background w-full shadow-xl group rounded-lg hover:border transition-colors hover:border-white"
                        rel="noopener noreferrer">
                        <div className="flex flex-col items-center justify-center text-left bg-transparent-black rounded-lg text-white px-5 py-3 h-full w-full">
                            <h2 className={"mb-1 text-2xl font-semibold"}>Tankehytta</h2>
                            <p className={"m-0 max-w-[30ch] text-sm"}>Del dine tanker og reflekter med andre</p>
                        </div>
                    </Link>
                    <Link
                        href="/activities/think-provoke"
                        className="h-36 flex gap-3 items-center card think-provoke-background w-full shadow-xl group rounded-lg hover:border transition-colors hover:border-white"
                        rel="noopener noreferrer">
                        <div className="flex flex-col items-center justify-center text-left bg-transparent-black rounded-lg text-white px-5 py-3 h-full w-full">
                            <h2 className={"mb-1 text-2xl font-semibold"}>Tankevekker</h2>
                            <p className={"m-0 max-w-[30ch] text-sm"}>Vekk ditt indre</p>
                        </div>
                    </Link>
                    <Link
                        href="/activities/think-bubble"
                        className="h-36 flex gap-3 items-center card think-bubble-background w-full shadow-xl group rounded-lg hover:border transition-colors hover:border-white"
                        rel="noopener noreferrer">
                        <div className="flex flex-col items-center justify-center text-left bg-transparent-black rounded-lg text-white px-5 py-3 h-full w-full">
                            <h2 className={"mb-1 text-2xl font-semibold"}>Tankebobla</h2>
                            <p className={"m-0 max-w-[30ch] text-sm"}>Ikke la tankene gå fra deg</p>
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    );
}