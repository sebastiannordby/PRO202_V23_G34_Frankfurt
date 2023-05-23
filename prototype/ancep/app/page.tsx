import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center home
      justify-between p-6 rounded-t-3xl absolute bg-white w-full"
      style={{top: '80px'}}>
      <div className="z-10 w-full max-w-5xl items-center justify-between bg-white
        font-mono text-sm border border-slate-200 shadow-md rounded-lg p-2 lg:flex">
        <div className='flex items-center gap-2 p-4 lg:mr-6'>
          <Image
            src="/images/portrait.jpg"
            width={'500'}
            height={'500'}
            alt="Kid profile picture"
            className="rounded-lg"
            style={{width: '65px', height: '85px'}}/>
            <div className="p-2">
              <p className="block text-lg font-bold" style={{color: 'var(--gold)'}}>
                Hei, Heidi Normann!
              </p>
              <p className="font-bold">Høyskolen Kristiania</p>
              <p className="font-bold">heidi@kristiania.no</p>
            </div>
        </div>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left mt-6 text-white">
        <a
          href="/archive"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Arkiv{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Les i katalogen av Arne sine samlede verker. 
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Quiz{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Interaktiv quiz for hele klassen! Blir du klassens vinner?
          </p>
        </a>

        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Chatbot - AI{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Vil du teste hvordan det var å snakke med Arne Næss? Prøv vår tilnærmede AI.
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Min profil{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Se din tidligere prestasjon og fortjente merker.
          </p>
        </a>
      </div>
    </main>
  )
}
