"use client"
import {BackArrow} from "@/app/components/BackArrow";
import {useEffect, useState} from "react";
import {PushThought} from "@/app/components/activities/thoughtbubble/PushThought";
import {useSession} from "next-auth/react";
import {Thought} from "@/lib/models/thought";
import {HandleBubbleInput} from "@/app/components/activities/thoughtbubble/HandleBubbleInput";

export default function ThinkBubble() {
    const { data: session } = useSession();
    const {pushThoughtToProfile} = PushThought();
    const [thought, setThoughts] = useState<string[]>([]);
    const { inputValue, handleInputChange, handleInputValueChange } = HandleBubbleInput('', thought, setThoughts, pushThoughtToProfile);


    useEffect(() => {
        document.title = 'Min profil';
        (async() => {
            if(session?.user?.email) {
                const response = await fetch('/api/users?email=' + session?.user?.email);
                if (!response.ok)
                    throw new Error('Failed to fetch thoughts');
                const data = await response.json() as Thought[];

                const user = data.find((user) => user.email === session?.user?.email);
                setThoughts(user?.thoughts ?? []);
            }
        })();
    }, [session]);

    useEffect(() => {
        console.log(thought);
    }, [thought]);

    return (
        <main className="main-layout">
            <BackArrow />

            <div className="think-bubble-page-background display-flex relative h-full pb-10">
                <h1 className="text-2xl page-title mb-4 text-center text-white">Tankebobla
                    <div className="flex-row">
                        <p className="text-xxl cursor-pointer absolute top-4 left-5">-</p>
                        <img
                            className="absolute top-4 left-1.5 cursor-pointer rounded-full hover:shadow-lg hover:bg-red-500"
                            width="40px"
                            height="40px"
                            src="/images/activityspictures/BubbleThink.png"
                            alt="delete"
                            onClick={() => {console.log("delete")}}
                        />
                        <p className="text-xxl cursor-pointer absolute top-4 right-5">+</p>
                        <img
                            className="absolute top-4 right-2 cursor-pointer rounded-full hover:shadow-lg hover:bg-green-500"
                            width="40px"
                            height="40px"
                            src="/images/activityspictures/BubbleThink.png"
                            alt="add"
                            onClick={() => {console.log("add")}}
                        />
                    </div>
                </h1>
                <div className="flex justify-center pb-6 " >
                    <div className="main-bubble items-center relative">
                            <img
                                className=""
                                width="250"
                                height="250"
                                alt="bubble"
                                src="/images/activityspictures/BubbleThink.png"/>
                        <p className="absolute inset-0 flex items-center justify-center text-xl text-center text-white outline-text">Skriv ned dine tanker og dilemmaer i en boble!</p>
                    </div>
                </div>
                <div className="thought-input">
                    <input className="pl-4 pr-4 w-full h-12 rounded-full border-4 border-blue-400 border-opacity-70 drop-shadow-md"
                           type="text"
                           value={inputValue}
                           placeholder="Skriv her..."
                           onChange={handleInputValueChange}
                           onKeyDown={handleInputChange}
                    />
                </div>
                <div className="thoughts pt-6 flex-content">
                    {
                        thought.map((thought, index) => (
                            <div key={index} className="relative mr-4 mt-4">
                                <img
                                    className="animate-grow animate-hover"
                                    width="110"
                                    height="110"
                                    src="/images/activityspictures/BubbleThink.png"
                                    alt="thoughts"
                                />
                                <p className="absolute inset-0 flex items-center justify-center text-center text-xs text-black animate-grow">
                                    {thought}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </main>
    )
}