import {NextPageWithLayout} from "@/pages/_app";
import {useRouter} from "next/router";
import useAxiosGet from "@/hooks/useApi/useAxiosGet";
import React, {ReactElement, useEffect, useState, createContext} from "react";
import Admin from "@/component/layout/Admin";
import {Avatar, Card, Dropdown, MenuProps, Tooltip} from "antd";
import {Content} from "@/component/post/Content";
import Like from "@/component/icon/Like";
import IconComment from "@/component/icon/IconComment";
import Share from "@/component/icon/Share";
import {MingcuteWorld2Fill} from "@/component/icon/MingcuteWorld2Fill";
import PhDotsThreeOutlineFill from "@/component/icon/PhDotsThreeOutlineFill";
import MdiBellRemove from "@/component/icon/MdiBellRemove";
import {HiddenPost} from "@/component/post/HiddenPost";
import {SkypeOutlined, UserOutlined} from "@ant-design/icons";
import Friend from "@/component/icon/Friend";
import Lock from "@/component/icon/Lock";
import CreatePost from "@/component/post/Create";

interface Post {
    id: number;
    name: string;
    createAt: Date;
    author: string;
    content: string;
    short_content: string;
    account_id: number;
    nickName: string;
    topic_id: number;
    topicName: string;
}

const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'

export const PostContext = createContext<any>(null);


