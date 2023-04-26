import {NextPageWithLayout} from "@/pages/_app";
import React, {ReactElement, useEffect, useState} from "react";
import {message, Form, Select, Breadcrumb, Upload, Modal} from 'antd';
import axios from "axios";
import ButtonSubmit from "@/component/button/ButtonSubmit";
import Link from "next/link";
import LinkCustom from "@/component/LinkCustom";
import InputCustom from "@/component/InputCustom";
import InputNumberCustom from "@/component/InputNumberCustom";
import SelectCustom from "@/component/SelectCustom";
import DatetimePicker from "@/component/DatetimePicker";
import dayjs from "dayjs";
import {PlusCircleOutlined} from "@ant-design/icons";
import {RcFile} from "antd/es/upload";
import {UploadFile} from "antd/es/upload/interface";
import Admin from "@/component/layout/Admin";

type image = String | Blob;

type Course = {
    name: String;
    time: Date;
    introduce: String;
    content: String;
    price: number;
    amount_student: number;
    amount_subject: number;
    // image: image;
    typeCourse: number;
}

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const CreateCourse: NextPageWithLayout = () => {

    const [form] = Form.useForm();
    const {Option} = Select;

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        console.log(file)
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };
    useEffect(() => {
        console.log('init')
        form.setFieldsValue({name: 'Hi, man!'});
    }, []);

    const onFinish = (data: Course) => {
        // console.log(data)
        // data.time = new Date(data.time);
        data.time = dayjs(data.time).format('YYYY-MM-DD');
        console.log(data)

    };

    const formItemLayout = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 8},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 16},
        },
    };

    const typeCourse = [
        {id: 1, value: "Làm giàu"},
        {id: 2, value: "Backend"},
        {id: 3, value: "Frontend"},
        {id: 4, value: "Fullstack"},
    ]

    const suffixSelector = (
        <Form.Item noStyle>
            <Select style={{width: 70}}>
                <Option value="USD">$</Option>
                <Option value="VND">VND</Option>
            </Select>
        </Form.Item>
    );

    const getOption = (
        <>
            {typeCourse.map((e) => (
                <Option key={e.id} value={e.id}>{e.value}</Option>
            ))}
        </>
    );
    const rules = {
        rulesName: [
            {required: true, message: 'Please input name course!'},
            {max: 255, message: "Don't input exceeded 255 characters"}
        ],
        rulesIntroduce: [
            {required: true, message: 'Introduce course is required'}
        ],
        rulesContent: [
            {required: true, message: 'Please input content'}
        ],
        rulesPrice: [
            {required: true, message: 'Please input price!'}
        ],
        rulesAmountStudent: [
            {required: true, message: 'Please input number student!'}
        ],
        rulesAmountSubject: [
            {
                required: true, message: 'Please input number of subject!'
            }
        ],
        rulesTypeCourse: [
            {required: true, message: "Please select gender"}
        ],
        ruleImage: [
            {
                required: true, message: "Please upload your an image!",
            },
            {
                validator(_, fileList) {
                    return new Promise((resolve, reject) => {
                        const file = fileList[0];
                        const fileType = file.type;
                        if (!(fileType == "image/png" || fileType == "image/jpeg" || fileType == "image/jpg")) {
                            reject('Only PNG/JPEG/JPG files are accepted!');
                        } else {
                            if (fileList[0].size > 1024 * 1024) {
                                reject('File size exceeded');
                            } else {
                                resolve("Success");
                            }
                        }
                    })
                }
            }
        ],
        rulesTime: [
            {type: 'object' as const, required: true, message: 'Please select time!'}
        ]
    }
    return (
        <>
            <Breadcrumb
                items={[
                    {
                        title: <Link href={"/admin/course"}>Course</Link>
                    },
                    {
                        title: "Create course",
                    },
                ]}
            />
            <div className={'text-[24px] font-bold mb-4'}>Create course</div>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{remember: true}}
                style={{maxWidth: 800}}
                scrollToFirstError
            >
                {/*Name*/}
                <InputCustom
                    name={"name"}
                    label={"Name course"}
                    placeholder={"Course"}
                    allowClear={true}
                    rules={rules.rulesName}
                    type={'text'}
                />
                {/*Time*/}
                {/*<Form.Item name="time" label="Time Study" {...config}>*/}
                {/*    <DatePicker format="YYYY-MM-DD"/>*/}
                {/*</Form.Item>*/}
                <DatetimePicker rules={rules.rulesTime} name={"time"} label={"Time study"} format={"YYYY-MM-DD"}/>
                {/*Introduce*/}
                <InputCustom
                    name={"introduce"}
                    label={"Introduce"}
                    placeholder={"Introduce"}
                    allowClear={true}
                    rules={rules.rulesIntroduce}
                    type={'text'}
                />
                {/*Content*/}
                <InputCustom
                    name={"content"}
                    label={"Content"}
                    placeholder={"Content"}
                    rules={rules.rulesContent}
                    type={'textarea'}
                    maxLength={100}
                />
                {/*Price*/}
                <InputNumberCustom
                    name={"price"}
                    label={"Price"}
                    placeholder={"Price"}
                    className={'w-full'}
                    rules={rules.rulesPrice}
                    suffixSelector={suffixSelector}
                />
                {/*Number of student*/}
                <InputNumberCustom
                    name={"amount_student"}
                    label={"Number of student"}
                    className={'w-full'}
                    rules={rules.rulesAmountStudent}
                    placeholder={"Number of student"}
                />
                {/*Number of subjects*/}
                <InputNumberCustom
                    name={"amount_subject"}
                    label={"Number of subjects"}
                    className={'w-full'}
                    placeholder={"Number of subjects"}
                    rules={rules.rulesAmountSubject}

                />
                {/*Image*/}
                {/*<UploadImage*/}
                {/*    name={"image"}*/}
                {/*    rules={rules.ruleImage}*/}
                {/*    label={"Image"}*/}
                {/*    valuePropName={'fileList'}*/}
                {/*    maxCount={1}*/}
                {/*/>*/}


                <Form.Item
                    label={"image"} name={"image"}
                    valuePropName="fileList"
                    getValueFromEvent={(event) => {
                        return event?.fileList;
                    }}
                    rules={rules.ruleImage}
                    initialValue={[
                        {uid : '-1', name : 'hinh-anh-ve-tinh-yeu (1).jpg',url : '/img/love-wallpaper-38.jpg'}
                    ]}
                >
                    <Upload
                        accept="image/png,image/jpeg"
                        listType="picture-card"
                        maxCount={1}
                        onPreview={handlePreview}
                    >
                        <div>
                            <PlusCircleOutlined/>
                            <div>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>

                {/*type*/}
                <SelectCustom
                    name={"typeCourse"}
                    label={"Type Course"}
                    placeholder={"Select a option"}
                    rules={rules.rulesTypeCourse}
                    getOption={getOption}
                    allowClear={true}
                />

                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <div className={'mx-auto text-center'}>
                        <ButtonSubmit/>
                        <LinkCustom
                            href={"/admin/course"}
                            className={"text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"}
                            text={"Back"}/>
                    </div>
                </Form.Item>
            </Form>
        </>
    )
};

CreateCourse.getLayout = function getlayout(page: ReactElement) {
    return <Admin>{page}</Admin>
}

export default CreateCourse;
