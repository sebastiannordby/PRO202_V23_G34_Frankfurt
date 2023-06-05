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
                    className="h-full overflow-auto p-2 mx-auto w-full gap-2 flex flex-col justify-center items-center text-center lg:mb-0 md:flex-row md:flex-wrap lg:text-left mt-6 text-white max-w-3xl">
                    <Link
                        href="/activities/cabin"
                        className="h-32 flex gap-3 items-center card w-full shadow-xl group rounded-lg border border-transparent px-5 py-3 transition-colors hover:border-white"
                        rel="noopener noreferrer">
                            <div className="text-left pl-2">
                            <h2 className={"mb-1 text-2xl font-semibold"}>Tankehytta</h2>
                            <p className={"m-0 max-w-[30ch] text-sm"}>Del dine tanker og reflekter med andre</p>
                        </div>
                    </Link>
                    <Link
                        href="/activities/think-provoke"
                        className="h-32 flex gap-3 items-center card w-full shadow-xl group rounded-lg border border-transparent px-5 py-3 transition-colors hover:border-white"
                        rel="noopener noreferrer">
                            <div className="text-left pl-2">
                            <h2 className={"mb-1 text-2xl font-semibold"}>Tankevekker</h2>
                            <p className={"m-0 max-w-[30ch] text-sm"}>Vekk ditt indre</p>
                        </div>
                    </Link>
                    <Link
                        href=""
                        className="h-32 flex gap-3 items-center card w-full shadow-xl group rounded-lg border border-transparent px-5 py-3 transition-colors hover:border-white"
                        rel="noopener noreferrer">
                            <div className="text-left pl-2">
                            <h2 className={"mb-1 text-2xl font-semibold"}>Tankebobla</h2>
                            <p className={"m-0 max-w-[30ch] text-sm"}>Ikke la tankene gå fra deggi</p>
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    );
}