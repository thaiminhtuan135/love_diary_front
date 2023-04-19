import {Form, Upload} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import React from "react";

interface propData {
    name: string;
    rules?: Array<any>
    label: string
    valuePropName: string
    maxCount?: number
}

export default function UploadImage(prop: propData) {
    return (
        <>
            <Form.Item
                label={prop.label} name={prop.name}
                valuePropName={prop.valuePropName}
                getValueFromEvent={(event) => {
                    return event?.fileList;
                }}
                rules={prop.rules}
            >
                <Upload accept="image/png,image/jpeg" listType="picture-card" maxCount={prop.maxCount}>
                    <div>
                        <PlusCircleOutlined/>
                        <div>Upload</div>
                    </div>
                </Upload>
            </Form.Item>
        </>
    )
}
