export const metadata = {
  title: 'Hjem',
}

export default function Home() {
  return (
    <main className="home min-h-screen flex flex-col items-center main-layout
      justify-between p-6 rounded-t-3xl absolute bg-white w-full">
      <a 
        href="/profile"
        className="z-10 w-72 items-center justify-between bg-primary cursor-pointer
          text-sm shadow-3xl rounded-lg p-2 max-w-sm lg:flex">
        <div className='flex items-center gap-2 p-4 w-full text-center lg:mr-6'>
          {/* <Image
            src="/images/portrait.jpg"
            width={'500'}
            height={'500'}
            alt="Kid profile picture"
            className="rounded-lg"
            style={{width: '65px', height: '85px'}}/> */}
            <div className="p-2 w-full">
              <p className="block text-lg font-bold text-white">
                Hei, Heidi Normann!
              </p>
              <p className="text-white font-semibold mt-1">Høyskolen Kristiania</p>
              <p className="text-white font-semibold">heidi@kristiania.no</p>
            </div>
        </div>
      </a>

      <div 
        className="mb-32 gap-2 flex flex-col text-center lg:mb-0 md:flex-row md:flex-wrap lg:text-left mt-6 text-white max-w-sm">
        <a
          href="/archive"
          className="card w-72 shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
          rel="noopener noreferrer">
          <h2 className={"mb-3 text-2xl font-semibold"}>
            Arkiv{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={"m-0 max-w-[30ch] text-sm"}>
            Naviger deg i katalogen av Arne sine samlede verker. 
          </p>
        </a>

        <a
          href="/quiz"
          className="card w-72 shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
          rel="noopener noreferrer">
          <h2 className={"mb-3 text-2xl font-semibold"}>
            Refleksjon/Quiz{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={"m-0 max-w-[30ch] text-sm"}>
            Interaktiv quiz for hele klassen eller vil du utforske ditt indre på egenhånd?
          </p>
        </a>

        <a
          href="/chat"
          className="card w-72 shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
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
          className="card w-72 shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
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
