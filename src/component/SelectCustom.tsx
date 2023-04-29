import {Form, Select} from "antd";
import React, {CSSProperties} from "react";

interface propData {
    getOption?: JSX.Element;
    name?: string;
    label?: string;
    placeholder?: string;
    rules?: Array<any>
    allowClear?: boolean;
    defaultValue?: any;
    style?: CSSProperties;
    onchange? : () => void
}

export default function SelectCustom(prop: propData) {
    return (
        <>
            <Form.Item
                name={prop.name}
                label={prop.label}
                rules={prop.rules}>
                <Select
                    defaultValue={prop.defaultValue}
                    placeholder={prop.placeholder}
                    allowClear={!!prop.allowClear}
                    style={prop.style}
                    onChange={prop.onchange}
                >
                    {prop.getOption}
                </Select>
            </Form.Item>
        </>
    );
}
