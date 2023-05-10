import Image from "next/image";
import React from "react";

interface propData {
    src: string;
    width: number;
    height: number;
}
export function Icon(prop : propData) {
    return (
        <>
            <div className={'hover:bg-gray-100 hover:cursor-pointer p-1.5 rounded-full'}>
                <Image src={prop.src} alt="dsd" width={prop.width} height={prop.height}/>
            </div>
        </>
    )
}