import {NextPageWithLayout} from "@/pages/_app";
import React, {ReactElement} from "react";
import Admin from "@/component/layout/Admin";
import {Breadcrumb, Form} from "antd";
import useAxiosPost from "@/hooks/useApi/useAxiosPost";
import Link from "next/link";
import InputCustom from "@/component/InputCustom";
import ButtonSubmit from "@/component/button/ButtonSubmit";
import LinkCustom from "@/component/LinkCustom";

interface TypePost {
    name : string
}
const CreateTypePost: NextPageWithLayout = () => {
    const [form] = Form.useForm();
    const {postData} = useAxiosPost<TypePost>('http://localhost:8083/api/v1/admin/type-post/create',
        "/admin/type-post","Create successfully","Create failed")
    const onFinish = (data: TypePost) => {
        console.log(data)
        postData(data);
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
        name: [
            {required: true, message: 'Please input name'}
        ]
    }
    return(
        <>
            <Breadcrumb
                items={[
                    {
                        title: <Link href={"/admin/type-post"}>Type post</Link>
                    },
                    {
                        title: "Create type post",
                    },
                ]}
            />
            <div className={'text-[24px] font-bold mb-4'}>Add type post</div>

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
                    name={"name"}
                    label={"Name type post"}
                    placeholder={"Name type post"}
                    allowClear={true}
                    rules={rules.name}
                    type={'text'}
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
CreateTypePost.getLayout = function getlayout(page: ReactElement) {
    return <Admin>{page}</Admin>
}
export default CreateTypePost;