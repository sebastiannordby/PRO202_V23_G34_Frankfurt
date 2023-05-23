export const metadata = {
  title: 'Hjem',
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center home
      justify-between p-6 rounded-t-3xl absolute bg-white w-full"
      style={{top: '80px'}}>
      <a 
        href="/profile"
        className="z-10 w-full max-w-5xl items-center justify-between bg-white cursor-pointer
          text-sm shadow-3xl rounded-lg p-2 lg:flex">
        <div className='flex items-center gap-2 p-4 w-full text-center lg:mr-6'>
          {/* <Image
            src="/images/portrait.jpg"
            width={'500'}
            height={'500'}
            alt="Kid profile picture"
            className="rounded-lg"
            style={{width: '65px', height: '85px'}}/> */}
            <div className="p-2 w-full">
              <p className="block text-lg font-bold" style={{color: 'var(--gold)'}}>
                Hei, Heidi Normann!
              </p>
              <p className="font-semibold mt-1">Høyskolen Kristiania</p>
              <p className="font-semibold">heidi@kristiania.no</p>
            </div>
        </div>
      </a>

      <div className="mb-32 grid gap-2 text-center lg:mb-0 lg:grid-cols-4 lg:text-left mt-6 text-white">
        <a
          href="/archive"
          className="card shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
          rel="noopener noreferrer">
          <h2 className={"mb-3 text-2xl font-semibold"}>
            Arkiv{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={"m-0 max-w-[30ch] text-sm"}>
            Les i katalogen av Arne sine samlede verker. 
          </p>
        </a>

        <a
          href="/quiz"
          className="card shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
          rel="noopener noreferrer">
          <h2 className={"mb-3 text-2xl font-semibold"}>
            Quiz{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={"m-0 max-w-[30ch] text-sm"}>
            Interaktiv quiz for hele klassen! Blir du klassens vinner?
          </p>
        </a>

        <a
          href="/chat"
          className="card shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
          rel="noopener noreferrer">
          <h2 className={"mb-3 text-2xl font-semibold"}>
            Chatbot - AI{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={"m-0 max-w-[30ch] text-sm"}>
            Vil du teste hvordan det var å snakke med Arne Næss? Prøv vår tilnærmede AI.
          </p>
        </a>

        <a
          href="/profile"
          className="card shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
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
      </div>
    </main>
  )
}
