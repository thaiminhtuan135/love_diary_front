import {useRouter} from "next/router";
import React, {ReactElement, useEffect} from "react";
import Link from "next/link";
import {Breadcrumb, Form, Image, Select} from "antd";
import InputCustom from "@/component/InputCustom";
import DatetimePicker from "@/component/DatetimePicker";
import InputNumberCustom from "@/component/InputNumberCustom";
import UploadImage from "@/component/UploadImage";
import SelectCustom from "@/component/SelectCustom";
import ButtonSubmit from "@/component/button/ButtonSubmit";
import LinkCustom from "@/component/LinkCustom";
import dayjs from "dayjs";
import Admin from "@/component/layout/Admin";

type image = String | Blob;

type Course = {
    id: number;
    name: String;
    time: Date;
    introduce: String;
    content: String;
    price: number;
    amount_students: number;
    amount_subject: number;
    image: image;
    typeCourse: number;
}

function CourseDetail() {
    const [form] = Form.useForm();
    const {Option} = Select;
    const route = useRouter();
    useEffect(() => {
        const {id} = route.query;

        form.setFieldsValue({id: 1});
        form.setFieldsValue({name: 'backend'});
        form.setFieldsValue({time: dayjs('2000-02-02', 'YYYY-MM-DD')});
        form.setFieldsValue({introduce: 'gioi thieu'});
        form.setFieldsValue({content: 'noi dung'});
        form.setFieldsValue({price: 123});
        form.setFieldsValue({amount_students: 123});
        form.setFieldsValue({amount_subject: 123});
        form.setFieldsValue({typeCourse: 2});
        console.log(id)
    }, []);
    const onFinish = (data: Course) => {
        // console.log(data)
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
    const getOption = (
        <>
            {typeCourse.map((e) => (
                <Option key={e.id} value={e.id}>{e.value}</Option>
            ))}
        </>
    );
    const suffixSelector = (
        <Form.Item name="suffix" noStyle>
            <Select style={{width: 70}}>
                <Option value="USD">$</Option>
                <Option value="VND">VND</Option>
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
                    name={"amount_students"}
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
                <UploadImage
                    name={"image"}
                    rules={rules.ruleImage}
                    label={"Image"}
                    valuePropName={'fileList'}
                    maxCount={1}
                />
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
            {/*<Image*/}
            {/*    width={200}*/}
            {/*    src="/img/anh-dep-tinh-yeu-001.jpg"*/}
            {/*/>*/}
        </>
    )
};

CourseDetail.getLayout = function getlayout(page: ReactElement) {
    return <Admin>{page}</Admin>
}

export default CourseDetail;
