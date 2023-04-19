import {NextPageWithLayout} from "@/pages/_app";
import React, {ReactElement} from "react";
import Dashboard from "@/pages/admin/dashboard";
import {Breadcrumb, Form} from "antd";
import Link from "next/link";
import InputCustom from "@/component/InputCustom";
import ButtonSubmit from "@/component/button/ButtonSubmit";
import LinkCustom from "@/component/LinkCustom";

interface typeCourse {

}

const CreateTypeCourse: NextPageWithLayout = () => {
    const [form] = Form.useForm();

    const onFinish = (data: typeCourse) => {
        // console.log(data)
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

    const rules = {
        ruleType : [
            {required: true, message: 'Please input name'}
        ]
    }

    return(
        <>
            <Breadcrumb
                items={[
                    {
                        title: <Link href={"/admin/type-course"}>Type Course</Link>
                    },
                    {
                        title: "Create type course",
                    },
                ]}
            />
            <div className={'text-[24px] font-bold mb-4'}>Add type course</div>

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
                    label={"Name type course"}
                    placeholder={"Name type course"}
                    allowClear={true}
                    rules={rules.ruleType}
                    type={'text'}
                />
                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <div className={'mx-auto text-center'}>
                        <ButtonSubmit/>
                        <LinkCustom href={"/admin/type-course"}
                                    className={"text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"}
                                    text={"Back"}/>
                    </div>
                </Form.Item>
            </Form>
        </>
    )
};

CreateTypeCourse.getLayout = function getlayout(page : ReactElement) {
    return <Dashboard>{page}</Dashboard>
}

export default CreateTypeCourse;
