"use client"

// export const metadata = {
//   title: 'Hjem',
// }

export default function Home() {

  return (
    <main className="home min-h-screen flex flex-col items-center main-layout
      p-6 rounded-t-3xl justify-center absolute bg-white w-full">
      <div 
        className="mb-32 gap-2 flex flex-col justify-center content-center text-center lg:mb-0 md:flex-row md:flex-wrap lg:text-left mt-6 text-white max-w-3xl">
        <a
          href="/quiz"
          className="flex gap-3 items-center card w-80 shadow-md group rounded-lg border border-transparent px-5 py-3 transition-colors hover:border-white"
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
          className="flex gap-3 items-center card w-80 shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
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
          className="flex gap-3 items-center card w-80 shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
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
          className="flex gap-3 items-center card w-80 shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
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
          className="card w-80 shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
          rel="noopener noreferrer">
          <h2 className={"mb-3 text-2xl font-semibold"}>
            Undervisnings veiledning{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={"m-0 max-w-[30ch] text-sm"}>
            Veiledning for undervisere og lærere.
          </p>
        </a>
      </div>
    </main>
  );
}
