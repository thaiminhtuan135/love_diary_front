import React, {ReactElement, useEffect, useState} from "react";
import Admin from "@/component/layout/Admin";
import {Breadcrumb, Form, message, Modal, Upload} from "antd";
import {useRouter} from "next/router";
import axios from "axios";
import Link from "next/link";
import InputCustom from "@/component/InputCustom";
import DatetimePicker from "@/component/DatetimePicker";
import InputNumberCustom from "@/component/InputNumberCustom";
import {PlusCircleOutlined} from "@ant-design/icons";
import Image from "next/image";
import ButtonSubmit from "@/component/button/ButtonSubmit";
import LinkCustom from "@/component/LinkCustom";
import {validateMessages} from "@/constant/constant";
import {UploadFile} from "antd/es/upload/interface";
import {RcFile} from "antd/es/upload";
import dayjs from "dayjs";

interface Student {
    id: number;
    name: string;
    dob: Date;
    telephone: string;
    email : string
    province: string;
    district: string;
    wards: string;
    apartmentNumber: number;
    register : Array<any>
}

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
function StudentDetail() {
    const [form] = Form.useForm();
    const route = useRouter();
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
    const getStudent = async (id : any) => {
        axios
            .get(`http://localhost:8083/api/v1/admin/student/${id}`)
            .then((res) => {
                const student: Student = res.data
                console.log(student)
                form.setFieldsValue({id: student.id});
                form.setFieldsValue({name: student.name});
                form.setFieldsValue({dob: dayjs(student.dob)});
                form.setFieldsValue({telephone: student.telephone});
                form.setFieldsValue({email: student.email});
                form.setFieldsValue({province: student.province});
                form.setFieldsValue({district: student.district});
                form.setFieldsValue({wards: student.wards});
                form.setFieldsValue({apartmentNumber: student.apartmentNumber});
            }).catch(() => {
        });
    }
    useEffect(() => {
        const {id} = route.query;
        if (!route.isReady) return;
        getStudent(id).then();
    }, [route.isReady]);

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

    const onFinish = (data : any) => {
        data.dob = dayjs(data.dob).format('YYYY-MM-DD');
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });

        axios
            .put(`http://localhost:8083/api/v1/admin/student/${data.id}/edit`, formData)
            .then(() => {
                message.success("Edit successfully");
                route.push("/admin/student").then()
            }).catch((err) => {
            message.error(err.response.data).then();
        });
    }

    const rules: any = {
        name: [{required: true,max: 255}],
        dob: [
            {type: 'object' as const, required: true, message: 'Please select time!'}
        ],
        telephone: [
            {required: true},
            {pattern: /^(0\d{9})$/, message: 'Invalid phone number'}
        ],
        email: [{required: true, type: 'email'}],
        province: [{required: true}],
        district: [{required: true}],
        wards: [{required: true}],
        apartmentNumber: [{required: true}],
        image: [
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
    }

    return(
        <>
            <Breadcrumb
                items={[
                    {
                        title: <Link href={"/admin/student"}>Student</Link>
                    },
                    {
                        title: "Edit student",
                    },
                ]}
            />
            <div className={'text-[24px] font-bold mb-4'}>Edit student</div>
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
                <InputCustom
                    name={"id"}
                    type={'text'}
                    className={'hidden'}
                />
                {/*Image*/}
                <Form.Item
                    label={"Image"} name={"image"}
                    valuePropName="fileList"
                    getValueFromEvent={(event) => {
                        return event?.fileList;
                    }}
                    rules={rules.image}
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
                <DatetimePicker rules={rules.dob} name={"dob"} label={"Date of birthday"} format={"YYYY-MM-DD"}/>
                {/*Introduce*/}
                <InputCustom
                    name={"telephone"}
                    label={"Telephone"}
                    placeholder={"Telephone"}
                    allowClear={true}
                    rules={rules.telephone}
                    type={'text'}
                />
                {/*Email*/}
                <InputCustom
                    name={"email"}
                    label={"Email"}
                    placeholder={"Email"}
                    rules={rules.email}
                    type={'text'}
                    maxLength={100}
                />
                {/*province*/}
                <InputCustom
                    name={"province"}
                    label={"Province"}
                    rules={rules.province}
                    placeholder={"Province"}
                />
                {/*district*/}
                <InputCustom
                    name={"district"}
                    label={"District"}
                    placeholder={"District"}
                    rules={rules.district}
                />
                <InputCustom
                    name={"wards"}
                    label={"Wards"}
                    placeholder={"wards"}
                    rules={rules.wards}
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
}

StudentDetail.getLayout = function getlayout(page: ReactElement) {
    return <Admin>{page}</Admin>
}

export default StudentDetail;