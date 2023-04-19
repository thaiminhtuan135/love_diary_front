import {Form, InputNumber} from "antd";
import React from "react";

interface propData {
    suffixSelector?: JSX.Element;
    name: string;
    label: string;
    className?: string;
    rules?: Array<any>;
    placeholder?: string;
}

export default function InputNumberCustom(prop: propData) {
    return (
        <>
            <Form.Item
                name={prop.name}
                label={prop.label}
                rules={prop.rules}
            >
                <InputNumber addonAfter={prop.suffixSelector} className={prop.className} placeholder={prop.placeholder}/>
            </Form.Item>
        </>
    )
}
