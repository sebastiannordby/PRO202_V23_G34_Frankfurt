"use client"
import { useEffect, useState } from 'react';
import { HomeArrow } from '../components/HomeArrow';
import { SearchInput } from '../components/client/SearchInput'

export default function ArchivePage() {
    const [docs, setDocs] = useState<string[]>([]);
    const [document, setDocument] = useState<{name: string, text: string}>();
    const[documentVisible, setDocumentVisibility] = useState<boolean>(false);

    useEffect(() => {
        console.log('Ehh');
        (async() => {
            const response = await fetch("api/archive");
            const documents = await response.json();
            console.log('Documents: ', documents);

            setDocs(documents);
        })();
    }, []);

    const showDocument = async (documentName: string) => {
        const response = await fetch("/api/archive", {
            method: 'POST',
            body: JSON.stringify({
                fileName: documentName
            })
        });
        const documentText = await response.text();

        if(!documentText) {
            alert("Feil format på dokument? Prøv et annet");
            return;
        }

        setDocument({
            name: documentName,
            text: documentText
        });

        setDocumentVisibility(documentText != null && documentText != '');

    };

    return (
        <main className="main-layout">
            <HomeArrow />
            <h1 className="page-title">Kunnskapssamlingen</h1>
            <p className="font-medium text-sm">Utforsk Arne sitt akriv</p>

            <div className="mt-2 flex flex-col gap-2 p-2">
                <SearchInput />

                <section>
                    <h1 className="font-medium text-lg">Dypøkologi</h1>
                    <ul className="pl-2 mt-2">
                        {
                            docs.map(x => <li className='hover:underline text-blue' key={x}>
                                <span onClick={async() => await showDocument(x)}>{x}</span>
                            </li>)
                        }
                    </ul>
                </section>
            </div>

            <div id="defaultModal" tabIndex={-1} aria-hidden={!documentVisible} 
                className="transition-opacity fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {document?.name}
                        </h3>
                        {/* <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    */}

                        </div> 
                    
                        <div className="p-6 space-y-6">
                            {document?.text}
                        </div>
                        <div className="flex items-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
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
        </main>
    );
}
