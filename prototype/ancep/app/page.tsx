"use client"

// export const metadata = {
//   title: 'Hjem',
// }

import {AddBadge} from "@/app/components/AddBadge";

export default function Home() {

    const { addBadgeToProfile } = AddBadge();

  return (
    <main className="home min-h-screen flex flex-col items-center main-layout
      p-6 rounded-t-3xl justify-center bg-white w-full">
      <div 
        className="mb-32 overflow-auto mx-auto w-full gap-2 flex flex-col justify-center items-center text-center lg:mb-0 md:flex-row md:flex-wrap lg:text-left mt-6 text-white max-w-3xl">
        <a
          href="/quiz"
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
        </a>
        
        <a
          href="/chat"
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
        </a>

        <a
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
        </a>

        <a
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
        </a>

        <a
          href="/teacher"
          onClick={() => addBadgeToProfile('9')}
          className="h-32 flex gap-3 items-center card w-80 shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
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
        </a>
      </div>
    </main>
  );
}
