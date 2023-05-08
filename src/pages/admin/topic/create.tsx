import {NextPageWithLayout} from "@/pages/_app";
import React, {ReactElement} from "react";
import Admin from "@/component/layout/Admin";
import {Breadcrumb, Form, message, Select} from "antd";
import Link from "next/link";
import InputCustom from "@/component/InputCustom";
import ButtonSubmit from "@/component/button/ButtonSubmit";
import LinkCustom from "@/component/LinkCustom";
import SelectCustom from "@/component/SelectCustom";
import useGetData from "@/hooks/useApi/useGetData";
import axios from "axios";
import {AppStorage} from "@/auth/AppStorage";
import {useRouter} from "next/router";

interface Topic {
    content: string;
    name: string;
    typePost_id: number;
}

const CreateTopic: NextPageWithLayout = () => {
    const [form] = Form.useForm();
    const {Option} = Select;
    const router = useRouter();
    const {getToken} = AppStorage();
    const onFinish = (data: any) => {
        console.log(data.typePost_id)
        axios
            .post(`http://localhost:8083/api/v1/admin/topic/create/type-post/${data.typePost_id}`, {
                "content" : data.content,
                "name" : data.name
            },  {
                headers : {
                    Authorization : "Bearer "+getToken(),
                }
            })
            .then(() => {
                message.success("Create topic successfully").then();
                router.push("/admin/topic").then();
            }).catch((r) => console.log(r));
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
                        title: "Create topic",
                    },
                ]}
            />
            <div className={'text-[24px] font-bold mb-4'}>Add topic</div>

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
};

CreateTopic.getLayout = function getlayout(page: ReactElement) {
    return <Admin>{page}</Admin>
}
export default CreateTopic;