import Image from "next/image";
import Link from "next/link";

interface propData{
    href: string;
    src: string;
    alt: string;
    text: string;
}
export default function MaxElement(prop : propData) {
    return(
        <>
            <Link href={prop.href}>
                <div
                    className="hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
                    <Image src={prop.src} width={26} height={26} alt={prop.alt}/>
                    <button className="font-[600]">
                        {prop.text}
                    </button>
                </div>
            </Link>
        </>
    )
};
