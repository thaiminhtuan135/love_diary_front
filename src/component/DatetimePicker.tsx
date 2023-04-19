import {DatePicker, Form} from "antd";
import React from "react";

interface propData {
    rules: Array<any>;
    name: string;
    label: string;
    format: string;
}

export default function DatetimePicker(prop: propData) {
    return (
        <>
            <Form.Item name={prop.name} label={prop.label} rules={prop.rules}>
                <DatePicker format={prop.format}/>
                {/*YYYY-MM-DD*/}
            </Form.Item>
        </>
    )
}
