"use client"

import {AddBadge} from "@/app/components/AddBadge";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const { addBadgeToProfile } = AddBadge();

  useEffect(() => {
    document.title = 'Hjem';
  }, []);

  return (
    <main className="home flex flex-col items-center main-layout
        p-6 rounded-t-3xl justify-center bg-white w-full">
      <div className="overflow-y-scroll w-full md:justify-center md:justify-items-center mx-auto md:max-w-2xl items-center flex flex-col md:grid md:grid-cols-2 gap-2 bg-none"
        style={{ background: 'none' }}>
        <Link
          href="/activities"
          onClick={() => addBadgeToProfile('7')}
          className="h-32 flex gap-3 items-center card w-80 shadow-md group rounded-lg border border-transparent px-5 py-3 transition-colors hover:border-white"
          rel="noopener noreferrer">
            <img
              src="/images/sider/tankevekker.png"
              width="50px"
              height="50px"
              style={{height: '50px'}}
              alt="Tankevekker bilde"/>
            <div className="text-left pl-2">
              <h2 className={"mb-1 text-2xl font-semibold"}>Aktiviteter</h2>
              <p className={"m-0 max-w-[30ch] text-sm"}>
                Interaktiv læring for hele klassen.
              </p>
            </div>
        </Link>

        <Link
          href="/chat-bot"
          onClick={() => addBadgeToProfile('1')}
          className="h-32 flex gap-3 items-center card w-80 shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
          rel="noopener noreferrer">
            <img
              src="/images/sider/chatbot.png"
              width="50px"
              height="50px"
              style={{height: '50px'}}
              alt="Chatbot bilde"/>
            <div className="text-left pl-2">
              <h2 className={"mb-1 text-2xl font-semibold"}>Chatbot</h2>
              <p className={"m-0 max-w-[30ch] text-sm"}>Snakk med Arne Næss</p>
            </div>
        </Link>

        <Link
          href="/archive"
          onClick={() => addBadgeToProfile('4')}
          className="h-32 flex gap-3 items-center card w-80 shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
          rel="noopener noreferrer">
          <img
              src="/images/sider/arkiv.png"
              width="50px"
              height="50px"
              style={{height: '50px'}}
              alt="Arkiv bilde"/>
            <div className="text-left pl-2">
              <h2 className={"mb-1 text-2xl font-semibold"}>Kunnskapssamling</h2>
              <p className={"m-0 max-w-[30ch] text-sm"}>Naviger deg i katalogen</p>
            </div>
        </Link>

        <Link
          href="/profile"
          onClick={() => addBadgeToProfile('2')}
          className="h-32 flex gap-3 items-center card w-80 shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
          rel="noopener noreferrer">
            <img
              src="/images/sider/profil.png"
              width="50px"
              height="50px"
              style={{height: '50px'}}
              alt="Arkiv bilde"/>
            <div className="text-left pl-2">
              <h2 className={"mb-1 text-2xl font-semibold"}>Min profil</h2>
              <p className={"m-0 max-w-[30ch] text-sm"}>Se din tidligere prestasjon og fortjente merker.</p>
            </div>
        </Link>

        <Link
          href="/teacher"
          onClick={() => addBadgeToProfile('9')}
          className="h-32 md:col-span-2 md:w-full md:text-center 
            flex gap-3 items-center card w-80 shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
          rel="noopener noreferrer">
            <img
              src="/images/sider/veiledning.png"
              width="50px"
              height="50px"
              style={{height: '50px'}}
              alt="Undervisnings veiledning bilde"/>
          <div className="text-left pl-2">
              <h2 className={"mb-1 text-2xl font-semibold"}>Undervisnings veiledning</h2>
              <p className={"m-0 max-w-[30ch] text-sm"}>Veiledning for undervisere og lærere.</p>
            </div>
        </Link>
      </div>
    </main>
  );
}
