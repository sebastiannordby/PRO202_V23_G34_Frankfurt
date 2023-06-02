"use client"
import { useEffect, useState } from "react";

export default function ThinkProvokingPage() {
    return (
        <main className="main-layout relative">
            <div className="content h-full pb-10"
                style={{ background: 'none'}}>
                <h1 className="page-title mb-4 text-white">Tankevekker</h1>

                <div className="flex flex-col md:flex-row gap-10 relative p-4">
                    <div className="relative w-60 shadow-xl rounded-full" 
                        style={{height: 'min-content'}}>
                        <img 
                            className="w-60"
                            alt="Sirkel for å bli med i spill"
                            src="/images/think-provoke/join-sirkel.png" />
                        <h1 className="think-pro-logo text-xl text-white">Bli med</h1>
                    </div>
                    <div className="relative w-60 shadow-xl md:left-12 md:top-12 rounded-full"
                        style={{height: 'min-content'}}>
                        <img 
                            className="w-60"
                            alt="Sirkel for å hoste et spill"
                            src="/images/think-provoke/host-sirkel.png" />
                        <h1 className="think-pro-logo text-xl text-white">Host</h1>
                    </div>
                    <div className="relative w-60 shadow-xl rounded-full"  
                        style={{height: 'min-content'}}>
                        <img 
                            className="w-60"
                            alt="Sirkel for å spille alene"
                            src="/images/think-provoke/solo-sirkel.png" />
                        <h1 className="think-pro-logo text-xl text-white">Solo</h1>
                    </div>
                </div>
            </div>
        </main>
    );
}