const ListPost: NextPageWithLayout = () => {
    const router = useRouter();
    const {data, loadData, setData} = useAxiosGet<Post>('http://localhost:8083/api/v1/admin/post/list')
    const [loading, setLoading] = useState(true);

    const modePost = [
        {
            id: 1,
            title: "Anyone on facebook",
            mode: "public",
            icon: <MingcuteWorld2Fill fontSize={30}/>
        },
        {
            id: 2,
            title: "Your friends on facebook",
            mode: "Friend",
            icon: <Friend fontSize={30}/>
        },
        {
            id: 3,
            title: "Only me",
            mode: "Private",
            icon: <Lock fontSize={30}/>
        },
    ]

    const arr = [];
    for (const item of data) {
        arr[item.id] = false;
    }
    const [hid, setHid] = useState<Array<any>>(arr);
    useEffect(() => {
        loadData();
        setLoading(false);
    }, []);

    const handleHidden = (id: any) => {
        const newHid = [...hid];
        newHid[id] = false;
        setHid(newHid);
    }
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <>
                    <div className="flex h-[30px] justify-around">
                        <div className="mr-3 max-w-[16px] transition-all hover:transform hover:scale-125 hover:text-[25px] text-[20px]">&#x1F641;</div>
                        <div className="mr-3 max-w-[16px] transition-all hover:transform hover:scale-125 hover:text-[25px] text-[20px]">&#x1F970;</div>
                        <div className="mr-3 max-w-[16px] transition-all hover:transform hover:scale-125 hover:text-[25px] text-[20px]">&#x1F621;</div>
                        <div className="mr-3 max-w-[16px] transition-all hover:transform hover:scale-125 hover:text-[25px] text-[20px]">&#x1F602;</div>
                        {/*<div className="animate-spin transition-all duration-500 ease-in-out text-[20px]">&#x1F641;</div>*/}
                    </div>
                </>
            ),

        },
    ];
    return (
        <>
            <Content/>
            <Card title={"Post"} size={"default"}>
                <CreatePost loadData={loadData}/>
                {/*posts*/}
                {data.map((post) => {
                    return (
                        <div key={post.id}>
                            {
                                (hid[post.id] && <HiddenPost handleHidden={() => {
                                        const newHid = [...hid];
                                        newHid[post.id] = false;
                                        setHid(newHid);
                                    }}/>
                                )
                                ||
                                !hid[post.id] &&
                                <div className={'flex justify-center w-full mb-2'}>
                                    <div className={'w-2/3 bg-gray-100 rounded-2xl'}>
                                        <div className={'mt-2 mx-2 py-2'}>
                                            {/*head*/}
                                            <div className={'flex'}>
                                                <div>
                                                    <Avatar src={<img src={url} alt="avatar"/>} size={40}/>
                                                </div>
                                                <div className={'ml-2 w-full'}>
                                                    <div className={'flex w-full justify-between'}>
                                                        <div>
                                                            <p className={'hover:underline hover:cursor-pointer'}>Minh
                                                                Tuan </p>
                                                            <p className={'flex'}>
                                                                10-6-2001
                                                                <Tooltip placement="top" title={"Public"}>
                                                                    <MingcuteWorld2Fill className={'ml-1'}/>
                                                                </Tooltip>
                                                            </p>
                                                        </div>
                                                        <div className={'flex p-1'}>
                                                            <span
                                                                className={'mr-3 hover:cursor-pointer hover:bg-gray-200 rounded-full p-2'}>
                                                                <PhDotsThreeOutlineFill fontSize={20}/>
                                                            </span>
                                                            <span className={'mr-3 hover:cursor-pointer hover:bg-gray-200 rounded-full p-2'}>
                                                                <MdiBellRemove fontSize={20} onClick={() => {
                                                                    const newHid = [...hid];
                                                                    newHid[post.id] = true;
                                                                    setHid(newHid);
                                                                }}/>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*<Content/>*/}
                                            <div className={'m-2 font-medium italic'}>Topic : công nghệ thông tin
                                            </div>
                                            <div className={'m-2'}>
                                                DUY NHẤT TẾT THIẾU NHI 👉 MUA 3 GIẢM THÊM 10%
                                                Thoải mái chơi Hè, bé thêm niềm vui 💥 Chương trình đặc biệt mừng
                                                Quốc Tế
                                                Thiếu Nhi 👉 𝐌𝐮𝐚 𝐭𝐮̛̀ 𝟑 𝐬𝐚̉𝐧 𝐩𝐡𝐚̂̉𝐦 𝐠𝐢𝐚̉𝐦 𝐭𝐡𝐞̂𝐦 𝟏𝟎% 𝐭𝐫𝐞̂𝐧 𝐭𝐨̂̉𝐧𝐠
                                                𝐡𝐨́𝐚 đ𝐨̛𝐧
                                                (*)
                                                💸Ba mẹ ơiii, không phải đau ví mà bé lại vui nè, còn chờ gì nữa 🏃
                                            </div>

                                            <div className={'m-2'}>
                                                <div className={'float-right hover:underline hover:cursor-pointer'}>
                                                    12 share
                                                </div>
                                                <div
                                                    className={'float-right mr-2 hover:underline hover:cursor-pointer'}>
                                                    <span>1,2k comment</span>
                                                </div>
                                                <div className={'flex'}>
                                                    <div>
                                                        <Avatar.Group>
                                                            <Avatar className={'mr-1 hover:cursor-pointer'}
                                                                    size={20}
                                                                    src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%2318AFFF'/%3e%3cstop offset='100%25' stop-color='%230062DF'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 00-8 8 8 8 0 1016 0 8 8 0 00-8-8z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z'/%3e%3c/g%3e%3c/svg%3e"/>
                                                            <Avatar className={'mr-1 hover:cursor-pointer'}
                                                                    size={20}
                                                                    src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%23FF6680'/%3e%3cstop offset='100%25' stop-color='%23E61739'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0.710144928 0 0 0 0 0 0 0 0 0 0.117780134 0 0 0 0.349786932 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 100 16A8 8 0 008 0z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M10.473 4C8.275 4 8 5.824 8 5.824S7.726 4 5.528 4c-2.114 0-2.73 2.222-2.472 3.41C3.736 10.55 8 12.75 8 12.75s4.265-2.2 4.945-5.34c.257-1.188-.36-3.41-2.472-3.41'/%3e%3c/g%3e%3c/svg%3e"/>
                                                            <Avatar className={'hover:cursor-pointer'} size={20}
                                                                    src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='10.25%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%23FEEA70'/%3e%3cstop offset='100%25' stop-color='%23F69B30'/%3e%3c/linearGradient%3e%3clinearGradient id='d' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%23472315'/%3e%3cstop offset='100%25' stop-color='%238B3A0E'/%3e%3c/linearGradient%3e%3clinearGradient id='e' x1='50%25' x2='50%25' y1='0%25' y2='81.902%25'%3e%3cstop offset='0%25' stop-color='%23FC607C'/%3e%3cstop offset='100%25' stop-color='%23D91F3A'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0.921365489 0 0 0 0 0.460682745 0 0 0 0 0 0 0 0 0.35 0'/%3e%3c/filter%3e%3cpath id='b' d='M16 8A8 8 0 110 8a8 8 0 0116 0'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='url(%23d)' d='M3 8.008C3 10.023 4.006 14 8 14c3.993 0 5-3.977 5-5.992C13 7.849 11.39 7 8 7c-3.39 0-5 .849-5 1.008'/%3e%3cpath fill='url(%23e)' d='M4.541 12.5c.804.995 1.907 1.5 3.469 1.5 1.563 0 2.655-.505 3.459-1.5-.551-.588-1.599-1.5-3.459-1.5s-2.917.912-3.469 1.5'/%3e%3cpath fill='%232A3755' d='M6.213 4.144c.263.188.502.455.41.788-.071.254-.194.369-.422.371-.78.011-1.708.255-2.506.612-.065.029-.197.088-.332.085-.124-.003-.251-.058-.327-.237-.067-.157-.073-.388.276-.598.545-.33 1.257-.48 1.909-.604a7.077 7.077 0 00-1.315-.768c-.427-.194-.38-.457-.323-.6.127-.317.609-.196 1.078.026a9 9 0 011.552.925zm3.577 0a8.953 8.953 0 011.55-.925c.47-.222.95-.343 1.078-.026.057.143.104.406-.323.6a7.029 7.029 0 00-1.313.768c.65.123 1.363.274 1.907.604.349.21.342.44.276.598-.077.18-.203.234-.327.237-.135.003-.267-.056-.332-.085-.797-.357-1.725-.6-2.504-.612-.228-.002-.351-.117-.422-.37-.091-.333.147-.6.41-.788z'/%3e%3c/g%3e%3c/svg%3e"/>
                                                        </Avatar.Group>
                                                    </div>
                                                    <div
                                                        className={'ml-1 hover:underline hover:cursor-pointer'}>3.3k
                                                    </div>
                                                </div>
                                            </div>
                                            <hr/>
                                            {/*footer*/}
                                            <div className={'flex justify-around'}>
                                                <div
                                                    className={'font-bold hover:cursor-pointer rounded-md hover:bg-gray-200 w-[33.33%] flex justify-center'}>
                                                    <div className={'p-1'}><Like fontSize={14}/></div>
                                                    <Dropdown menu={{items}} placement="top">
                                                        <div className={'text-[14px]'}>Like</div>
                                                    </Dropdown>
                                                </div>
                                                <div
                                                    className={'flex justify-center font-bold hover:cursor-pointer rounded-md hover:bg-gray-200 w-[33.33%]'}>
                                                    <div className={'p-1'}><IconComment fontSize={14}/></div>
                                                    <div className={'text-[14px]'}>Comment</div>
                                                </div>
                                                <div
                                                    className={'flex justify-center font-bold hover:cursor-pointer rounded-md hover:bg-gray-200 w-[33.33%]'}>
                                                    <div className={'p-1'}><Share fontSize={14}/></div>
                                                    <div className={'text-[14px]'}>Share</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    )
                })
                }
            </Card>
        </>
    )
};

ListPost.getLayout = function getlayout(page: ReactElement) {
    return <Admin>{page}</Admin>
}

export default ListPost;

