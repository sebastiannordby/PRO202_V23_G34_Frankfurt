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

    const { addBadgeToProfile } = AddBadge();

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
                        <div className="text-center">
                            <Image 
                                src="/images/merker/earth-medium.png"
                                height={50}
                                width={50}
                                className="mx-auto"
                                alt="Merke"/>

                            <label className="block mt-2">Jord</label>
                        </div>
                        <div className="text-center">
                            <Image 
                                src="/images/merker/eclipse-medium.png"
                                height={50}
                                width={50}
                                className="mx-auto"
                                alt="Merke"/>
                            <label className="block mt-2">Ellipse</label>
                        </div>
                        <div className="text-center">
                            <Image 
                                src="/images/merker/meteorite-medium.png"
                                height={50}
                                width={50}
                                className="mx-auto"
                                alt="Merke"/>
                            <label className="block mt-2">Meteoritt</label>
                        </div>
                        <div className="text-center">
                            <Image 
                                src="/images/merker/sun-medium.png"
                                height={50}
                                width={50}
                                className="mx-auto"
                                alt="Merke"/>
                            <label className="block mt-2">Sol</label>
                        </div>
                        <div>
                            <button onClick={() => addBadgeToProfile('1')}>
                                Add Badge
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}