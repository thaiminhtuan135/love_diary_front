import { RefObject} from "react";

interface data {
    title: string;
    forwardedRef: RefObject<HTMLDivElement>;
}

export default function Head(prop : data) {
    return (
        <>
            <div
                className="fixed w-full z-30 flex bg-white dark:bg-[#0F172A] p-2 items-center justify-center h-16 px-10">
                <div
                    className="logo ml-12 dark:text-white text-2xl  transform ease-in-out duration-500 flex-none h-full flex items-center justify-center"
                    ref={prop.forwardedRef}>
                    {prop.title}
                </div>
                {/*SPACER*/}
                <div className="grow h-full flex items-center justify-center"></div>
                <div className="flex-none h-full text-center flex items-center justify-center">
                    <div className="flex space-x-3 items-center px-3">
                        <div className="flex-none flex justify-center">
                            <div className="w-8 h-8 flex ">
                                {/*<Image src="/img/hacker" width={24} h />*/}
                            </div>
                        </div>
                        <div className="hidden md:block text-sm md:text-md text-black dark:text-white">Charlie Tuấn
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
