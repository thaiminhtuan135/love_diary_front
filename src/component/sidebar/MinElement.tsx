import Image from "next/image";
import Link from "next/link";

interface propData {
    href: string;
    src: string;
    alt?: string;
}

export default function MinElement(prop: propData) {
    return (
        <>
            <Link href={prop.href}>
                <button
                    className="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-500 w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex">
                    <Image src={prop.src} width={26} height={26} alt={""}/>
                </button>
            </Link>
        </>
    )
}
