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
        { title: 'Filosofisk system', url: 'https://ancep.no/docs/filosofisk-system/' }
    ];

    const handleIframe = (page: FramePage) => {
        console.log('Show this page: ', page);
        pageFrame = page;
        pageFrameVisible = true;
    };

    return (
        <div className="p-2">
            <h1 className="text-xl font-semibold">Arkiv</h1>

            <div className="flex flex-col gap-2 mt-2 p-2">
                {
                    pages.map(x => 
                        <FrameItem key={x.title} title={x.title} url={x.url}/>)
                }
            </div>
        </div>
    );
}

function FrameItem({ title, url }: FramePage) {
    return (
        <a 
           target="_blank" href={url} className="uppercase text-center border p-2">{title}</a>
    );
}