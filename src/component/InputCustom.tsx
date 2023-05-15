import {Form, Input} from "antd";
import React from "react";

type type = 'text' | 'textarea';

interface propData {
    name: string;
    label?: string;
    rules?: Array<any>
    className?: string;
    placeholder?: string;
    allowClear?: boolean;
    type?: type;
    maxLength?: number;

}

export default function InputCustom(prop: propData) {

    const getInputElement = () => {
        switch (prop.type) {
            case 'text':
                return <Input
                          allowClear={!!prop.allowClear}
                          placeholder={prop.placeholder}
                          className={prop.className}
                        />;
            case 'textarea':
                return <Input.TextArea
                          showCount maxLength={prop.maxLength}
                          placeholder={prop.placeholder}
                          className={prop.className}
                       />;
            default :
                return <Input placeholder={prop.placeholder}/>;
        }
    }

    return (
        <>
            <Form.Item
                name={prop.name}
                label={prop.label}
                rules={prop.rules}
            >
                {getInputElement()}
            </Form.Item>
        </>
    );
}
