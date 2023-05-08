import React, {ReactElement, useEffect} from "react";
import Admin from "@/component/layout/Admin";
import {Breadcrumb, Form, message, Select} from "antd";
import {useRouter} from "next/router";
import {AppStorage} from "@/auth/AppStorage";
import axios from "axios";
import useGetData from "@/hooks/useApi/useGetData";
import InputCustom from "@/component/InputCustom";
import SelectCustom from "@/component/SelectCustom";
import ButtonSubmit from "@/component/button/ButtonSubmit";
import LinkCustom from "@/component/LinkCustom";
import Link from "next/link";

function TopicDetail() {
    const {Option} = Select;
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
            .get(`http://localhost:8083/api/v1/admin/topic/${id}`, {
                    headers: {
                        Authorization: "Bearer " + getToken(),
                    }
                }
            )
            .then((res) => {
                const topic: any = res.data
                console.log(topic)
                form.setFieldsValue({id: topic.id});
                form.setFieldsValue({content: topic.content});
                form.setFieldsValue({name: topic.name});
                form.setFieldsValue({typePost_id: topic.typePost_id});
            }).catch(() => {
        });
    }, [route.isReady]);
    const onFinish = (data: any) => {
        axios
            .put(`http://localhost:8083/api/v1/admin/topic/${data.id}/edit/type-post/${data.typePost_id}`, data, {
                headers: {
                    Authorization: "Bearer " + getToken(),
                }
            })
            .then((res) => {
                message.success("Edit successfully");
                route.push("/admin/topic")
            }).catch(() => {
        });
    };
    const rules = {
        content: [
            {required: true, message: 'Please input content'}
        ],
        name: [
            {required: true, message: 'Please input name'}
        ],
        typePost: [
            {required: true, message: 'Please select type post'}
        ]
    }
    const typePost = useGetData('http://localhost:8083/api/v1/admin/type-post/list');
    const getOption = (
        <>
            {typePost.map((e: any) => (
                <Option key={e.id} value={e.id}>{e.name}</Option>
            ))}
        </>
    );
    return(
        <>
            <Breadcrumb
                items={[
                    {
                        title: <Link href={"/admin/topic"}>Topic</Link>
                    },
                    {
                        title: "Edit topic",
                    },
                ]}
            />
            <div className={'text-[24px] font-bold mb-4'}>Edit topic</div>
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
                    type={'text'}
                    className={'hidden'}
                />
                <InputCustom
                    name={"content"}
                    label={"Content"}
                    placeholder={"Content"}
                    allowClear={true}
                    rules={rules.content}
                    type={'textarea'}
                    maxLength={100}
                />
                <InputCustom
                    name={"name"}
                    label={"Name topic"}
                    placeholder={"Name topic"}
                    allowClear={true}
                    rules={rules.name}
                    type={'text'}
                />
                <SelectCustom
                    name={"typePost_id"}
                    label={"Name type post"}
                    placeholder={"Select a option"}
                    rules={rules.typePost}
                    getOption={getOption}
                    allowClear={true}
                />
                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <div className={'mx-auto text-center'}>
                        <ButtonSubmit/>
                        <LinkCustom
                            href={"/admin/type-post"}
                            className={"text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"}
                            text={"Back"}/>
                    </div>
                </Form.Item>
            </Form>
        </>
    )
}

TopicDetail.getLayout = function getlayout(page: ReactElement) {
    return <Admin>{page}</Admin>
}

export default TopicDetail;