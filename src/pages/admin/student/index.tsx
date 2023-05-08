import {NextPageWithLayout} from "@/pages/_app";
import React, {ReactElement, useEffect, useState} from "react";
import Admin from "@/component/layout/Admin";
import useAxiosGet from "@/hooks/useApi/useAxiosGet";
import Course from "@/pages/admin/course";
import {useRouter} from "next/router";
import useAxiosDelete from "@/hooks/useApi/useAxiosDelete";
import {Card, Space, Table} from "antd";
import ButtonEdit from "@/component/button/ButtonEdit";
import ButtonDelete from "@/component/button/ButtonDelete";
import Search from "@/component/Search";
import LinkCustom from "@/component/LinkCustom";

interface Student {
    id: number;
    name: string;
    dob: Date;
    telephone: string;
    email: string;
    province: string;
    district: string;
    wards: string;
    apartmentNumber: number;
}

const User: NextPageWithLayout = () => {
    const {data, loadData, setData} = useAxiosGet<Course>('http://localhost:8083/api/v1/admin/student/list');
    const scroll: { x?: number | string; y?: number | string; } = {};
    const [loading, setLoading] = useState(true);
    scroll.y = 800;
    const router = useRouter();
    useEffect(() => {
        loadData();
        setLoading(false);
    }, []);
    const handleUpdate = (id: number) => {
        router.push({
            pathname: "/admin/student/[id]",
            query: {
                id: id,
            }
        }).then()
    }
    const {deleteData} = useAxiosDelete("Delete successfully", "Delete Fail", loadData);
    const handleDelete = (id: number) => {
        deleteData(`http://localhost:8083/api/v1/admin/student/${id}`)
    };
    const columns: any = [
        {
            dataIndex: "id",
            title: "ID",
            key: "id",
            align: "center",
            // sorter: (a: Student, b: Student) => a.id - b.id,
        },
        {
            dataIndex: "name",
            title: "name",
            key: "name",
            align: "center",
            // sorter: (a: Student, b: Student) => a.name.length - b.name.length,
        },
        {
            dataIndex: "telephone",
            title: "Telephone",
            key: "telephone",
            align: "center"
        },
        {
            dataIndex: "email",
            title: "Email",
            key: "email",
            align: "center",
            // sorter: (a: Student, b: Student) => a.introduce.length - b.introduce.length,
        },
        {
            dataIndex: "province",
            title: "Province",
            key: "province",
            align: "center",
            // sorter: (a: Student, b: Student) => a.content.length - b.content.length,
        },
        {
            dataIndex: "district",
            title: "District",
            key: "district",
            align: "center",
            // sorter: (a: Course, b: Course) => a.amount_students - b.amount_students,
        },
        {
            dataIndex: "wards",
            title: "Wards",
            key: "wards",
            align: "center",
            // sorter: (a: Course, b: Course) => a.amount_subject - b.amount_subject,
        },
        {
            dataIndex: "apartmentNumber",
            title: "ApartmentNumber",
            key: "apartmentNumber",
            align: "center",
            // sorter: (a: any, b: any) => a.typeCourse - b.typeCourse,

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
            <Card title={"Student"} size={"default"}>
                <div className={'mb-2 flex justify-end items-center'}>
                    <Search data={data} onSearch={handleSearch} loadData={loadData}/>
                    <LinkCustom
                        href={"/admin/student/create"}
                        className={"text-white bg-cyan-800 rounded-lg text-sm text-center px-4 py-[8px] bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium"}
                        text={"Create student"}/>
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


User.getLayout = function getlayout(page: ReactElement) {
    return <Admin>{page}</Admin>
}

export default User;
