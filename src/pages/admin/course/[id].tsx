import {useRouter} from "next/router";
import React, {ReactElement, useEffect, useState} from "react";
import Link from "next/link";
import {Breadcrumb, Form, message, Modal, Select, Upload} from "antd";
import InputCustom from "@/component/InputCustom";
import DatetimePicker from "@/component/DatetimePicker";
import InputNumberCustom from "@/component/InputNumberCustom";
import SelectCustom from "@/component/SelectCustom";
import ButtonSubmit from "@/component/button/ButtonSubmit";
import LinkCustom from "@/component/LinkCustom";
import dayjs from "dayjs";
import Admin from "@/component/layout/Admin";
import axios from "axios";
import moment from "moment";
import {RcFile} from "antd/es/upload";
import {UploadFile} from "antd/es/upload/interface";
import {PlusCircleOutlined} from "@ant-design/icons";
import Image from "next/image";

type image = String | Blob;

type Course = {
    id: number;
    name: String;
    time: Date;
    introduce: String;
    content: String;
    price: number;
    amount_student: number;
    amount_subject: number;
    image: image;
    typeCourse_id: number;
}
const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

function CourseDetail() {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [urlImage, setUrlImage] = useState<string>("");
    const handleCancel = () => setPreviewOpen(false);
    const [form] = Form.useForm();
    const {Option} = Select;
    const route = useRouter();
    const [typeCourse, setTypeCourse] = useState<any>([]);
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };
    const getTypeCourses = async () => {
        await axios
            .get('http://localhost:8083/api/v1/admin/type-course/list')
            .then((res) => {
                setTypeCourse(res.data)
            }).catch((err) => console.log(err));
    }
    const getCourse = async (id : any) => {
        axios
            .get(`http://localhost:8083/api/v1/admin/course/${id}`)
            .then((res) => {
                const course: Course = res.data
                console.log(course)
                form.setFieldsValue({id: course.id});
                form.setFieldsValue({name: course.name});
                form.setFieldsValue({time: dayjs(course.time)});
                form.setFieldsValue({introduce: course.introduce});
                form.setFieldsValue({content: course.content});
                form.setFieldsValue({price: course.price});
                form.setFieldsValue({amount_student: course.amount_student});
                form.setFieldsValue({amount_subject: course.amount_subject});
                // form.setFieldsValue({image: "http://localhost:8083/images/"+res.data.image.split("\\")[1]});
                // setUrlImage("http://localhost:8083/images/"+res.data.image.split("\\")[1]);
                // console.log(urlImage);
                // http://localhost:8083/images/-2026203994.4e16211e-5f6b-4346-b1ab-d569e250ca09avt2.jpg
                form.setFieldsValue({typeCourse_id: course.typeCourse_id});
            }).catch(() => {
        });
    }
    useEffect(() => {
        const {id} = route.query;
        if (!route.isReady) return;
        getTypeCourses();
        getCourse(id);
    }, [route.isReady]);

    const onFinish = (data: any) => {
        data.time = dayjs(data.time).format('YYYY-MM-DD');
        const formData = new FormData();
        formData.append('name', data.name)
        formData.append('time', data.time)
        formData.append('introduce', data.introduce)
        formData.append('content', data.content)
        formData.append('price', data.price)
        formData.append('amount_student', data.amount_student)
        formData.append('amount_subject', data.amount_subject)
        // formData.append('image', data.image[0].originFileObj)
        formData.append('typeCourse_id', data.typeCourse_id)

        axios
            .put(`http://localhost:8083/api/v1/admin/course/${data.id}/edit/type-course/${data.typeCourse_id}`, formData)
            .then((res) => {
                message.success("Edit successfully");
                route.push("/admin/course")
            }).catch(() => {
        });
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

    const getOption = (
        <>
            {typeCourse.map((e : any) => (
                <Option key={e.id} value={e.id}>{e.name}</Option>
            ))}
        </>
    );
    const suffixSelector = (
        <Form.Item noStyle>
            <Select style={{width: 70}}>
                <Option value="USD">$</Option>
                <Option value="VND">₫</Option>
            </Select>
        </Form.Item>
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
            {required: true, message: 'Please input number student!'},
            {
                validator : async (_:any,value : number) => {
                    if (value > 50) {
                        return Promise.reject(new Error("The number of students must be less than 50"))
                    }
                    if (value < 20 ) {
                        return Promise.reject(new Error("The number of students must be more than 20"))
                    }
                }
            }
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
            // {
            //     required: true, message: "Please upload your an image!",
            // },
            // {
            //     validator(_ : any, fileList : any) {
            //         return new Promise((resolve, reject) => {
            //             const file = fileList[0];
            //             const fileType = file.type;
            //             if (!(fileType == "image/png" || fileType == "image/jpeg" || fileType == "image/jpg")) {
            //                 reject('Only PNG/JPEG/JPG files are accepted!');
            //             } else {
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
                        title: "Edit course",
                    },
                ]}
            />
            <div className={'text-[24px] font-bold mb-4'}>Edit course</div>
            <Form
                {...formItemLayout}
                form={form}
                name="update"
                onFinish={onFinish}
                initialValues={{remember: true}}
                style={{maxWidth: 800}}
                scrollToFirstError
            >
                {/*id*/}
                <InputCustom
                    name={"id"}
                    type={'text'}
                    className={'hidden'}
                />
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
                <DatetimePicker
                    rules={rules.rulesTime}
                    name={"time"}
                    label={"Time study"}
                    format={"YYYY-MM-DD"}
                />
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
                <Form.Item
                    label={"image"} name={"image"}
                    valuePropName="fileList"
                    getValueFromEvent={(event) => {
                        return event?.fileList;
                    }}
                    rules={rules.ruleImage}
                    // initialValue={[
                    //     {uid : '-1215455', name : 'hey be',url : urlImage}
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
                {/*type*/}
                <SelectCustom
                    name={"typeCourse_id"}
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
}

CourseDetail.getLayout = function getlayout(page: ReactElement) {
    return <Admin>{page}</Admin>
}

export default CourseDetail;
