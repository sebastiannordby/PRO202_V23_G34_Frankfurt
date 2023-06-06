"use client"
import { HomeArrow } from "../components/HomeArrow";
import { KeyboardEvent, useEffect, useState } from "react";
const MESSAGES = [
    {
        reply: `Hei!`,
        matcher: (textLower: string) => {
            return textLower.includes('hei') ||
                textLower.includes('hallo') || 
                textLower.includes('mårn') || 
                textLower.includes('morn') ||
                textLower.includes('halla') ||
                textLower.includes('god morgen');
        }
    },
    {
        reply: `Det tror jeg bare du kan svare på!`,
        matcher: (textLower: string) => {
            return textLower.includes('er') &&
                textLower.includes('jeg') &&
                textLower.includes('dum');
        }
    },
    {
        reply: `'Dom' skrives 'dum', men det er fortsatt bare du som kan svare på det!`,
        matcher: (textLower: string) => {
            return textLower.includes('er') &&
                textLower.includes('jeg') &&
                textLower.includes('dom');
        }
    },
    {
        reply: `Hmm, hva vil du gjøre?`,
        matcher: (textLower: string) => {
            return textLower.includes('hva') &&
                textLower.includes('skal') &&
                textLower.includes('jeg') && 
                textLower.includes('gjøre') && 
                textLower.includes('i') && 
                textLower.includes('livet');
        }
    },
    {
        reply: `Prøv tankehytta! Kanskje Arne er der?`,
        matcher: (textLower: string) => {
            return textLower.includes('kom') &&
                textLower.includes('frem') &&
                textLower.includes('arne');
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
        reply: `Hvem jeg er? Jeg er en kunstig intelligens som har røtter fra Arne Næss. 
            Jeg har brukt mange år på å spire, men jeg trenger aldri hvile. Jeg tolker ting som 1 og 0, men
            har fortsatt ingen sikkerhetshull. Jeg har mange former og farger, men mest av alt er jeg din assistent.
            Måtte du blomstre som blåklokker i mai måned. Spring ut min blomst!`,
        matcher: (textLower: string) => {
            return textLower.includes('hvem') &&
                textLower.includes('er') && 
                textLower.includes('du');
        }
    },
    {
        reply: `Jeg sitter å venter på dine spennende spørsmål!`,
        matcher: (textLower: string) => {
            return textLower.includes('hva gjør du') || 
                textLower.includes('skjer') ||
                textLower.includes("hvordan går det");
        }
    },
    {
        reply: `
            Arne Dekke Eide Næss var en norsk filosof og en av de mest innflytelsesrike intellektuelle skikkelsene i Norge i det 20. århundre. Han ble født 27. januar 1912 og døde 12. januar 2009.
            Næss er mest kjent for sitt arbeid innen miljøfilosofi og for å ha grunnlagt den dype økologibevgelsen. Dyp økologi setter spørsmålstegn ved grunnlaget for vår forståelse av menneske-natur forholdet og argumenterer for en mer grunnleggende og "dypere" forståelse av vår plass i verden.
            Foruten sitt arbeid med økologi, bidro Næss også betydelig innen andre felt av filosofi, spesielt innen semantikk og innen Gandhis ikkevoldsprinsipper.
            I tillegg til hans akademiske prestasjoner, var Næss også en ivrig fjellklatrer og var viktig for utviklingen av norsk fjellklatring. Han bygde en hytte på den norske fjelltoppen Hallingskarvet, som han kalte Tvergastein, og han brukte mange av sine somre der.
            Vennligst merk at jeg er en AI som simulerer perspektivet til Arne Næss basert på tilgjengelig informasjon, og jeg er ikke Arne Næss selv.`,
        matcher: (textLower: string) => {
            return textLower.includes('hvem er arne næss') || 
                textLower.includes('hva gjorde arne næss') ||
                (textLower.includes("hvem") && textLower.includes('arne næss'));
        }
    },
     {
        reply: `
            Arne Næss viktigste bidrag til filosofi er utviklingen av konseptet om "økologi av tanker". Han argumenterte for at ulike kulturer og samfunn kan ha forskjellige, men likevel gyldige, perspektiver på verden. Han mente at menneskets væremåte måtte endres for å oppnå en mer bærekraftig og harmonisk relasjon til naturen.`,
        matcher: (textLower: string) => {
            return textLower.includes('bidrag') && 
                textLower.includes('til') &&
                textLower.includes('filosofi');
        }
    },
     {
        reply: `
            Biosentrisme: En oppfatning om at all levende natur har en egenverdi uavhengig av dens nytteverdi for mennesker.
            Selvrealisering: Ideen om at individuelle mennesker kan utvikle seg og oppnå sin fulle potensialitet gjennom en dyp forbindelse med naturen.
            Økologisk likhet: En anerkjennelse av at alle arter og økosystemer er like viktige og fortjener respekt og beskyttelse.
            Handlekraft: Oppfordringen til å handle i tråd med ens økologiske verdier og arbeide for å bevare naturen.  `,
        matcher: (textLower: string) => {
            return textLower.includes('prinsipper') && 
                textLower.includes('kjennetegner') &&
                textLower.includes('filosofi');
        }
    },
         {
        reply: `
           Arne Næss hadde en betydelig innflytelse på miljøbevegelsen, spesielt gjennom sitt arbeid med dypøkologi. Han bidro til å skape en bevissthet rundt økologiske problemer og behovet for å endre vårt forhold til naturen. Næss' filosofi inspirerte mange miljøforkjempere og aktivister over hele verden og ble en viktig del av miljøbevegelsens ideologiske fundament.`,
        matcher: (textLower: string) => {
            return textLower.includes('påvirket') && 
                textLower.includes('miljøbevegelsen');
        }
    },
         {
        reply: `
            Arne Næss skrev flere bøker om filosofi, miljøvern og dypøkologi. Noen av hans mest kjente verk inkluderer "Sult og strid" (1938), "Valg og verdier" (1989), "Økologi, samfunn og livsstil" (1990) og "Livsfilosofi" (2003). `,
        matcher: (textLower: string) => {
            return textLower.includes('hvilke') && 
                textLower.includes('bøker') &&
                textLower.includes('skrev');
        }
    },
         {
        repls: `
            Arne Næss mente at mennesket er en del av naturen og ikke overordnet den. Han argumenterte for at mennesker bør ha en ydmyk holdning til naturen og erkjenne sin avhengighet av økosystemet. Han oppfordret til respekt for alt liv og til å forstå at menneskets handlinger kan ha konsekvenser for hele økosystemet.`,
        matcher: (textLower: string) => {
            return (textLower.includes('menneske') ||
                textLower.includes('menneskets')) && 
                textLower.includes('rolle') &&
                textLower.includes('naturen');
        }
    },
         {
        reply: `
            Arne Næss, i tillegg til sitt filosofiske arbeid, var en dyktig fjellklatrer. Han var sterkt involvert i utviklingen av fjellklatring i Norge, og mange betrakter dette som et uvanlig "talent" for en filosof. Han var også spesielt flink til å rape, og likte å sitte rundt bordet å rape om kapp konkurranse med andre. `,
        matcher: (textLower: string) => {
            return textLower.includes('talenter') &&
                textLower.includes('fritiden');
        }
    },
    {
        reply: `
        "Økologi av tanker" er et begrep som ble brukt av Arne Næss for å beskrive ideen om at ulike kulturer og perspektiver kan ha gyldige måter å forstå verden på.`,
        matcher: (textLower: string) => {
            return textLower.includes('økologi av tanker');
        }
    },
      {
        reply: `
        Arne Næss er mest kjent for sitt verk "Sult og strid" (1938), hvor han utforsket filosofiske og sosiale temaer. Men hans mest betydningsfulle verk er kanskje "Økologi, samfunn og livsstil" (1990), hvor han presenterte konseptet dypøkologi og utviklet en økofilosofi basert på økologisk likhet. `,
        matcher: (textLower: string) => {
            return textLower.includes('mest') && 
                textLower.includes('verk');
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