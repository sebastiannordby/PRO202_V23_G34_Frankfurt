import { HomeArrow } from '../components/HomeArrow';
import { SearchInput } from '../components/client/SearchInput'
export const metadata = {
    title: 'Akriv',
}

type FramePage = {
    title: string;
    url: string;
}

export default async function ArchivePage() {
    let pageFrameVisible = false;
    let pageFrame: FramePage;

    const pages: FramePage[] = [
        { title: 'Positivismen', url: 'https://ancep.no/docs/positivismen/' },
        { title: 'Om å være konsekvent', url: 'https://ancep.no/docs/om-a-vaere-konsekvent/' },
        { title: 'PLURALISME OG ØKOSOFI', url: 'https://ancep.no/docs/pluralisme-og-okosofi/' },
        { title: 'Filosofisk system', url: 'https://ancep.no/docs/filosofisk-system/' },
        { title: 'Spinozas etikk', url: 'https://ancep.no/docs/spinozas-etikk/'},
        { title: 'Det gode liv', url: 'https://ancep.no/docs/det-gode-liv/' }
    ];

    const handleIframe = (page: FramePage) => {
        console.log('Show this page: ', page);
        pageFrame = page;
        pageFrameVisible = true;
    };

    return (
        <main className="main-layout">
            <HomeArrow />
            <h1 className="page-title">Arkiv</h1>
            <p className="font-medium text-sm">Utforsk vårt akriv nedenfor</p>

            <div className="mt-2 flex flex-col gap-2 p-2">
                <SearchInput />

                <div className="flex flex-col gap-2 mt-2">
                    {
                        pages.map(x => 
                            <FrameItem key={x.title} title={x.title} url={x.url}/>)
                    }
                </div>
            </div>
        </main>
    );
}

function FrameItem({ title, url }: FramePage) {
    return (
        <a 
           target="_blank" href={url} className="secondary-card font-medium uppercase text-center p-2">{title}</a>
    );
}