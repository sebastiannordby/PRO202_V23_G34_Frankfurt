"use client"
import { HomeArrow } from "../components/HomeArrow";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Badge } from "@/lib/models/badge";
import { UserProfile } from "@/lib/models/user-profile";
import CharLimitStatusBox from "@/app/components/profile/CharLimitStatusBox";
import SendPictureToDb from "@/app/components/profile/SendPictureToDb";
  
export default function ProfilePage() {
    const { data: session } = useSession();
    const [badges, setBadges] = useState<Badge[]>([]);
    const [profilePicture, setProfilePicture] = useState('');
    const [profilePictureSelectVisible, setProfilePictureSelectVisibility] = useState(false);
    const [badgePageVisible, setBadgePageVisibility] = useState(false);

    const avatars = ['AmbassadorPhil.png', 'BrownWomanPhil.png', 'CatPhil.png', 'ChildPhil1.png', 'ChildPhil2.png',
    'DogPhil.png', 'EgyptPhil.png', 'FuturePhil.png', 'GoatPhil.png', 'LionPhil.png', 'MeanPhil.png', 'NinjaPhil.png',
    'PiratePhil.png', 'MonkeyPhil.png', 'OldPhil.png', 'OwlPhil.png', 'PandaPhil.png', 'PredatorPhil.png',
    'RabbitPhil.png', 'RedWomanPhil.png', 'RobotPhil.png', 'SciFiPhil.png', 'SheepPhil.png', 'VikingPhil.png',
    'WomanPhil.png', 'YoungBlondePhil.png', 'YoungBrunettePhil.png'];

    useEffect(() => {
        document.title = 'Min profil';
        (async() => {
            if(session?.user?.email) {
                Promise.all([
                    fetch('/api/badges?email=' + session?.user?.email),
                    fetch('/api/users?email=' + session?.user?.email)
                ]).then(async([res1, res2]) => {

                if (!res1.ok)
                    throw new Error('Failed to fetch badges');
                if (!res2.ok) {
                    throw new Error('Failed to fetch profile picture');
                }
                const data = await res1.json() as Badge[];
                setBadges(data);
                const data2 = await res2.json() as UserProfile[];
                // @ts-ignore
                const user = data2.find((user) => user.email === session?.user?.email);
                if (user && user.picture) {
                    // @ts-ignore
                    setProfilePicture(user.picture);
                } else {
                    setProfilePicture('PandaPhil.png');
                }
            });
            }
        })();
    }, [session]);

    return (
        <main className="main-layout">
            <HomeArrow />

            <div className="content relative">
                <h1 className="page-title">Min profil</h1>
                <p className="text-sm">Se din progresjon og opptjente merker</p>
                {profilePicture ?
                    <img
                        width="150"
                        height="150"
                        className="mt-2 hover:opacity-90 transition-all duration-150"
                        onClick={() => setProfilePictureSelectVisibility(true)}
                        alt={profilePicture}
                        src={`/images/avatars/${profilePicture}`}/>
                    : null}
                <span>
                    <CharLimitStatusBox limit={50} />
                </span>
                <div className="flex flex-col gap-2 mt-4">
                    <h2 className="text-lg font-bold content relative">Oppnådde
                        <p className="absolute bottom-0 left-24 cursor-pointer hover:scale-110 hover:text-gray-700 transition-all duration-150"
                           onClick={() => setBadgePageVisibility(true)}>Merker</p>
                    </h2>
                    <div className="flex flex-wrap gap-4 mt-2">
                        {badges.map((badge) => (
                            <div
                                key={badge.image_url}
                                className="flex flex-col justify-center content-center text-center"
                                style={{ position: 'relative' }}
                            >
                                <div className="badge-container">
                                    <img
                                        width="50"
                                        height="50"
                                        className="mt-2 mx-auto rounded-full hover:scale-110 hover:opacity-80 transition-all duration-150"
                                        src={badge.image_url}
                                        alt="badge"
                                    />
                                    <span className="badge-name">{badge.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>
            </div>

            <div id="defaultModal" tabIndex={-1} aria-hidden={!profilePictureSelectVisible}
                 className="transition-opacity fixed inset-0 z-50 w-full md:p-4 overflow-hidden backdrop-blur-md mx-auto">
                <div className="mt-2 relative w-full max-w-xl mx-auto overflow-hidden shadow-2xl">
                    <div className="flex items-start p-4 rounded-t justify-center">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Velg et profilbilde
                        </h3>
                    </div>
                    <div className="flex flex-wrap justify-center p-4 overflow-y-auto" style={{maxHeight: '86vh'}}>
                        {avatars.map(avatar => (
                            <div key={avatar} className="m-2 cursor-pointer">
                                <img
                                    width={150}
                                    height={150}
                                    src={`/images/avatars/${avatar}`}
                                    alt={avatar}
                                    onClick={() => {
                                        console.log('avatar:', avatar);
                                        console.log('email:', session?.user?.email);
                                        SendPictureToDb(session?.user?.email as string, avatar as string).then(r =>
                                            setProfilePicture(avatar));
                                        setProfilePictureSelectVisibility(false);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex items-end p-2 space-x-2 rounded-b">
                        <button
                            data-modal-hide="defaultModal"
                            type="button"
                            onClick={() => setProfilePictureSelectVisibility(false)}
                            className="ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                              focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5
                              py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                              dark:focus:ring-blue-800">Lukk</button>
                    </div>
                </div>
            </div>

            <div id="defaultModal" tabIndex={-1} aria-hidden={!badgePageVisible}
                 className="transition-opacity fixed inset-0 z-50 w-full md:p-4 overflow-hidden backdrop-blur-md mx-auto">
                <div className="mt-2 relative w-full max-w-2xl mx-auto badge-pop-background overflow-hidden shadow-2xl">
                    <div className="flex items-start p-4 rounded-t justify-center">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Alle merker:
                        </h3>
                    </div>
                        <div className="flex flex-wrap p-4 overflow-y-auto content relative" style={{maxHeight: '86vh'}}>
                            <div className="flex flex-wrap p-4">
                            <div className="badge-background">
                                <div className="badge-container text-black">
                                    <img
                                        width="50"
                                        height="50"
                                        className="mt-2 ml-12"
                                        src="/images/badges/bio-diversity.png" />
                                    <p className="ml-2">Sirkel av mangfold</p>
                                    <p className="badge-desc right-4 pl-40 text-sm">Et sirkulært symbol som viser frem ulike elementer av biologisk mangfold, som planter, dyr og økosystemer, og understreker viktigheten av å bevare og respektere mangfoldet av liv på jorden.</p>
                                    <span></span>
                                    <p className="badge- desc right-4 pl-60 text-sm">Hvordan låse opp: Hemmelig</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap p-4">
                            <div className="badge-background">
                                <div className="badge-container text-black">
                                    <img
                                        width="50"
                                        height="50"
                                        className="mt-2 ml-12 rounded-full"
                                        src="/images/badges/tree-of-life.png" />
                                    <p className="ml-8 pb-3">Livets tre</p>
                                    <p className="badge-desc right-4 pl-40 text-sm">Et symbol som representerer sammenhengen mellom alle levende vesener og viktigheten av å bevare og pleie naturen.</p>
                                    <span></span>
                                    <p className="badge- desc right-4 pl-60 text-sm">Hvordan låse opp: Hemmelig</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap p-4">
                            <div className="badge-background">
                                <div className="badge-container text-black">
                                    <img
                                        width="50"
                                        height="50"
                                        className="mt-2 ml-12 rounded-full"
                                        src="/images/badges/earth-mandala.png" />
                                    <p className="ml-5 pb-3">Jord Mandala</p>
                                    <p className="badge-desc right-4 pl-40 text-sm">Et sirkulært design med elementer av naturen, som trær, dyr og vann, som symboliserer enheten og harmonien mellom mennesker og miljøet.</p>
                                    <span></span>
                                    <p className="badge- desc right-4 pl-60 text-sm">Hvordan låse opp: Hemmelig</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap p-4">
                            <div className="badge-background">
                                <div className="badge-container text-black">
                                    <img
                                        width="50"
                                        height="50"
                                        className="mt-2 ml-12 rounded-full"
                                        src="/images/badges/green-feet.png" />
                                    <p className="ml-5 pb-3">Grønne fotspor</p>
                                    <p className="badge-desc right-4 pl-40 text-sm">Et symbol som illustrerer konseptet bærekraftig livsstil og ideen om at hver enkelts handlinger etterlater en innvirkning på miljøet.</p>
                                    <span></span>
                                    <p className="badge- desc right-4 pl-60 text-sm">Hvordan låse opp: Hemmelig</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap p-4">
                            <div className="badge-background">
                                <div className="badge-container text-black">
                                    <img
                                        width="50"
                                        height="50"
                                        className="mt-2 ml-12 rounded-full"
                                        src="/images/badges/ying-yang-earth.png" />
                                    <p className="ml-3 pb-3">Yin-Yang Jorden</p>
                                    <p className="badge-desc right-4 pl-40 text-sm">En variant av det tradisjonelle yin-yang-symbolet, der den ene halvparten representerer naturen og den andre representerer det menneskelige samfunn, og fremhever behovet for balanse og harmoni mellom de to.</p>
                                    <span></span>
                                    <p className="badge- desc right-4 pl-60 text-sm">Hvordan låse opp: Hemmelig</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap p-4">
                            <div className="badge-background">
                                <div className="badge-container text-black">
                                    <img
                                        width="50"
                                        height="50"
                                        className="mt-2 ml-12 rounded-full"
                                        src="/images/badges/ouroboros-tree.png" />
                                    <p className="ml-8 pb-3">Ouroboros</p>
                                    <p className="badge-desc right-4 pl-40 text-sm">En representasjon av et tre som danner en sirkel og dets grener flettes sammen med røttene, og symboliserer livets sykliske natur, regenerering og den kontinuerlige forbindelsen mellom mennesker og natur.</p>
                                    <span></span>
                                    <p className="badge- desc right-4 pl-60 text-sm">Hvordan låse opp: Hemmelig</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap p-4">
                            <div className="badge-background">
                                <div className="badge-container text-black">
                                    <img
                                        width="50"
                                        height="50"
                                        className="mt-2 ml-12 rounded-full"
                                        src="/images/badges/gaias-hands.png" />
                                    <p className="ml-8 pb-3">Gaias hender</p>
                                    <p className="badge-desc right-4 pl-40 text-sm">Et symbol med to hender som vugger en klode, som indikerer ansvaret og forvaltningen mennesker har overfor jorden, inspirert av konseptet Gaia, den levende jorden.</p>
                                    <span></span>
                                    <p className="badge- desc right-4 pl-60 text-sm">Hvordan låse opp: Hemmelig</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap p-4">
                            <div className="badge-background">
                                <div className="badge-container text-black">
                                    <img
                                        width="50"
                                        height="50"
                                        className="mt-2 ml-12 rounded-full"
                                        src="/images/badges/spiral-of-awerness.png" />
                                    <p className="ml-3 text-sm pb-3">Spiral av bevisthet</p>
                                    <p className="badge-desc right-4 pl-40 text-sm">Et spiralformet symbol som viser reisen til selvrefleksjon og utvidende bevissthet, som symboliserer prosessen med å utdype ens forståelse av økologiske problemer og personlig ansvar.</p>
                                    <span></span>
                                    <p className="badge- desc right-4 pl-60 text-sm">Hvordan låse opp: Hemmelig</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap p-4">
                            <div className="badge-background">
                                <div className="badge-container text-black">
                                    <img
                                        width="50"
                                        height="50"
                                        className="mt-2 ml-12 rounded-full"
                                        src="/images/badges/water-droplet-network.png" />
                                    <p className="ml-3 text-sm pb-3">Vanndråpnenettverk</p>
                                    <p className="badge-desc right-4 pl-40 text-sm">Et nettverkslignende symbol dannet av sammenkoblede vanndråper, som symboliserer den globale tilkoblingen og gjensidig avhengighet av vannforekomster, og fremhever viktigheten av vannbevaring og -beskyttelse.</p>
                                    <span></span>
                                    <p className="badge- desc right-4 pl-60 text-sm">Hvordan låse opp: Hemmelig</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap p-4">
                            <div className="badge-background">
                                <div className="badge-container text-black">
                                    <img
                                        width="50"
                                        height="50"
                                        className="mt-2 ml-12 rounded-full"
                                        src="/images/badges/scales-of-justice.png" />
                                    <p className="ml-2 pb-3 text-sm">Rettferdighetsskalaer</p>
                                    <p className="badge-desc right-4 pl-40 text-sm">Et symbol med en balanseskala, der den ene siden representerer menneskelige behov og den andre siden representerer økologisk integritet, og understreker behovet for en balansert tilnærming som tar hensyn til begge aspekter.</p>
                                    <span></span>
                                    <p className="badge- desc right-4 pl-60 text-sm">Hvordan låse opp: Hemmelig</p>
                                </div>
                            </div>
                        </div>
                        </div>
                    <div className="flex items-end p-2 space-x-2 rounded-b">
                        <button
                            data-modal-hide="defaultModal"
                            type="button"
                            onClick={() => setBadgePageVisibility(false)}
                            className="ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                              focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5
                              py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                              dark:focus:ring-blue-800">Lukk</button>
                    </div>
                </div>
            </div>
        </main>
    );
}



