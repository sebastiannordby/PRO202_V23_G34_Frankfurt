"use client"
import Link from "next/link";

export function BackArrow() {
    const goBack = (e: any) => {
        e.preventDefault();
        window.history.back();
    };
    return (
        <Link
            href="#"
            onClick={goBack}
            className="flex items-center underline text-lg text-white rounded-md p-2 relative"
            style={{top: '-25px', left: '-20px'}}>
            <span>{'<-'} Tilbake</span>
        </Link>
    );
}