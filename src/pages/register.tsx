import Image from "next/image";
import {useRouter} from "next/router";
import {Form, Input} from "antd";
import {LockOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";
import React, {useEffect} from "react";
import axios from "axios";
import {ROLE} from "@/constant/constant";
import {User} from "@/auth/User";
import {AppStorage} from "@/auth/AppStorage";
import {Token} from "@/auth/Token";
import InputCustom from "@/component/InputCustom";

interface registerAccount {
    nickName: string;
    email: string;
    password: string;
    confirm: string;
}

function Register() {
    const {responseAfterLogin, hasToken} = User();
    const {getToken} = AppStorage();
    const {payload} = Token();
    const router = useRouter();
    const [form] = Form.useForm();

    const onFinish = (data: registerAccount) => {
        const registerData = {email : data.email , nickName : data.nickName , password: data.password}
        console.log(registerData);
        axios
            .post("http://localhost:8083/api/v1/auth/register/role/1", data)
            .then((res) => {
                const payload = res.data.token.split(".")[1];
                const userInfo = JSON.parse(atob(payload));
                responseAfterLogin(res.data.token, userInfo.username);
                if (userInfo.roles[0].authority === ROLE.ADMIN && hasToken()) {
                    router.push("/admin/home")
                }
            }).catch(() => {
        });
    };
    const rules : any = {
        nickName: [
            {required: true, message: 'Please input nick name'},
        ],
        email: [
            {required: true, message: 'Please input email'},
            {type: 'email', message: "Enter the correct email format"}
        ],
        password: [
            {required: true, message: 'Please input password'},
            {
                validator: async (_:any, password : string) => {
                    if (password !== undefined) {
                        if (password.length < 8) {
                            return Promise.reject(new Error("Password at least 8 characters"));
                        }
                    }

                }
            }
        ],
        confirmPassword : [
            {
                required: true,
                message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
                validator(_:any, value : any) {
                    if (getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
            }),
            {
                validator: async (_:any, password:any) => {
                    if (password !== undefined) {
                        if (password.length < 8) {
                            return Promise.reject(new Error("Password at least 8 characters"));
                        }
                    }

                }
            }
        ]
    }

    return (
        <>
            <div>
                <div className="container mx-auto">
                    <div className="flex justify-center px-6 my-12">
                        <div className="w-full  lg:w-11/12 flex">
                            <div className="w-full h-full hidden lg:block lg:w-5/12">
                                <Image src="/img/hinh-nen-tinh-yeu-full-hd-cho-dien-thoai.jpg" width={500} height={600}
                                       alt=""/>
                            </div>
                            <div className="w-full lg:w-7/12 h-[89.5%] bg-white p-5 rounded-lg lg:rounded-l-none">
                                <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
                                <Form
                                    form={form}
                                    name="login"
                                    onFinish={onFinish}
                                    initialValues={{remember: true}}
                                    scrollToFirstError
                                    layout={'vertical'}
                                >
                                    <Form.Item
                                        label="Nick name"
                                        name="nickName"
                                        rules={rules.nickName}
                                    >
                                        <Input size={'large'} placeholder="Nick name" prefix={<UserOutlined />}/>
                                    </Form.Item>
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={rules.email}
                                    >
                                        <Input size={'large'} placeholder="Email" prefix={<MailOutlined/>}/>
                                    </Form.Item>
                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={rules.password}
                                    >
                                        <Input.Password size={'large'} placeholder="Password" prefix={<LockOutlined/>}/>
                                    </Form.Item>

                                    <Form.Item
                                        name="confirm"
                                        label="Confirm Password"
                                        dependencies={['password']}
                                        rules={rules.confirmPassword}
                                    >
                                        <Input.Password size={'large'} placeholder="Confirm password" prefix={<LockOutlined/>}/>
                                    </Form.Item>

                                    <Form.Item>
                                        <div className={'mx-auto text-center'}>
                                            <button type="submit"
                                                    className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Register
                                            </button>
                                        </div>
                                    </Form.Item>
                                </Form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;
