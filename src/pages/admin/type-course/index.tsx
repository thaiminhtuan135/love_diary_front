import {NextPageWithLayout} from "@/pages/_app";
import React, {ReactElement, useEffect, useState} from "react";
import {Card, message, Row, Space, Table} from "antd";
import LinkCustom from "@/component/LinkCustom";
import {useRouter} from "next/router";
import ButtonEdit from "@/component/button/ButtonEdit";
import ButtonDelete from "@/component/button/ButtonDelete";
import Admin from "@/component/layout/Admin";
import useAxiosGet from "@/hooks/useApi/useAxiosGet";
import Search from "@/component/Search";
import axios from "axios";

interface TypeCourse {
    id: number;
    name: string;
    // course : Array<any>
}

const TypeCourse: NextPageWithLayout = () => {
    const router = useRouter();
    const {data, loadData, setData} = useAxiosGet<TypeCourse>('http://localhost:8083/api/v1/admin/type-course/list')
    const [loading, setLoading] = useState(true);
    const scroll: { x?: number | string; y?: number | string; } = {};
    scroll.y = 800;
    // scroll.x = '100vw';
    useEffect(() => {
        loadData();
        setLoading(false);
    }, []);



    const handleUpdate = (id: number) => {
        router.push({
            pathname: "/admin/type-course/[id]",
            query: {
                id: id,
            }
        })
    }

    const handleDelete = async (id: number) => {
        await axios.delete(`http://localhost:8083/admin/type-course/${id}`)
            .then((res) => {
                message.success('Delete successfully');
                loadData();
            }).catch((err)=> console.log(err));
    };

    const columns = [
        {
            dataIndex: "id",
            title: "ID",
            key: "id",
            align: "center",
        },
        {
            dataIndex: "name",
            title: "Name",
            key: "name",
            align: "center",
        },
        {
            title: "Actions",
            align: "center",
            render: (record) => (
                <>
                    <Space>
                        <ButtonEdit handleUpdate={() => handleUpdate(record.id)}/>
                        <ButtonDelete handleDelete={() => handleDelete(record.id)} description={"Delete type course"}/>

                    </Space>
                </>
            )
        }
    ]
    const handleSearch = (filteredData: TypeCourse[]) => {
        setData(filteredData);
    };
    return (
        <>
            <Card title={"Type course"} size={"default"}>
                {/*<div className={' text-[24px] font-bold w-full'}>Type course</div>*/}
                <div>
                    <div className={'mb-2 flex justify-end items-center'}>
                        <Search data={data} onSearch={handleSearch} loadData={loadData}/>
                        <LinkCustom
                            href={"/admin/type-course/create"}
                            className={"text-white bg-cyan-800 rounded-lg text-sm text-center px-4 py-2 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium"}
                            text={"Create type course"}/>
                    </div>
                </div>
                <div className={'overflow-scroll bg-white w-full'}>
                    <Table
                        dataSource={data}
                        pagination={{
                            showQuickJumper: true,
                            defaultPageSize: 10,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '30'],
                            position : ['bottomRight'],
                        }}
                        columns={columns}
                        bordered
                        loading={loading}
                        scroll={scroll}
                    />
                </div>
            </Card>
        </>
    )
};


TypeCourse.getLayout = function getlayout(page: ReactElement) {
    return <Admin>{page}</Admin>
}

export default TypeCourse;
