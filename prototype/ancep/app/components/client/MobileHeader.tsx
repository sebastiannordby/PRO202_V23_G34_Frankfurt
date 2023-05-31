'use client'
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export function MobileHeader() {
    const [menuVisible, setMenuVisibility] = useState(false);
    const { data: session } = useSession();

    return (
        <>
            <header className='flex flex-col p-2 pt-3 items-start px-4 h-36 md:h-28'>
                <div className="flex items-center w-full mb-2">
                    <a
                    href="/"
                    rel="noopener noreferrer">
                        <img
                        src="/images/arne.png"
                        alt="Arne Næss Logo"
                        className="dark:invert cursor-pointer"
                        width={90}
                        height={40}
                        />
                    </a>

                    <img
                        src="/images/menu-hamburger-nav.png"
                        alt="Meny knapp"
                        onClick={() => setMenuVisibility(!menuVisible)}
                        className="dark:invert ml-auto cursor-pointer"
                        width={25}
                        height={30}
                    />
                </div>
                <div className="text-center w-full mb-2 md:absolute md:top-0 md:max-w-lg md:right-0 md:left-0 md:mx-auto">
                    <a 
                        href={session != null ? "/profile" : "/api/auth/signin"}
                        className="z-10 w-72 items-center justify-between bg-primary cursor-pointer
                        text-sm shadow-3xl rounded-lg max-w-sm">
                        <div className='flex items-center gap-2 w-full text-center lg:mr-6'>
                            <div className="p-2 flex-grow">
                                <p className="block text-lg font-bold text-white">
                                    {session != null ? <span>
                                    {session?.user?.name}
                                    </span> : <span>Logg inn</span>}
                                </p>
                                <p className="text-white font-semibold">{session?.user?.email}</p>
                            </div>
                            {session?.user?.image ? 
                                <>
                                    <img 
                                    width="50"
                                    height="50"
                                    className="mt-2 rounded-full"
                                    src={session?.user?.image as string}/> 
                                </> : ''
                            }
                        </div>
                    </a>
                </div>
            </header>

            <div id="defaultModal" tabIndex={-1} aria-hidden={!menuVisible} 
                className="transition-opacity fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="p-6 space-y-6">
                        <div className="grid gap-2 text-center lg:mb-0 lg:grid-cols-4 lg:text-left mt-6 text-white max-w-sm">
                        <a
                                href="/quiz"
                                className="card shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
                                rel="noopener noreferrer">
                                <h2 className={"mb-3 text-2xl font-semibold"}>
                                    Aktiviteter{' '}
                                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                    -&gt;
                                    </span>
                                </h2>
                                <p className={"m-0 max-w-[30ch] text-sm"}>
                                    Interaktiv læring for hele klassen
                                </p>
                            </a>

                            <a
                                href="/chat"
                                className="card shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
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
                                className="card shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
                                rel="noopener noreferrer">
                                <h2 className={"mb-3 text-2xl font-semibold"}>
                                    Kunnskapssamling{' '}
                                    <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                    -&gt;
                                    </span>
                                </h2>
                                <p className={"m-0 max-w-[30ch] text-sm"}>
                                    Les i katalogen av Arne sine samlede verker. 
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

                            <a
                                href="api/auth/signout"
                                className="card shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
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
                        </div>
                        <div className="flex items-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button 
                                data-modal-hide="defaultModal" 
                                type="button" 
                                onClick={() => setMenuVisibility(false)}
                                className="ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                                    focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5
                                    py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                                    dark:focus:ring-blue-800">Lukk</button>
                        </div>
                    </div>
                </div>
            </div>
            </>

    );
}