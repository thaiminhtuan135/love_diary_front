import Image from "next/image";
import {RefObject} from "react";

interface refs {
    setDark: () => void;
    setLight: () => void;
    openNav: () => void;
    sidebarRef: RefObject<HTMLElement>;
    maxToolbarRef: RefObject<HTMLDivElement>;
    moonRef: RefObject<HTMLDivElement>;
    sunRef: RefObject<HTMLDivElement>;
    maxSidebarRef: RefObject<HTMLDivElement>;
    miniSidebarRef: RefObject<HTMLDivElement>;
}

// #B09797
export default function Sidebar(prop : refs){
    return(
        <>
            <aside className="w-60 -translate-x-48 fixed transition transform ease-in-out duration-1000 z-50 flex h-screen bg-[#1E293B] " ref={prop.sidebarRef}>
                {/*open sidebar button */}
                <div
                    className="max-toolbar translate-x-24 scale-x-0 w-full -right-6 transition transform ease-in duration-300 flex items-center justify-between border-4 border-white dark:border-[#0F172A] bg-[#1E293B]  absolute top-2 rounded-full h-12" ref={prop.maxToolbarRef}>

                    <div className="flex pl-4 items-center space-x-2 ">
                        <div>
                            <div onClick={prop.setDark}
                                 className="moon text-white hover:text-blue-500 dark:hover:text-[#38BDF8]" ref={prop.moonRef}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/>
                                </svg>
                            </div>
                            <div onClick={prop.setLight}
                                 className="sun hidden text-white hover:text-blue-500 dark:hover:text-[#38BDF8]" ref={prop.sunRef}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="text-white hover:text-blue-500 dark:hover:text-[#38BDF8]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3}
                                 stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
                            </svg>
                        </div>
                    </div>
                    <div
                        className="flex items-center space-x-3 group bg-gradient-to-r dark:from-cyan-500 dark:to-blue-500 from-indigo-500 via-purple-500 to-purple-500  pl-10 pr-2 py-1 rounded-full text-white  ">
                        <div className="transform ease-in-out duration-300 mr-12">
                            LTS_EDU
                        </div>
                    </div>
                </div>
                <div onClick={prop.openNav}
                     className="-right-6 transition transform ease-in-out duration-500 flex border-4 border-white dark:border-[#0F172A] bg-[#1E293B] dark:hover:bg-blue-500 hover:bg-purple-500 absolute top-2 p-3 rounded-full text-white hover:rotate-45">
                    <Image src="/img/heart-attack.png" alt="" width={24} height={24}/>
                </div>
                {/*<!-- MAX SIDEBAR*/}
                <div className="max hidden text-white mt-20 flex-col space-y-2 w-full h-[calc(100vh)]" ref={prop.maxSidebarRef}>
                    <div
                        className="hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
                        <Image src="/icon/home.png" width={24} height={24} alt={'home'}/>
                        <button className="font-[600]">
                            Home
                        </button>
                    </div>
                    <div
                        className="hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
                        <Image src="/icon/course.png" width={24} height={24}  alt={'course'}/>
                        <button className="font-[600]">
                            Course
                        </button>
                    </div>
                    <div
                        className="hover:ml-4 w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
                        <Image src="/icon/user.png" width={24} height={24}  alt={'user'}/>
                        <button className="font-[600]">
                            User
                        </button>
                    </div>
                </div>
                {/*<!-- MINI SIDEBAR*/}
                <div className="mini mt-20 flex flex-col space-y-2 w-full h-[calc(100vh)]" ref={prop.miniSidebarRef}>
                    <div
                        className="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-500 w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex">
                        <Image src="/icon/home.png" width={24} height={24}  alt={'home'}/>
                    </div>
                    <div
                        className="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-500 w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex">
                        <Image src="/icon/course.png" width={24} height={24}  alt={'course'}/>
                    </div>
                    <div
                        className="hover:ml-4 justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-500 w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex">
                        <Image src="/icon/user.png" width={24} height={24}  alt={'user'}/>
                    </div>
                </div>
            </aside>
        </>
    )
}
