import { HomeArrow } from "@/app/components/HomeArrow";
import Image from "next/image";
import Link from "next/link";

export default function HostLandingPage() {
    return (
        <main className="main-layout">
            <HomeArrow />
            <div className="content">
                <h1 className="text-center text-xl">Host</h1>
                <div className="flex flex-wrap mt-2 justify-center items-center gap-4">
                    <Link 
                        className="bg-white p-4 rounded-lg hover:cursor-pointer hover:scale-105"
                        href="/activities/activity-overview">
                        <h1 className="mb-4 text-center">Lag ditt eget spill!</h1>
                        <Image
                            alt="Lag ditt eget spill"
                            src="/images/think-provoke/host/q-and-a.png"
                            height={200}
                            width={150} />
                    </Link>
                    <Link 
                        className="bg-white p-4 rounded-lg hover:cursor-pointer hover:scale-105"
                        href="/activities/think-provoke/host/start">
                        <h1 className="mb-4 text-center">Start spill!</h1>
                        <Image
                            alt="Start spill"
                            src="/images/think-provoke/host/spill.png"
                            height={200}
                            width={150} />
                    </Link>
                </div> 
            </div>
        </main>
    );
}