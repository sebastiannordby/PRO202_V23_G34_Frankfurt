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
    const [badePageVisible, setBadgePageVisibility] = useState(false);

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

            <div className="content">
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
                    <h2 className="text-lg font-bold">Oppnådde merker</h2>
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
                    <div className="flex flex-wrap justify-center p-4 overflow-y-auto" style={{maxHeight: '800px'}}>
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
        </main>
    );
}



