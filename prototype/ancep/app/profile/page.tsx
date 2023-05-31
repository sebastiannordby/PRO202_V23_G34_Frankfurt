"use client"
import Image from "next/image";
import { HomeArrow } from "../components/HomeArrow";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AddBadge } from "../components/AddBadge";

// export const metadata = {
//     title: 'Min profil',
// }

  
export default function ProfilePage() {
    const { data: session } = useSession();
    const [badges, setBadges] = useState([]);
    const { addBadgeToProfile } = AddBadge();
    useEffect(() => {
        fetch('/api/badges')
            .then((response) => {
                if (!response.ok) throw new Error('Failed to fetch badges');
                return response.json();
            })
            .then((data) => {
                // @ts-ignore
                const imageUrls = data.map((badge) => badge.image_url);
                setBadges(imageUrls);
            })
            .catch(console.error);
    }, []);

    return (
        <main className="main-layout">
            <HomeArrow />

            <div className="content">
                <h1 className="page-title">Min profil</h1>
                <p className="text-sm">Se din progresjon og opptjente merker</p>
                {session?.user?.image ? 
                    <>
                        <img 
                        width="150"
                        height="150"
                        className="mt-2"
                        src={session?.user?.image as string}/> 
                    </> : ''
                } 

                
                <div className="flex flex-col gap-2 mt-4">
                    <h2 className="text-lg font-bold">Oppnådde merker</h2>

                    <div className="flex gap-4 mt-3">


                    </div>

                    <div>
                        <button
                            onClick={() => addBadgeToProfile('1')}
                            className="bg-green-600 hover:bg-green-400 text-white font-bold py-2 px-4 rounded">
                            Add Badge
                        </button>
                    </div>
                    <div className="flex gap-4 mt-2">
                        {badges.map((imageUrl) => (
                            <img
                                width="50"
                                height="50"
                                className="mt-2"
                                src={imageUrl} alt="badge" key={imageUrl} />
                        ))}
                    </div>
                    </div>
            </div>
        </main>
    );
}