import {NextPageWithLayout} from "@/pages/_app";
import React, {ReactElement, useState} from "react";
import Admin from "@/component/layout/Admin";
import {RcFile} from "antd/es/upload";
import {Breadcrumb, Form, message, Modal, Upload} from "antd";
import {useRouter} from "next/router";
import {UploadFile} from "antd/es/upload/interface";
import Link from "next/link";
import InputCustom from "@/component/InputCustom";
import DatetimePicker from "@/component/DatetimePicker";
import InputNumberCustom from "@/component/InputNumberCustom";
import {PlusCircleOutlined} from "@ant-design/icons";
import Image from "next/image";
import ButtonSubmit from "@/component/button/ButtonSubmit";
import LinkCustom from "@/component/LinkCustom";
import dayjs from "dayjs";
import axios from "axios";
import {validateMessages} from "@/constant/constant"
import {AppStorage} from "@/auth/AppStorage";

type image = String | Blob;

type Student = {
    image: image;
    name: string;
    dob: Date;
    telephone: string;
    email: string;
    province: string;
    district: string;
    wards: string;
    apartmentNumber: number;
}
const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
const CreateStudent: NextPageWithLayout = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");

    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
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
    const {getToken} = AppStorage();
    const onFinish = (data: any) => {
        data.dob = dayjs(data.dob).format('YYYY-MM-DD');
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });

        axios
            .post(`http://localhost:8083/api/v1/admin/student/create`, formData,{
                headers : {
                    Authorization : "Bearer "+getToken(),
                    "Content-Type": "multipart/form-data",
                }
            })
            .then(() => {
                // console.log(res.data)
                message.success("Create course successfully").then();
                router.push("/admin/student").then();
            }).catch((err) => {
            message.error(err.response.data).then();
        });
    }

    // const validateMessages = {
    //     required: '${label} is required!',
    //     types: {
    //         email: '${label} is not a valid email!',
    //         number: '${label} is not a valid number!',
    //     },
    //     number: {
    //         range: '${label} must be between ${min} and ${max}',
    //     },
    //     max: '${label} must be exceeded ${max} characters',
    //     min: '${label} must be less than ${max} characters',
    //
    // };
    const rules: any = {
        rulesName: [{required: true,max: 255}],
        rulesTelephone: [
            {required: true},
            {pattern: /^(0\d{9})$/, message: 'Invalid phone number'}
        ],
        rulesEmail: [{required: true, type: 'email'}],
        rulesProvince: [{required: true}],
        rulesDistrict: [{required: true}],
        rulesWards: [{required: true}],
        apartmentNumber: [{required: true}],
        ruleImage: [
            // {
            //     validator(_, fileList) {
            //         return new Promise((resolve, reject) => {
            //             const file = fileList[0];
            //             const fileType = file.type;
            //             if (!(fileType == "image/png" || fileType == "image/jpeg" || fileType == "image/jpg")) {
            //                 reject('Only PNG/JPEG/JPG files are accepted!');
            //             }
            //             else {
            //                 if (fileList[0].size > 1024 * 1024) {
            //                     reject('File size exceeded');
            //                 } else {
            //                     resolve("Success");
            //                 }
            //             }
            //         })
            //     }
            // }
        ],
        rulesDob: [
            {type: 'object' as const, required: true, message: 'Please select time!'}
        ]
    }
    return (
        <>
            <Breadcrumb
                items={[
                    {
                        title: <Link href={"/admin/student"}>Student</Link>
                    },
                    {
                        title: "Create student",
                    },
                ]}
            />
            <div className={'text-[24px] font-bold mb-4'}>Create student</div>
            <Form
                {...formItemLayout}
                form={form}
                name="create student"
                onFinish={onFinish}
                initialValues={{remember: true}}
                style={{maxWidth: 800}}
                scrollToFirstError
                validateMessages={validateMessages}
            >
                {/*Image*/}
                <Form.Item
                    label={"Image"} name={"image"}
                    valuePropName="fileList"
                    getValueFromEvent={(event) => {
                        return event?.fileList;
                    }}
                    rules={rules.ruleImage}
                    // initialValue={[
                    //     {uid : '-1', name : 'hinh-anh-ve-tinh-yeu (1).jpg',url : '/img/love-wallpaper-38.jpg'}
                    // ]}
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
                    <Image alt="example" style={{width: '100%'}} width={1000} height={1000} src={previewImage}/>
                </Modal>
                {/*Name*/}
                <InputCustom
                    name={"name"}
                    label={"Name"}
                    placeholder={"Name"}
                    allowClear={true}
                    rules={rules.rulesName}
                    type={'text'}
                />
                {/*Time*/}
                <DatetimePicker rules={rules.rulesDob} name={"dob"} label={"Date of birthday"} format={"YYYY-MM-DD"}/>
                {/*Introduce*/}
                <InputCustom
                    name={"telephone"}
                    label={"Telephone"}
                    placeholder={"Telephone"}
                    allowClear={true}
                    rules={rules.rulesTelephone}
                    type={'text'}
                />
                {/*Email*/}
                <InputCustom
                    name={"email"}
                    label={"Email"}
                    placeholder={"Email"}
                    rules={rules.rulesEmail}
                    type={'text'}
                    maxLength={100}
                />
                {/*province*/}
                <InputCustom
                    name={"province"}
                    label={"Province"}
                    rules={rules.rulesProvince}
                    placeholder={"Province"}
                />
                {/*district*/}
                <InputCustom
                    name={"district"}
                    label={"District"}
                    placeholder={"District"}
                    rules={rules.rulesDistrict}
                />
                <InputCustom
                    name={"wards"}
                    label={"Wards"}
                    placeholder={"wards"}
                    rules={rules.rulesWards}
                />
                <InputNumberCustom
                    name={'apartmentNumber'}
                    label={'Apartment number'}
                    className={'w-full'}
                    rules={rules.apartmentNumber}
                    placeholder={'Apartment number'}
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

CreateStudent.getLayout = function getlayout(page: ReactElement) {
    return <Admin>{page}</Admin>
}

export default CreateStudent;

