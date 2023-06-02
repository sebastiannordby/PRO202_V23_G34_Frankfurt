'use client'
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export function MobileHeader() {
    const [menuVisible, setMenuVisibility] = useState(false);
    const { data: session } = useSession();

    return (
        <>
            <header className='flex flex-col p-2 pt-3 items-start px-4 h-40 md:h-28'>
                <div className="flex items-center w-full mb-3">
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
                        src="/images/hamburger.png"
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
                                <p className="block text-lg font-bold ">
                                    {session != null ? <span>
                                    {session?.user?.name}
                                    </span> : <span>Logg inn</span>}
                                </p>
                                <p className=" font-semibold">{session?.user?.email}</p>
                            </div>
                            {session?.user?.image ? 
                                <>
                                    <img 
                                        width="50"
                                        height="50"
                                        className="mt-2 rounded-full md:hidden"
                                        src={session?.user?.image as string}/> 
                                </> : ''
                            }
                        </div>
                    </a>
                </div>
            </header>

            <div id="defaultModal" tabIndex={-1} aria-hidden={!menuVisible} 
                className="transition-opacity fixed top-0 left-0 right-0 z-50 w-full md:p-4 overflow-hidden md:inset-0 backdrop-blur-md max-h-full h-screen  mx-auto">
                <div className="relative h-full w-full max-w-xl max-h-full mx-auto overflow-hidden shadow-2xl">
                    <div className="flex flex-col h-full overflow-hidden first-letter:relative rounded-lg">
                        <div className="flex items-start justify-between p-4 rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Hvor har du tenkt deg?
                            </h3>
                        </div> 
                        <div className="h-full overflow-x-hidden overflow-y-scroll space-y-6">
                            <div className="mb-32 w-full gap-2 flex flex-col justify-center content-center text-center mt-6 text-white">
                                <a
                                    href="/quiz"
                                    className="mx-auto flex gap-3 items-center card w-72 shadow-md group rounded-lg border border-transparent px-5 py-3 transition-colors hover:border-white"
                                    rel="noopener noreferrer">
                                        <img
                                        src="/images/sider/tankevekker.png"
                                        width="50px"
                                        height="50px"
                                        style={{height: '50px'}}
                                        alt="Tankevekker bilde"/>
                                        <div className="text-left pl-2">
                                            <h2 className={"mb-1 text-xl font-semibold"}>Aktiviteter</h2>
                                            <p className={"m-0 max-w-[30ch] text-sm"}>
                                                Interaktiv læring for hele klassen.
                                            </p>
                                        </div>
                                </a>
                                
                                <a
                                    href="/chat"
                                    className="mx-auto flex gap-3 items-center card w-72 shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
                                    rel="noopener noreferrer">
                                        <img
                                        src="/images/sider/chatbot.png"
                                        width="50px"
                                        height="50px"
                                        style={{height: '50px'}}
                                        alt="Chatbot bilde"/>
                                        <div className="text-left pl-2">
                                            <h2 className={"mb-1 text-xl font-semibold"}>Chatbot</h2>
                                            <p className={"m-0 max-w-[30ch] text-sm"}>Snakk med Arne Næss</p>
                                        </div>
                                </a>

                                <a
                                    href="/archive"
                                    className="mx-auto flex gap-3 items-center card w-72 shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
                                    rel="noopener noreferrer">
                                    <img
                                        src="/images/sider/arkiv.png"
                                        width="50px"
                                        height="50px"
                                        style={{height: '50px'}}
                                        alt="Arkiv bilde"/>
                                        <div className="text-left pl-2">
                                            <h2 className={"mb-1 text-xl font-semibold"}>Kunnskapssamling</h2>
                                            <p className={"m-0 max-w-[30ch] text-sm"}>Naviger deg i katalogen</p>
                                        </div>
                                </a>

                                <a
                                    href="/profile"
                                    className="mx-auto flex gap-3 items-center card w-72 shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
                                    rel="noopener noreferrer">
                                    <img
                                    src="/images/sider/profil.png"
                                    width="50px"
                                    height="50px"
                                    style={{height: '50px'}}
                                    alt="Arkiv bilde"/>
                                    <div className="text-left pl-2">
                                        <h2 className={"mb-1 text-xl font-semibold"}>Min profil</h2>
                                      <p className={"m-0 max-w-[30ch] text-sm"}>Se din tidligere prestasjon og fortjente merker.</p>
                                    </div>
                                </a>

                                <a
                                    href="/teacher"
                                    className="mx-auto flex gap-3 items-center card w-72 shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
                                    rel="noopener noreferrer">
                                        <img
                                        src="/images/sider/veiledning.png"
                                        width="50px"
                                        height="50px"
                                        style={{height: '50px'}}
                                        alt="Undervisnings veiledning bilde"/>
                                    <div className="text-left pl-2">
                                        <h2 className={"mb-1 text-xl font-semibold"}>Undervisnings veiledning</h2>
                                        <p className={"m-0 max-w-[30ch] text-sm"}>Veiledning for undervisere og lærere.</p>
                                    </div>
                                </a>


                                {
                                    session != null ? 
                                        <a
                                            href="api/auth/signout"
                                            className="mx-auto flex text-center content-center gap-3 items-center card w-72 shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
                                            rel="noopener noreferrer">
                                            <h2 className={"w-full mb-3 text-center text-xl font-semibold"}>Logg ut</h2>
                                        </a>
                                    :    
                                        <a
                                            href="api/auth/signin"
                                            className="mx-auto flex text-center content-center gap-3 items-center card w-72 shadow-md group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-white"
                                            rel="noopener noreferrer">
                                            <h2 className={"w-full mb-3 text-center text-xl font-semibold"}>Logg inn</h2>
                                        </a>
                               }
                                
                            </div>
                        </div>
                        <div className="flex items-end p-2 space-x-2 rounded-b ">
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