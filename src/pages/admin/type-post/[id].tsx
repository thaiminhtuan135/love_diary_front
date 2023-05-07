import React, {ReactElement, useEffect} from "react";
import Admin from "@/component/layout/Admin";
import {Breadcrumb, Form, message} from "antd";
import {useRouter} from "next/router";
import axios from "axios";
import {AppStorage} from "@/auth/AppStorage";
import Link from "next/link";
import InputCustom from "@/component/InputCustom";
import ButtonSubmit from "@/component/button/ButtonSubmit";
import LinkCustom from "@/component/LinkCustom";

interface TypePost {
    id: number;
    name: string,
    topic: Array<any>
}

function TypePostDetail() {
    const [form] = Form.useForm();
    const route = useRouter();
    const {getToken} = AppStorage();
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
    useEffect(() => {
        const {id} = route.query;
        if (!route.isReady) return;
        axios
            .get(`http://localhost:8083/api/v1/admin/type-post/${id}`, {
                    headers: {
                        Authorization: "Bearer " + getToken(),
                    }
                }
            )
            .then((res) => {
                const typePost: TypePost = res.data
                form.setFieldsValue({id: typePost.id});
                form.setFieldsValue({name: typePost.name});
            }).catch(() => {
        });
    }, [route.isReady]);
    const onFinish = (data: TypePost) => {
        axios
            .put(`http://localhost:8083/api/v1/admin/type-post/${data.id}/edit`, data, {
                headers: {
                    Authorization: "Bearer " + getToken(),
                }
            })
            .then((res) => {
                message.success("Edit successfully");
                route.push("/admin/type-post")
            }).catch(() => {
        });
    };

    const rules = {
        name: [
            {required: true, message: 'Please input name'}
        ]
    }
    return (
        <>
            <Breadcrumb
                items={[
                    {
                        title: <Link href={"/admin/type-post"}>Post</Link>
                    },
                    {
                        title: "Edit type post",
                    },
                ]}
            />
            <div className={'text-[24px] font-bold mb-4'}>Edit type post</div>
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
                    rules={rules.name}
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
}

TypePostDetail.getLayout = function getlayout(page: ReactElement) {
    return <Admin>{page}</Admin>
}

export default TypePostDetail;