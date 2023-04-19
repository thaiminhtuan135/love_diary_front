import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement, useEffect, useState} from "react";
import Dashboard from "@/pages/admin/dashboard";
import {faker} from "@faker-js/faker";
import {Col, Popconfirm, Row, Table ,message} from "antd";
import LinkCustom from "@/component/LinkCustom";
import {useRouter} from "next/router";

type image = String | Blob;

interface Interface {
    id: number;
    name: String;
    time: Date;
    introduce: String;
    content: String;
    price: number;
    amount_students: number;
    amount_subject: number;
    image: image;
    typeCourse: number;
}

const Course: NextPageWithLayout = () => {
    const [courses, setCourses] = useState<Interface[]>([]);
    useEffect(() => {
        const newData = [];

        for (let i = 0; i < 34; i++) {
            newData.push({
                id: i,
                name: faker.name.fullName(),
                time: faker.datatype.datetime(),
                introduce: faker.datatype.string(10),
                content: faker.datatype.string(20),
                price: faker.datatype.number(10, 1000),
                amount_students: faker.datatype.number(10, 100),
                amount_subject: faker.datatype.number(1, 10),
                image: faker.image.image(),
                typeCourse: faker.datatype.number(1, 10),
            })
        }

        setCourses(newData);

    }, []);

    useEffect(() => {
        console.log(courses, 'sda');
    }, [courses]);
    const router = useRouter();
    const handleUpdate = (id: number) => {
        router.push({
            pathname: "/admin/course/[id]",
            query: {
                id: id,
            }
        })
    }

    const confirm = () => {
        message.info('Clicked on Yes.');
    };
    return (
        <>
            <div className={' text-[24px] font-bold w-full'}>List Course</div>

            <div className={''}>
                <div className={'mb-2 flex justify-end items-center'}>
                    <LinkCustom
                        href={"/admin/course/create"}
                        className={"text-white bg-cyan-800 rounded-lg text-sm text-center px-4 py-2 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium"}
                        text={"Create course"}/>
                </div>
                <div className={'overflow-scroll bg-white w-full'}>
                    <Row gutter={12}>
                        <Col span={24}>
                            <Table
                                dataSource={courses}
                                pagination={{
                                    showQuickJumper: true,
                                    defaultPageSize: 10,
                                    showSizeChanger: true,
                                    pageSizeOptions: ['10', '20', '30']
                                }}
                                columns={[
                                    {
                                        dataIndex: "id",
                                        title: "ID",
                                        key: "id"
                                    },
                                    {
                                        dataIndex: "name",
                                        title: "name",
                                        key: "name",
                                    },
                                    {
                                        dataIndex: "time",
                                        title: "Time",
                                        key: "time",
                                    },
                                    {
                                        dataIndex: "introduce",
                                        title: "Introduce",
                                        key: "introduce",
                                    },
                                    {
                                        dataIndex: "content",
                                        title: "Content",
                                        key: "content",
                                    },
                                    {
                                        dataIndex: "price",
                                        title: "Price",
                                        key: "price",
                                    },
                                    {
                                        dataIndex: "amount_students",
                                        title: "Amount students",
                                        key: "amount_students",
                                    },
                                    {
                                        dataIndex: "amount_subject",
                                        title: "Amount Subject",
                                        key: "amount_subject",
                                    },
                                    {
                                        dataIndex: "image",
                                        title: "Image",
                                        key: "image",
                                    },
                                    {
                                        dataIndex: "typeCourse",
                                        title: "Type Course",
                                        key: "typeCourse",
                                    },
                                    {
                                        title: "Actions",
                                        render: (record) => (
                                            <>
                                                <button onClick={() => handleUpdate(record.id)}>Edit</button>
                                                <Popconfirm
                                                    placement="topRight"
                                                    title={"Are you want delete ? "}
                                                    description={"Delete course"}
                                                    onConfirm={confirm}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <button>Delete</button>
                                                </Popconfirm>
                                            </>
                                        )
                                    }
                                ]}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
};

Course.getLayout = function getlayout(page: ReactElement) {
    return <Dashboard>{page}</Dashboard>
}

export default Course;
