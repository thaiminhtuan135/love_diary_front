import {Avatar, Tooltip} from "antd";
import {MingcuteWorld2Fill} from "@/component/icon/MingcuteWorld2Fill";
import PhDotsThreeOutlineFill from "@/component/icon/PhDotsThreeOutlineFill";
import MdiBellRemove from "@/component/icon/MdiBellRemove";
import React from "react";


const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'

export function Header() {
    return (
        <>
            <div className={'flex'}>
                <div>
                    <Avatar src={<img src={url} alt="avatar"/>} size={40}/>
                </div>
                <div className={'ml-2 w-full'}>
                    <div className={'flex w-full justify-between'}>
                        <div>
                            <p className={'hover:underline hover:cursor-pointer'}>Minh Tuan </p>
                            <p className={'flex'}>
                                10-6-2001
                                <Tooltip placement="top" title={"Public"}>
                                    <MingcuteWorld2Fill className={'ml-1'}/>
                                </Tooltip>
                            </p>
                        </div>
                        <div className={'flex p-1'}>
                                <span
                                    className={'mr-3 hover:cursor-pointer hover:bg-gray-200 rounded-full p-2'}><PhDotsThreeOutlineFill
                                    fontSize={20}/></span>
                            <span
                                className={'mr-3 hover:cursor-pointer hover:bg-gray-200 rounded-full p-2'}><MdiBellRemove
                                fontSize={20}/></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}