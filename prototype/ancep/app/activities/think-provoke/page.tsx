"use client"
import { useEffect, useState } from "react";
import { BackArrow } from "@/app/components/BackArrow";
import Link from "next/link";

export default function ThinkProvokingPage() {
    return (
        <main className="main-layout relative">
            <BackArrow />
            
            <div className="content h-full pb-10 backdrop-blur-2xl"
                style={{ background: 'none', height: '100%'}}>
                <h1 className="text-3xl page-title mb-4 text-center text-white">Tankevekker</h1>

                <div className="flex flex-col md:flex-row gap-10 relative p-4 justify-center">
                    <Link 
                        href="/activities/think-provoke/join"
                        className="game-round-card relative w-52 md:w-60 shadow-xl rounded-full" 
                        style={{height: 'min-content'}}>
                        <img 
                            className="w-52 md:w-60"
                            alt="Sirkel for å bli med i spill"
                            src="/images/think-provoke/join-sirkel.png" />
                        <h1 className="think-pro-logo text-xl text-white">Bli med</h1>
                    </Link>
                    <Link 
                        href="/activities/think-provoke/host"
                        className="game-round-card relative w-52 md:w-60 shadow-xl left-12 md:left-0 md:top-12 rounded-full"
                        style={{height: 'min-content'}}>
                        <img 
                            className="w-52 md:w-60"
                            alt="Sirkel for å hoste et spill"
                            src="/images/think-provoke/host-sirkel.png" />
                        <h1 className="think-pro-logo text-xl text-white">Host</h1>
                    </Link>
                    <Link 
                        href="/activities/think-provoke/solo"
                        className="game-round-card relative w-52 md:w-60 shadow-xl rounded-full"  
                        style={{height: 'min-content'}}>
                        <img 
                            className="w-52 md:w-60"
                            alt="Sirkel for å spille alene"
                            src="/images/think-provoke/solo-sirkel.png" />
                        <h1 className="think-pro-logo text-xl text-white">Solo</h1>
                    </Link>
                </div>
            </div>
        </main>
    );
}