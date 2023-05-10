import NotificationRemove from "@/component/icon/NotificationRemove";
import React from "react";

interface propData {
    handleHidden : () => void
}
export function HiddenPost(prop:propData) {
    return(
        <>
            <div className={'flex justify-center w-full mb-2'}>
                <div className={'w-2/3 bg-gray-100 rounded-2xl'}>
                    <div className={'mt-2 mx-2 py-2'}>
                        <div className={'flex'}>
                            <div>
                                <NotificationRemove fontSize={40}/>
                            </div>
                            <div className={'ml-2 w-full'}>
                                <div className={'flex w-full justify-between'}>
                                    <div>
                                        <p className={'hover:underline hover:cursor-pointer'}>Post hidden</p>
                                        <p className={'flex'}>You will see fewer similar posts.</p>
                                    </div>
                                    <div className={'flex p-1'}>
                                            <span onClick={prop.handleHidden} className={'mr-3 bg-gray-400 hover:cursor-pointer hover:bg-gray-300 rounded-xl p-2'}>
                                                undo
                                            </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}