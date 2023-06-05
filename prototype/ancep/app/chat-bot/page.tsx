"use client"
import { HomeArrow } from "../components/HomeArrow";
import { KeyboardEvent, useEffect, useState } from "react";

const MESSAGES = [
    {
        reply: `Hei på deg!`,
        matcher: (textLower: string) => {
            return textLower.includes('hei') ||
                textLower.includes('hallo') || 
                textLower.includes('mårn') || 
                textLower.includes('morn') || 
                textLower.includes('god morgen');
        }
    },
    {
        reply: `Hvem du er? Det tror jeg bare du kan svare på. Prøv vår tankevekker under aktiviteter 
            hvis du er interessert i å få en beskrivelse i riktig retning`,
        matcher: (textLower: string) => {
            return textLower.includes('hvem') &&
                textLower.includes('er') && 
                textLower.includes('jeg');
        }
    },
    {
        reply: `Jeg bare sitter å venter på dine spennende spørsmål!`,
        matcher: (textLower: string) => {
            return textLower.includes('hva gjør du') || 
                textLower.includes('skjer') ||
                textLower.includes("hvordan går det");
        }
    },
    {
        reply: `
            Arne Dekke Eide Næss (født 27. januar 1912 i Oslo, død 12. januar 2009[5] ) var en norsk filosof, som gjennom sine lærebøker i logikk, metodelære og filosofihistorie bidro til å gi filosofien en nøkkelstilling i det akademiske og intellektuelle liv i Norge i etterkrigstiden. Han regnes som grunnleggeren av dypøkologien og den såkalte Oslo-skolen.[6] Hans lære blir oftest omtalt som økosofi.`,
        matcher: (textLower: string) => {
            return textLower.includes('hvem er arne næss') || 
                textLower.includes('hva gjorde arne næss') ||
                (textLower.includes("hvem") && textLower.includes('arne næss'));
        }
    },
    {
        reply: `
            Dypøkologien, grunnlagt av den norske filosofen Arne Næss, er et mer radikalt syn på økologien enn det mer allmenne vanlige «grunne» synet på økologien, som setter mennesket i sentrum. Tilhengerne av dypøkologien mener at alt liv har en verdi i seg selv og ikke bare ut ifra hvilken nytte den har for mennesket. Derfor må menneskeheten tilpasse seg naturens behov og krav.

            Dypøkologiens hovedmål er å sette spørsmålstegn ved det moderne Vestens tradisjonelle tankemodeller, og foreslå et alternativ til disse tankemodellene.

            Ikke en eneste er reddet før alle er reddet, der termen «en eneste» ikke bare inkluderer meg som individuelt menneske, men alle mennesker, hvaler, grizzlybjørner, hele regnskogens økosystem, fjell og elver, den minste mikroben i jorda osv.

            Arne Næss skisserer en rekke sirkler med stadig større omfang. Innerst er solidaritet med slekt og nærsamfunn. Deretter kommer solidaritet med hele menneskeheten: humanismen. Den ytterste er solidaritet med hele økosystemet, hvor mennesket også har sin plass, men ikke lengre står i midtpunktet.

            Solidaritet med økosystemet betyr ikke nødvendigvis å bevare livet til hver mikrobe, plante og grizzlybjørn. Individene lever og dør innenfor dette systemet, oftest i kamp mellom hverandre og i kamp mellom forskjellige arter. Nettopp dette beholder likevekten for systemet som helhet. Men den eksplosive utviklingen i antall mennesker på denne jorden truer balansen i hele økosystemet. Arne Næss så en verdensbefolkning på 100 millioner som ideelt for jordens overlevelse, det vil si en 70-del av befolkningen i hans samtid.`,
        matcher: (textLower: string) => {
            return textLower.includes("dypøkologi") && 
                (textLower.includes("hva") || 
                textLower.includes("hva er") || 
                textLower.includes("hvem"));
        }
    },
];

export default function ChatBotPage() {
    const [qInput, setQInput] = useState('');
    const [logMessages, setLogMessages] = useState<string[]>([
        `Hei! Jeg er en kunstlig intelligens og kan masse om Arne Næss.
            Spør meg om hva du vil så skal jeg svare så godt jeg kan.`
    ]);

    useEffect(() => {
        document.title = 'Chatbot';
    });

    const onQInputKeyUp = (e: KeyboardEvent) => {
        if(e.key === 'Enter') {
            console.log('Input Key UP');
            logMessages.push(`Meg: ${qInput}`);
            setLogMessages(logMessages);
            setQInput('');

            const lowerCase = qInput.toLowerCase();
            let didMatch = false;

            for(let i = 0; i < MESSAGES.length; i++) {
                if(MESSAGES[i].matcher(lowerCase)) {
                    logMessages.push(`Chatbot: ${MESSAGES[i].reply}`);
                    setLogMessages(logMessages);
                    didMatch = true;
                    break;
                }
            }

            if(!didMatch) {
                logMessages.push(`Chatbot: Jeg kunne desverre ikke tolke denne meldingen. Vennligst prøv igjen,`);
                setLogMessages(logMessages);
            }
        }
    };
    
    return (
        <main className="main-layout">
            <HomeArrow />

            <div className="content" style={{ height: '100% !important'}}>
                <h1 className="page-title">Chatbot - AI</h1>
                <p className="text-sm">Chat med Arne Næss</p>

                <div className="p-2 h-full flex flex-col gap-2 relative overflow-hidden">
                    <div className="flex flex-col gap-2 h-full overflow-y-scroll flex-grow bg-white">
                        {logMessages?.map(x => 
                            <div key={Math.random()} className="p-2">
                                <p>{x}</p>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2 mt-auto">
                        <input 
                            value={qInput}
                            onChange={(e) => setQInput(e.target.value)}
                            onKeyUp={(e) => onQInputKeyUp(e)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                            focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Kjente du Arne Næss?"/>

                        <button 
                            data-modal-hide="defaultModal" 
                            type="button" 
                            className="ml-auto text-white bg-pink-600 hover:bg-pink-600 focus:ring-4 
                                focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5
                                py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                                dark:focus:ring-blue-800">Send</button>
                                
                    </div>
                </div>
            </div>
        </main>
    );
}