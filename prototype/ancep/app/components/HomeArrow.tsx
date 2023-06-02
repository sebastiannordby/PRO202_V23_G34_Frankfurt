"use client"
import Link from "next/link";

export function HomeArrow() {
    return (
        <Link 
            href="/" 
            className="flex items-center underline text-lg text-white rounded-md p-2 relative"
            style={{top: '-25px', left: '-20px'}}>
            {/* <Image 
                alt="Hjem pil"
                src="/images/home-arrow.png"
                height={30}
                width={30}/> */}

            <span>{'<-'} Hjem</span>
        </Link>
    );
}