import { HomeArrow } from "../components/HomeArrow";

export const metadata = {
    title: 'Lærer',
};

  
export default function QuizPage() {
    return(
        <main className="main-layout">
            <HomeArrow />
            
            <div className="content">
                <div>
                    <h1 className="page-title">Undervisnings veiledning</h1>
                    <p className="font-medium text-md">Velkommen til læringsplattformen om Arne Næss.</p>

                    <h3 className="mt-2 mb-2">Katalog</h3>
                    <ul className="list-disc list-inside pl-3 underline">
                        <li><a href="#whyToUse">Hvorfor bruke denne plattformen</a></li>
                        <li><a href="#howToUse">Hvordan bruke denne plattformen</a></li>
                        <li><a href="#tips">Tips til undervisning</a></li>
                    </ul>
                </div>

                <div className="mt-3 flex flex-col gap-2 p-2">
                    <div id="whyToUse">
                        <div className="mb-2">
                            <h3 className="text-xl">Hvorfor bruke denne plattformen</h3>
                        </div>
                        <div className="mb-2">
                            <p className="mb-2">
                                Denne læringsplattformen er designet for å introdusere elevene for Arne Næss, hans filosofi og hans bidrag til miljøbevegelsen. Ved å bruke denne plattformen i undervisningen kan du oppnå følgende:
                            </p>
                            <ul className="pl-3 list-inside list-disc">
                                <li>
                                    Kritisk tenkning: Arne Næss' filosofi utfordrer elevene til å tenke kritisk om deres forhold til naturen og deres ansvar for miljøet. Ved å utforske hans ideer og engasjere seg i diskusjoner og refleksjon, kan elevene utvikle en dypere forståelse av økologi og bærekraft. 
                                </li>
                                <li>
                                    Bevisstgjøring om naturvern: Gjennom denne plattformen kan elevene bli oppmerksomme på viktigheten av å bevare naturen og ivareta økosystemene. Arne Næss' tanker om økologisk likevekt og respekt for mangfold kan inspirere elevene til å ta ansvar og handle for en bærekraftig fremtid. 
                                </li>
                                <li>
                                    Tverrfaglig læring: Arne Næss' filosofi kan integreres i ulike fagområder som naturfag, samfunnsfag, filosofi og kreativ skriving. Ved å bruke denne plattformen kan du stimulere tverrfaglig læring og utforske hvordan Næss' ideer kan berike ulike faglige perspektiver. 
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div id="howToUse">
                        <div className="mb-2">
                            <h3 className="text-xl">Hvordan bruke denne plattformen</h3>
                        </div>
                        <div>
                            <ul className="pl-3 list-inside list-disc">
                                <li>
                                    Kunnskapssamling: Utforsk den omfattende kunnskapssamlingen om Arne Næss som er tilgjengelig på plattformen. Du finner informasjon om hans liv, filosofi, bøker og ideer. Du kan søke etter spesifikke temaer eller utforske ulike kategorier for å utvide din forståelse av Næss' tenkning. 
                                </li>
                                <li>
                                    Aktiviteter: Delta i interaktive spill og aktiviteter som er utformet for å utfordre og stimulere dine ideologiske tanker. Disse aktivitetene er designet for å få deg til å tenke dypere og reflektere over Næss' perspektiver på miljøvern, økologi og sosial rettferdighet. Gjennom disse aktivitetene kan du utforske ulike scenarioer og ta beslutninger basert på Næss' filosofi. 
                                </li>
                                <li>
                                    Chatbot AI: Benytt deg av chatbot AI-en for å kommunisere og diskutere med Arne Næss virtuelt. Chatboten er programmert til å svare i tråd med Næss' tenkning og filosofi, og kan besvare spørsmål, gi råd eller engasjere seg i diskusjoner. Dette gir deg muligheten til å få innsikt i Næss' tanker på en interaktiv måte. 
                                </li>
                                <li>
                                    Min profil: Opprett og administrer din egen profil på plattformen. Profilen inneholder informasjon om din bruker og gir deg muligheten til å holde oversikt over dine prestasjoner og "merker" du har oppnådd gjennom interaksjon med kunnskapssamlingen, aktiviteter og chatbot AI. Dette gir deg en følelse av progresjon og belønning for ditt engasjement på plattformen. 
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div id="tips">
                        <div className="mb-2">
                            <h3 className="text-xl">Tips til undervisning</h3>
                        </div>
                        <div>
                            <ul className="pl-3 list-inside list-disc">
                                <li>
                                    Utforsk Næss' filosofi og dypøkologi med elevene. Diskuter hvordan disse ideene kan anvendes på dagens miljøutfordringer og oppfordre elevene til å tenke kritisk om deres egen forhold til naturen. 
                                </li>
                                <li>
                                    Gjennomfør praktiske aktiviteter som engasjerer elevene i naturen og fremmer bevissthet om økologiske sammenhenger. For eksempel, organisere en feltekspedisjon, skogvandring eller en opprydningsaksjon. 
                                </li>
                                <li>
                                    Diskuter Næss' tanker om verdien av mangfold og hvordan det kan overføres til etnisitet, kultur og samfunn. Utforsk hvordan respekt for mangfold kan bidra til en mer bærekraftig og rettferdig verden. 
                                </li>
                                <li>
                                    Oppfordre elevene til å reflektere over sitt eget forbruk og levestil. Diskuter hvordan Næss' filosofi kan påvirke individuelle valg og samfunnets strukturer. 
                                </li>
                                <li>
                                    Velg ut noen forskjellige ideologier eller emner som du får elevene til å stemme på hvilket emne de vil utforske mer. Dette vil være mer engasjerende for elever å prate om et emnet de kanskje har tilhørighet med.  
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}