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
          className="card w-80 shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
          rel="noopener noreferrer">
          <h2 className={"mb-3 text-2xl font-semibold"}>
            Aktiviteter{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={"m-0 max-w-[30ch] text-sm"}>
            Interaktive læring for hele klassen
          </p>
        </a>
        
        <a
          href="/chat"
          className="card w-80 shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
          rel="noopener noreferrer">
          <h2 className={"mb-3 text-2xl font-semibold"}>
            Chatbot{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={"m-0 max-w-[30ch] text-sm"}>
            Vil du teste hvordan det var å snakke med Arne Næss? Prøv vår tilnærmede AI.
          </p>
        </a>

        <a
          href="/archive"
          className="card w-80 shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
          rel="noopener noreferrer">
          <h2 className={"mb-3 text-2xl font-semibold"}>
            Kunnskapssamling{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={"m-0 max-w-[30ch] text-sm"}>
            Naviger deg i katalogen av Arne sine samlede verker. 
          </p>
        </a>

        <a
          href="/profile"
          className="card w-80 shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
          rel="noopener noreferrer">
          <h2 className={"mb-3 text-2xl font-semibold"}>
            Min profil{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={"m-0 max-w-[30ch] text-sm"}>
            Se din tidligere prestasjon og fortjente merker.
          </p>
        </a>

        <a
          href="api/auth/signout"
          className="card w-80 shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
          rel="noopener noreferrer">
          <h2 className={"mb-3 text-2xl font-semibold"}>
            Logg ut{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={"m-0 max-w-[30ch] text-sm"}>
            Logg deg ut av nettsiden
          </p>
        </a>
      </div>
    </main>
  );
}
