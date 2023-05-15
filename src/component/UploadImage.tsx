import {Form, Modal, Upload} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {RcFile} from "antd/es/upload";
import {UploadFile} from "antd/es/upload/interface";
import Image from "next/image";

interface propData {
    name: string;
    rules?: Array<any>
    label?: string
    valuePropName: string
    maxCount?: number
}

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export default function UploadImage(prop: propData) {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };
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
                <Upload
                    accept="image/png,image/jpeg"
                    listType="picture-card"
                    maxCount={prop.maxCount}
                    onPreview={handlePreview}
                >
                    <div>
                        <PlusCircleOutlined/>
                        <div>Image</div>
                    </div>
                </Upload>
            </Form.Item>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <Image alt="example" style={{width: '100%'}} width={1000} height={1000} src={previewImage}/>
            </Modal>
        </>
    )
}
