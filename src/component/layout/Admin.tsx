import {PropsWithChildren, RefObject, useRef} from "react";

import Head from "@/component/Head";
import Sidebar from "@/component/Sidebar";

function Admin(props: PropsWithChildren) {
    const sidebarRef: RefObject<HTMLElement> = useRef(null);
    const maxSidebarRef: RefObject<HTMLDivElement> = useRef(null);
    const miniSidebarRef: RefObject<HTMLDivElement> = useRef(null);
    const maxToolbarRef: RefObject<HTMLDivElement> = useRef(null);
    const logoRef: RefObject<HTMLDivElement> = useRef(null);
    const contentRef: RefObject<HTMLDivElement> = useRef(null);
    const moonRef: RefObject<HTMLDivElement> = useRef(null);
    const sunRef: RefObject<HTMLDivElement> = useRef(null);

    function setDark() {
        document.documentElement.classList.add('dark');
        moonRef.current?.classList.add("hidden");
        sunRef.current?.classList.remove("hidden");
    }

    function setLight() {
        document.documentElement.classList.remove('dark');
        sunRef.current?.classList.add("hidden");
        moonRef.current?.classList.remove("hidden");
    }

    function openNav() {
        if (sidebarRef.current?.classList.contains('-translate-x-48')) {
            // max sidebar
            sidebarRef.current?.classList.remove("-translate-x-48");
            sidebarRef.current?.classList.add("translate-x-none");
            maxSidebarRef.current?.classList.remove("hidden");
            maxSidebarRef.current?.classList.add("flex");
            miniSidebarRef.current?.classList.remove("flex");
            miniSidebarRef.current?.classList.add("hidden");
            maxToolbarRef.current?.classList.add("translate-x-0");
            maxToolbarRef.current?.classList.remove("translate-x-24", "scale-x-0");
            logoRef.current?.classList.remove("ml-12");
            contentRef.current?.classList.remove("ml-12");
            contentRef.current?.classList.add("ml-12", "md:ml-60");
        } else {
            // mini sidebar
            sidebarRef.current?.classList.add("-translate-x-48");
            sidebarRef.current?.classList.remove("translate-x-none");
            maxSidebarRef.current?.classList.add("hidden");
            maxSidebarRef.current?.classList.remove("flex");
            miniSidebarRef.current?.classList.add("flex");
            miniSidebarRef.current?.classList.remove("hidden");
            maxToolbarRef.current?.classList.add("translate-x-24", "scale-x-0");
            maxToolbarRef.current?.classList.remove("translate-x-0");
            logoRef.current?.classList.add('ml-12');
            contentRef.current?.classList.remove("ml-12", "md:ml-60");
            contentRef.current?.classList.add("ml-12");
        }
    }


    return (
        <>
            <div className="body bg-white dark:bg-[#0F172A]">
                <Head forwardedRef={logoRef} title={'LTS_EDU'}/>
                <Sidebar
                    setDark={setDark}
                    setLight={setLight}
                    openNav={openNav}
                    sidebarRef={sidebarRef}
                    maxToolbarRef={maxToolbarRef}
                    moonRef={moonRef}
                    sunRef={sunRef}
                    maxSidebarRef={maxSidebarRef}
                    miniSidebarRef={miniSidebarRef}/>
                {/*CONTENT -->*/}
                <div ref={contentRef}
                     className="relative content ml-12 transform ease-in-out duration-500 pt-20 px-2 pb-4 ">
                    <div className="px-6 py-3 text-gray-700 rounded-lg bg-gray-50 dark:bg-[#1E293B]"
                         aria-label="Breadcrumb">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin;
