import {useRouter} from "next/router";
import React, {ReactElement, useEffect, useState} from "react";
import Link from "next/link";
import {Breadcrumb, Form, message} from "antd";
import InputCustom from "@/component/InputCustom";
import ButtonSubmit from "@/component/button/ButtonSubmit";
import LinkCustom from "@/component/LinkCustom";
import Admin from "@/component/layout/Admin";
import axios from "axios";
import {AppStorage} from "@/auth/AppStorage";

interface typeCourse {
    id: number;
    name: string,
    courses: Array<any>
}

function TypeCourseDetail() {
    const [form] = Form.useForm();
    const route = useRouter();

    useEffect(() => {
        const {id} = route.query;
        if (!route.isReady) return;
        axios
            .get(`http://localhost:8083/api/v1/admin/type-course/${id}`, {
                    headers: {
                        Authorization: "Bearer " + getToken(),
                    }
                }
            )
            .then((res) => {
                const typeCourse: typeCourse = res.data
                form.setFieldsValue({id: typeCourse.id});
                form.setFieldsValue({name: typeCourse.name});
            }).catch(() => {
        });
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
    const {getToken} = AppStorage();
    const onFinish = (data: typeCourse) => {
        axios
            .put(`http://localhost:8083/api/v1/admin/type-course/${data.id}/edit`, data, {
                headers: {
                    Authorization: "Bearer " + getToken(),
                }
            })
            .then((res) => {
                message.success("Edit successfully");
                route.push("/admin/type-course")
            }).catch(() => {
        });
        console.log(data)
    };

    const rules = {
        ruleType: [
            {required: true, message: 'Please input name'}
        ]
    }
    return (
        <>
            <Breadcrumb
                items={[
                    {
                        title: <Link href={"/admin/type-course"}>Course</Link>
                    },
                    {
                        title: "Edit type course",
                    },
                ]}
            />
            <div className={'text-[24px] font-bold mb-4'}>Edit type course</div>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{remember: true}}
                style={{maxWidth: 800}}
                scrollToFirstError
            >
                <InputCustom
                    name={"id"}
                    allowClear={true}
                    type={'text'}
                    className={'hidden'}
                />

                <InputCustom
                    name={"name"}
                    label={"Name type course"}
                    placeholder={"Name type course"}
                    allowClear={true}
                    rules={rules.ruleType}
                    type={'text'}
                />
                <Form.Item wrapperCol={{offset: 12, span: 24}}>
                    <ButtonSubmit/>
                    <LinkCustom
                        href={"/admin/type-course"}
                        className={"text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"}
                        text={"Back"}/>
                </Form.Item>
            </Form>
        </>
    )
};

TypeCourseDetail.getLayout = function getlayout(page: ReactElement) {
    return <Admin>{page}</Admin>
}

export default TypeCourseDetail;
