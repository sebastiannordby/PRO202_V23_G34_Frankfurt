"use client"
import { useEffect, useState } from 'react';
import { HomeArrow } from '../components/HomeArrow';

export default function ArchivePage() {
    const [docs, setDocs] = useState<string[]>([]);
    const [searchValue, setSearchValue] = useState<string>();
    const [selectedDocument, setSelectedDocument] = useState<{name: string, text: string}>();
    const [documentVisible, setDocumentVisibility] = useState<boolean>(false);

    useEffect(() => {
        document.title = 'Kunnskapssamling';

        (async() => {
            const response = await fetch("api/archive");
            setDocs(await response.json());
        })();
    }, []);

    useEffect(() => {
        (async() => {
            if(searchValue && searchValue.length > 0) {
                const response = await fetch("api/archive?search=" + searchValue);
                setDocs(await response.json());
            } else {
                const response = await fetch("api/archive");
                setDocs(await response.json());
            }
        })();
    }, [searchValue]);

    const showDocument = async (documentName: string) => {
        const response = await fetch("/api/archive", {
            method: 'POST',
            body: JSON.stringify({
                fileName: documentName
            })
        });
        const document: {text: string} = await response.json();

        if(!document) {
            alert("Feil format på dokument? Prøv et annet");
            return;
        }

        setSelectedDocument({
            name: documentName,
            text: document.text
        });

        setDocumentVisibility(true);
    };

    return (
        <main className="main-layout">
            <HomeArrow />

            <div className="content" style={{ height: '100% !important'}}>
                <h1 className="page-title">Kunnskapssamling</h1>
                <p className="font-medium text-md">Utforsk Arne sitt akriv</p>

                <div className="mt-2 flex flex-col gap-3 p-2 h-full overflow-hidden">
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                        focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        autoComplete="off" 
                        autoCorrect="off" 
                        autoCapitalize="off" 
                        enterKeyHint="go" 
                        spellCheck="false" 
                        placeholder="Søk i arkivet" 
                        maxLength={50}
                        type="search" 
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)} 
                        aria-activedescendant="docsearch-item-0" 
                        aria-controls="docsearch-list" />

                    <section className="flex flex-col flex-grow h-full">
                        <h1 className="font-medium text-lg">Dypøkologi</h1>
                        <ul className="font-semibold list-disc list-inside pl-2 mt-2 overflow-y-scroll max-h-full">
                            {
                                docs?.map(x => <li className='underline leading-8 mb-1 hover:underline' key={x}>
                                    <span onClick={async() => await showDocument(x)}>{x?.replace('.doc', '')?.replace('.txt', '')}</span>
                                </li>)
                            }
                        </ul>
                    </section>
                </div>

                <div id="defaultModal" tabIndex={-1} aria-hidden={!documentVisible} 
                    className="transition-opacity fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-hidden md:inset-0 backdrop-blur-md max-h-full h-screen  mx-auto">
                    <div className="relative h-full w-full max-w-2xl max-h-full mx-auto overflow-hidden">
                        <div className="flex flex-col h-full overflow-hidden first-letter:relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-start overflow-hidden justify-between p-4 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {selectedDocument?.name?.replace('.doc', '')?.replace('.txt', '')}
                                </h3>
                                {/* <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            */}

                            </div> 
                            <pre className="whitespace-pre-wrap p-6 space-y-6 h-full overflow-y-scroll flex-grow">
                                {selectedDocument?.text}
                            </pre>
                            <div className="flex items-end p-4 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button 
                                    data-modal-hide="defaultModal" 
                                    type="button" 
                                    onClick={() => setDocumentVisibility(false)}
                                    className="ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                                        focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5
                                        py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                                        dark:focus:ring-blue-800">Lukk</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
