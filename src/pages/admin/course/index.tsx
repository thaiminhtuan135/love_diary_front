import {NextPageWithLayout} from "@/pages/_app";
import React, {ReactElement, useEffect, useState} from "react";
import {Table, Space, Card} from "antd";
import LinkCustom from "@/component/LinkCustom";
import {useRouter} from "next/router";
import ButtonEdit from "@/component/button/ButtonEdit";
import ButtonDelete from "@/component/button/ButtonDelete";
import Admin from "@/component/layout/Admin";
import useAxiosGet from "@/hooks/useApi/useAxiosGet";
import Search from "@/component/Search";
import useAxiosDelete from "@/hooks/useApi/useAxiosDelete";

type image = String | Blob;

interface Course {
    id: number;
    name: String;
    time: Date;
    introduce: String;
    content: String;
    price: number;
    amount_students: number;
    amount_subject: number;
    image: image;
    typeCourse_Id: number;
}

const Course: NextPageWithLayout = () => {
    const {data, loadData, setData} = useAxiosGet<Course>('http://localhost:8083/api/v1/admin/course/list')

    const scroll: { x?: number | string; y?: number | string; } = {};
    const [loading, setLoading] = useState(true);

    scroll.y = 800;


    useEffect(() => {
        loadData();
        setLoading(false);
    }, []);

    const router = useRouter();
    const handleUpdate = (id: number) => {
        router.push({
            pathname: "/admin/course/[id]",
            query: {
                id: id,
            }
        })
    }
    const {deleteData} = useAxiosDelete("Delete successfully", "Delete Fail", loadData);
    const handleDelete = (id: number) => {
        deleteData(`http://localhost:8083/api/v1/admin/course/${id}`)
    };


    const columns: any = [
        {
            dataIndex: "id",
            title: "ID",
            key: "id",
            align: "center",
            sorter: (a: Course, b: Course) => a.id - b.id,
        },
        {
            dataIndex: "name",
            title: "name",
            key: "name",
            align: "center",
            sorter: (a: Course, b: Course) => a.name.length - b.name.length,
        },
        {
            dataIndex: "time",
            title: "Time",
            key: "time",
            align: "center"
        },
        {
            dataIndex: "introduce",
            title: "Introduce",
            key: "introduce",
            align: "center",
            sorter: (a: Course, b: Course) => a.introduce.length - b.introduce.length,
        },
        {
            dataIndex: "content",
            title: "Content",
            key: "content",
            align: "center",
            sorter: (a: Course, b: Course) => a.content.length - b.content.length,
        },
        {
            dataIndex: "price",
            title: "Price",
            key: "price",
            align: "center",
            sorter: (a: Course, b: Course) => a.price - b.price,
        },
        {
            dataIndex: "amount_student",
            title: "Amount student",
            key: "amount_student",
            align: "center",
            sorter: (a: Course, b: Course) => a.amount_students - b.amount_students,
        },
        {
            dataIndex: "amount_subject",
            title: "Amount Subject",
            key: "amount_subject",
            align: "center",
            sorter: (a: Course, b: Course) => a.amount_subject - b.amount_subject,
        },
        // {
        //     dataIndex: "image",
        //     title: "Image",
        //     key: "image",
        //     align: "center"
        // },
        {
            dataIndex: "typeCourse_id",
            title: "Type Course",
            key: "typeCourse_id", align: "center",
            sorter: (a: any, b: any) => a.typeCourse - b.typeCourse,

        },
        {
            title: "Actions",
            align: "center",
            render: (record: any) => (
                <>
                    <Space>
                        <ButtonEdit handleUpdate={() => handleUpdate(record.id)}/>
                        <ButtonDelete handleDelete={() => handleDelete(record.id)} description={"Delete Course"}/>
                    </Space>
                </>
            )
        }
    ];

    const handleSearch = (filteredData: Course[]) => {
        setData(filteredData);
    };

    return (
        <>
            <Card title={"List course"} size={"default"}>
                <div className={'mb-2 flex justify-end items-center'}>
                    <Search data={data} onSearch={handleSearch} loadData={loadData}/>
                    <LinkCustom
                        href={"/admin/course/create"}
                        className={"text-white bg-cyan-800 rounded-lg text-sm text-center px-4 py-[8px] bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium"}
                        text={"Create course"}/>
                </div>
                <div className={'overflow-scroll bg-white w-full'}>
                    <Table
                        dataSource={data}
                        pagination={{
                            showQuickJumper: true,
                            defaultPageSize: 10,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '30']
                        }}
                        bordered
                        columns={columns}
                        loading={loading}
                        scroll={scroll}
                    />
                </div>
            </Card>
        </>
    )
};

Course.getLayout = function getlayout(page: ReactElement) {
    return <Admin>{page}</Admin>
}

export default Course;
