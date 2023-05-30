"use client"
import { useEffect, useState } from 'react';
import { HomeArrow } from '../components/HomeArrow';
import { SearchInput } from '../components/client/SearchInput'

export default function ArchivePage() {
    const [docs, setDocs] = useState<string[]>([]);

    useEffect(() => {
        console.log('Ehh');
        (async() => {
            const response = await fetch("api/archive");
            const documents = await response.json();
            console.log('Documents: ', documents);

            setDocs(documents);
        })();
    }, []);

    return (
        <main className="main-layout">
            <HomeArrow />
            <h1 className="page-title">Arkiv</h1>
            <p className="font-medium text-sm">Utforsk vårt akriv nedenfor</p>

            <div className="mt-2 flex flex-col gap-2 p-2">
                <SearchInput />

                <section>
                    <h1 className="font-medium text-lg">Dypøkologi</h1>
                    <ul className="pl-2 mt-2">
                        {
                            docs.map(x => <li className='hover:underline text-blue' key={x}>
                                <a href={"api/archive?doc=" + x}>{x}</a>
                            </li>)
                        }
                    </ul>
                </section>
            </div>
        </main>
    );
}
