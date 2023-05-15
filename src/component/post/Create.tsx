import React, {memo, useEffect, useState} from "react";
import {MingcuteWorld2Fill} from "@/component/icon/MingcuteWorld2Fill";
import Friend from "@/component/icon/Friend";
import Lock from "@/component/icon/Lock";
import {Avatar, Dropdown, Form, MenuProps, message, Modal, Select, Tooltip} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {Icon} from "@/component/icon/post/Icon";
import Down from "@/component/icon/Down";
import InputCustom from "@/component/InputCustom";
import PhDotsThreeOutlineFill from "@/component/icon/PhDotsThreeOutlineFill";
import {AppStorage} from "@/auth/AppStorage";
import useGetData from "@/hooks/useApi/useGetData";
import SelectCustom from "@/component/SelectCustom";
import {User} from "@/auth/User";
import axios from "axios";
import {useRouter} from "next/router";
import EmojiPicker, {
    EmojiStyle,
    SkinTones,
    Theme,
    Categories,
    EmojiClickData,
    Emoji,
    SuggestionMode,
    SkinTonePickerLocation
} from "emoji-picker-react";
import Smile from "@/component/icon/Smile";
import UploadImage from "@/component/UploadImage";
interface propData {
    loadData: () => void
}

const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'

function CreatePost(prop: propData) {
    const {getUseId} = User();
    const router = useRouter();
    const [form] = Form.useForm();
    const {Option} = Select;
    const {getToken} = AppStorage();
    const [value, setValue] = useState(1);
    const [ModalOpenPost, setModalOpenPost] = useState(false);
    const [ModalModeOpen, setModalModeOpen] = useState(false);
    const [ModalOptionOpen, setModalOptionOpen] = useState(false);
    const [input, setInput] = useState<string>("");
    const [, forceUpdate] = useState({});
    useEffect(() => {
        form.setFieldsValue({content: ""});
    },[])

    form.setFieldsValue({content : form.getFieldValue("content")+input})
    const onClick = (emojiData: EmojiClickData) => {
        setInput(emojiData.emoji)
    }
    const [checked, setChecked] = useState(1);

    const topics = useGetData('http://localhost:8083/api/v1/admin/topic/list');

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
    const onChangeModePost = (e: any) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    const showModalModePost = () => {
        setModalOpenPost(false);
        setModalModeOpen(true);
        setInput("");
    };
    const handleCancelModalModePost = () => {
        setModalModeOpen(false);
        setModalOpenPost(true);
    };
    const onFinishModePost = () => {
        setModalModeOpen(false);
        setModalOpenPost(true);
    }
    // Option post
    const showModalOptionPost = () => {
        setModalOpenPost(false);
        setModalOptionOpen(true);
        setInput("");
    };
    const handleCancelModalOptionPost = () => {
        setModalOptionOpen(false);
        setModalOpenPost(true);
    };
    const onFinishOptionPost = () => {
        setModalOptionOpen(false);
        setModalOpenPost(true);
    }
    // post
    const showModalPost = () => {
        setModalOpenPost(true);
    };
    const handleCancelModalPost = () => {
        setInput("");
        setModalOpenPost(false);
    };
    const onFinish = (data: any) => {
        const accountId = getUseId();
        const formData = new FormData();
        formData.append('content', data.content)
        formData.append('name', data.name)
        formData.append('topicId', data.topic_id)
        formData.append('accountId', accountId)
        console.log(form.getFieldValue("content"));
        if (data.shortContent != null) {
            formData.append('shortContent', data.shortContent)
        }
        axios
            .post(`http://localhost:8083/api/v1/admin/post/create`, formData, {
                headers: {
                    Authorization: "Bearer " + getToken(),
                    "Content-Type": "multipart/form-data",
                }
            })
            .then(() => {
                message.success("Create post successfully").then();
                prop.loadData();
                form.setFieldsValue({
                    name:"",
                    shortContent:"",
                    content:"",
                    topic_id: undefined,
                })
                setInput("");
                // form.setFieldsValue({shortContent:""})
                // form.setFieldsValue({content:""})
                setModalOpenPost(false);
            }).catch((r) => console.log(r));
    };
    const rules = {
        name: [
            {required: true, message: 'Please input name'}
        ],
        content: [
            {required: true, message: 'Please input content'}
        ],
        topic: [
            {required: true, message: 'Topic is required'}
        ]
    }
    const getOption = (
        <>
            {topics.map((e: any) => (
                <Option key={e.id} value={e.id}>{e.name}</Option>
            ))}
        </>
    )
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <>
                    <input value={input} className={'hidden'} onChange={(e) => setInput(e.target.value)}/>
                    <EmojiPicker
                        onEmojiClick={onClick}
                        autoFocusSearch={false}
                        searchDisabled
                    />
                </>
            ),

        },
    ];
    return (
        <>
            <div className={'flex justify-center mb-2'}>
                <div className={'w-2/3 bg-gray-100 rounded-2xl '}>
                    <div className={'mt-1 mx-2 py-2 border-b'}>
                        <div className={'flex'}>
                            <div className={'w-full flex justify-between'}>
                                <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>} size={40}/>
                                <input onClick={showModalPost} placeholder={'Are you think about ?'} type="text"
                                       className={'rounded-full h-[40px] w-[94%] p-3 hover:cursor-pointer focus:outline-none hover:bg-cyan-50'}/>
                            </div>
                        </div>
                    </div>
                    <div className={'mt-1 mx-2 py-2 border-b flex'}>
                        <div className={'flex hover:bg-gray-200 p-1 rounded-lg hover:cursor-pointer'}>
                            <Icon src={'https://static.xx.fbcdn.net/rsrc.php/v3/yF/r/v1iF2605Cb5.png'}
                                  width={20} height={20}/>
                            <span className={'p-1'}>Video</span>
                        </div>
                        <div className={'flex hover:bg-gray-200 p-1 rounded-lg hover:cursor-pointer'}>
                            <Icon src={'https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/a6OjkIIE-R0.png'}
                                  width={20} height={20}/>
                            <span className={'p-1'}>Image</span>
                        </div>
                        <div className={'flex hover:bg-gray-200 p-1 rounded-lg hover:cursor-pointer'}>
                            <Icon src={'https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Y4mYLVOhTwq.png'}
                                  width={20} height={20}/>
                            <span className={'p-1'}>Emotion</span>
                        </div>
                    </div>
                </div>
            </div>

            {/*model create*/}
            <Modal title="Create post"
                   open={ModalOpenPost}
                   onCancel={handleCancelModalPost}
                // bodyStyle={{backgroundColor : 'whitesmoke' }}
                   footer={false}
            >
                <div className={'mt-2 mx-2 py-2 border-t relative'}>
                    {/*head*/}
                    <div className={'flex mb-1'}>
                        <div>
                            <Avatar src={<img src={url} alt="avatar"/>} size={40}/>
                        </div>
                        <div className={'ml-2 w-full'}>
                            <div className={'flex w-full'}>
                                <div>
                                    <p className={'hover:underline hover:cursor-pointer'}>Minh Tuan </p>
                                    <p onClick={showModalModePost}
                                       className={'flex bg-gray-100 items-center rounded-lg hover:cursor-pointer'}>
                                        <Tooltip placement="top" title={"Public"}>
                                            <MingcuteWorld2Fill className={'ml-1'}/>
                                        </Tooltip>
                                        <span className={'ml-1'}>Public</span>
                                        <span><Down/></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Form
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        initialValues={{remember: true}}
                        style={{maxWidth: 600}}
                        scrollToFirstError
                        layout={'vertical'}
                    >
                        <div className={'max-h-[300px] overflow-auto'}>
                            <InputCustom
                                label={"Name"}
                                name={"name"}
                                placeholder={"Name"}
                                rules={rules.name}
                                type={'text'}
                                allowClear={true}
                            />
                            <SelectCustom
                                name={"topic_id"}
                                label={"Topic"}
                                placeholder={"Select a option"}
                                rules={rules.topic}
                                getOption={getOption}
                                allowClear={true}
                            />
                            <InputCustom
                                label={"Short content"}
                                name={"shortContent"}
                                placeholder={"Short content"}
                                type={'text'}
                                allowClear={true}
                            />
                            <InputCustom
                                name={"content"}
                                label={"Content"}
                                placeholder={"Content"}
                                rules={rules.content}
                                type={'textarea'}
                                maxLength={100}
                                className={'h-[100px]'}
                            />
                        </div>
                        <div className={'inline-block hover:cursor-pointer flex justify-end'}>
                            <Dropdown menu={{items}} placement="bottomLeft" trigger={['click']} arrow>
                                    <Smile className={'text-[24px] float-right hover:text-white'}/>
                            </Dropdown>
                        </div>
                        {/*<UploadImage name={"image"} valuePropName={"fileList"} maxCount={1} />*/}
                        <div className={'border p-2 flex rounded-lg justify-between items-center'}>
                            <p onClick={showModalOptionPost} className={'hover:cursor-pointer'}>Thêm vào bài
                                viết của bạn</p>
                            <div className={'flex'}>
                                <Icon src={'https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/a6OjkIIE-R0.png'}
                                      width={20} height={20}/>
                                <Icon src={'https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/b37mHA1PjfK.png'}
                                      width={20} height={20}/>
                                <Icon src={'https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Y4mYLVOhTwq.png'}
                                      width={20} height={20}/>
                                <Icon src={'https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/8zlaieBcZ72.png'}
                                      width={20} height={20}/>
                                <Icon src={'https://static.xx.fbcdn.net/rsrc.php/v3/yT/r/q7MiRkL7MLC.png'}
                                      width={20} height={20}/>
                                <div onClick={showModalOptionPost}
                                     className={'hover:bg-gray-100 hover:cursor-pointer p-1.5 rounded-full'}>
                                    <i><PhDotsThreeOutlineFill fontSize={20}/></i>
                                </div>
                            </div>
                        </div>
                        <Form.Item shouldUpdate>
                            {() => (
                                <button
                                    className={`w-full mt-2 bg-blue-500 hover:text-white hover:bg-blue-400 rounded-lg p-1
                                     ${ !form.isFieldsTouched(true) ||
                                    !!form.getFieldsError().filter(({ errors }) => errors.length).length ? 'cursor-not-allowed' : ''}`}
                                    key="back"
                                    type={"submit"}
                                    disabled={
                                        !form.isFieldsTouched(true) ||
                                        !!form.getFieldsError().filter(({ errors }) => errors.length).length
                                    }
                                >
                                    Post
                                </button>
                            )}
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
            {/*model mode post*/}
            <Modal title="Mode post"
                   open={ModalModeOpen}
                // onOk={onFinishModePost}
                   onCancel={handleCancelModalModePost}
                   footer={false}
            >
                <div className={'mt-2 py-4 border-t'}>
                    {modePost.map((a) => (
                        <div key={a.id} onClick={() => setChecked(a.id)}
                             className={'hover:bg-gray-200 rounded-lg hover:cursor-pointer'}>
                            <div className={'flex mb-2 p-1'}>
                                <div className={'bg-gray-300 p-3 rounded-full'}>
                                    {a.icon}
                                </div>
                                <div className={'w-[80%] ml-3'}>
                                    <p>Public</p>
                                    <p>{a.title}</p>
                                </div>
                                <div className={'p-4'}>
                                    <input
                                        type="radio"
                                        name={"mode_post"}
                                        checked={checked === a.id}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button onClick={handleCancelModalModePost}
                            className={'ml-2 float-right bg-blue-500 hover:text-white hover:bg-blue-400 rounded-lg p-1 px-2'}>
                        Done
                    </button>
                    <button onClick={handleCancelModalModePost}
                            className={'float-right bg-red-300 hover:bg-red-200 rounded-lg p-1 px-2'}>
                        Cancel
                    </button>
                </div>
            </Modal>

            {/*modal add action post*/}
            <Modal title="Add action post" open={ModalOptionOpen}
                   onCancel={handleCancelModalOptionPost}
                   width={'400px'}
                   footer={false}
            >
                <div className={'flex w-full mt-1'}>
                    <div className={'w-[50%] flex hover:bg-gray-200 hover:cursor-pointer rounded-lg'}>
                        <Icon src={'https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/a6OjkIIE-R0.png'} width={20}
                              height={20}/>
                        <p className={'item-center p-1'}>Image</p>
                    </div>
                    <div className={'w-[50%] flex hover:bg-gray-200 hover:cursor-pointer rounded-lg'}>
                        <Icon src={'https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/b37mHA1PjfK.png'} width={20}
                              height={20}/>
                        <p className={'item-center p-1'}>Tag person</p>
                    </div>
                </div>
                <div className={'flex w-full mt-1'}>
                    <div className={'w-[50%] flex hover:bg-gray-200 hover:cursor-pointer rounded-lg'}>
                        <Icon src={'https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Y4mYLVOhTwq.png'} width={20}
                              height={20}/>
                        <p className={'item-center p-1'}>Emotion</p>
                    </div>
                    <div className={'w-[50%] flex hover:bg-gray-200 hover:cursor-pointer rounded-lg'}>
                        <Icon src={'https://static.xx.fbcdn.net/rsrc.php/v3/y1/r/8zlaieBcZ72.png'} width={20}
                              height={20}/>
                        <p className={'item-center p-1'}>Check in</p>
                    </div>
                </div>
                <div className={'flex w-full mt-1'}>
                    <div className={'w-[50%] flex hover:bg-gray-200 hover:cursor-pointer rounded-lg'}>
                        <Icon src={'https://static.xx.fbcdn.net/rsrc.php/v3/yT/r/q7MiRkL7MLC.png'} width={20}
                              height={20}/>
                        <p className={'item-center p-1'}>File GIF</p>
                    </div>
                    <div className={'w-[50%] flex hover:bg-gray-200 hover:cursor-pointer rounded-lg'}>
                        <Icon src={'https://static.xx.fbcdn.net/rsrc.php/v3/yF/r/v1iF2605Cb5.png'} width={20}
                              height={20}/>
                        <p className={'item-center p-1'}>Video</p>
                    </div>
                </div>
                <div className={'flex w-full mt-1'}>
                    <div className={'w-[50%] flex hover:bg-gray-200 hover:cursor-pointer rounded-lg'}>
                        <Icon src={'https://static.xx.fbcdn.net/rsrc.php/v3/yY/r/CenxFlWjtJO.png'} width={20}
                              height={20}/>
                        <p className={'item-center p-1'}>Life event</p>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default memo(CreatePost)