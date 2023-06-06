"use client"
import {BackArrow} from "@/app/components/BackArrow";
import {useState} from "react";
import {PushThought} from "@/app/components/activities/thoughtbubble/PushThought";

export default function ThinkBubble() {
    const [count, setCount] = useState(8);
    const {pushThoughtToProfile} = PushThought();

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
                    <div className="main-bubble items-center relative hover:bg-blue-800">
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
                           placeholder="Skriv her..."
                            onChange={(e) => {console.log(e.target.value), pushThoughtToProfile(e.target.value)}}
                    />
                </div>
                <div className="thoughts pt-6 flex-content hover:bg-blue-800">
                    {
                        Array.from({length: count}).map((_, index) => (
                            <div key={index} className="relative mr-4 mt-4">
                                <img
                                    className="animate-grow animate-hover"
                                    width="110"
                                    height="110"
                                    src="/images/activityspictures/BubbleThink.png"
                                    alt="thoughts"
                                />
                                <p className="absolute inset-0 flex items-center justify-center text-center text-xs text-black animate-grow">
                                    {index + 1} av {count}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </main>
    )
}