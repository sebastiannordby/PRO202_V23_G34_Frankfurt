"use client"
import { HomeArrow } from "@/app/components/HomeArrow";

export default function JoinThinkProvokePage() {
    return (
        <main className="main-layout">
            <HomeArrow />
            
            <div className="content">
                <h1 className="page-title mt-2">Tankevekker - Bli med</h1>

                <div>
                    <h3 className="text-lg">Tast inn tilgangskode</h3>
                    <div className="flex gap-2 mt-2">
                        <input 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                            focus:border-blue-500 block flex-grow p-2.5 dark:bg-gray-700 dark:border-gray-600 
                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Tilgangskode"/>
                        <button 
                            data-modal-hide="defaultModal" 
                            type="button" 
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