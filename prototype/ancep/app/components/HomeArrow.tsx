import Image from "next/image";

export function HomeArrow() {
    return (
        <a 
            href="/" 
            className="flex items-center text-white relative"
            style={{top: '-10px', left: '-10px'}}>
            <Image 
                alt="Hjem pil"
                src="/images/home-arrow.svg"
                height={30}
                width={30}/>

            <span>Hjem</span>
        </a>
    );
}