import {Form, Select} from "antd";
import React from "react";

interface propData {
    getOption?: JSX.Element;
    name: string;
    label: string;
    placeholder?: string;
    rules?: Array<any>
    allowClear?: boolean;
}

export default function SelectCustom(prop: propData) {
    return (
        <>
            <Form.Item
                name={prop.name}
                label={prop.label}
                rules={prop.rules}>
                <Select
                    placeholder={prop.placeholder}
                    allowClear={!!prop.allowClear}
                >
                    {prop.getOption}
                </Select>
            </Form.Item>
        </>
    );
}
