import {useRouter} from "next/router";
import React, {ReactElement, useEffect} from "react";
import Link from "next/link";
import {Breadcrumb, Form} from "antd";
import InputCustom from "@/component/InputCustom";
import ButtonSubmit from "@/component/button/ButtonSubmit";
import LinkCustom from "@/component/LinkCustom";
import {faker} from "@faker-js/faker";
import Admin from "@/component/layout/Admin";

interface typeCourse {
    id: number;
    name: string
}

function TypeCourseDetail() {
    const [form] = Form.useForm();
    const route = useRouter();

    useEffect(() => {
        form.setFieldsValue({id: 1});
        form.setFieldsValue({name: 'Hi, man!'});
        const {id} = route.query;
        console.log(id)
    }, []);

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

    const onFinish = (data: typeCourse) => {
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
                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                    <div className={'mx-auto text-center'}>
                        <ButtonSubmit/>
                        <LinkCustom
                            href={"/admin/type-course"}
                            className={"text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"}
                            text={"Back"}/>
                    </div>
                </Form.Item>
            </Form>
        </>
    )
};

TypeCourseDetail.getLayout = function getlayout(page: ReactElement) {
    return <Admin>{page}</Admin>
}

export default TypeCourseDetail;
