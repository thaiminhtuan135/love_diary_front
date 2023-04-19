import Link from "next/link";

interface prop {
    href: string;
    className: string;
    text: string;
}
export default function LinkCustom(prop:prop) {
    return(
        <>
            <Link href={prop.href}>
                <button className={prop.className}>
                    {prop.text}
                </button>
            </Link>
        </>
    )
}
