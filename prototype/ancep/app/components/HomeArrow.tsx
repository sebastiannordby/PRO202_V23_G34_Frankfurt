import Image from "next/image";

export function HomeArrow() {
    return (
        <a 
            href="/" 
            className="flex items-center underline text-lg text-white rounded-md p-2 relative"
            style={{top: '-10px', left: '-10px'}}>
            {/* <Image 
                alt="Hjem pil"
                src="/images/home-arrow.png"
                height={30}
                width={30}/> */}

            <span>{'<-'} Hjem</span>
        </a>
    );
}