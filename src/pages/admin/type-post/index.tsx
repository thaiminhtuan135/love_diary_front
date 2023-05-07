import {NextPageWithLayout} from "@/pages/_app";
import React, {ReactElement, useEffect, useState} from "react";
import Admin from "@/component/layout/Admin";
import {useRouter} from "next/router";
import useAxiosGet from "@/hooks/useApi/useAxiosGet";
import {AppStorage} from "@/auth/AppStorage";
import TypeCourse from "@/pages/admin/type-course";
import axios from "axios";
import {Card, message, Space, Table} from "antd";
import ButtonEdit from "@/component/button/ButtonEdit";
import ButtonDelete from "@/component/button/ButtonDelete";
import Search from "@/component/Search";
import LinkCustom from "@/component/LinkCustom";

interface TypePost {
    id: number;
    name: string;
    topic : Array<any>
}

const TypePost: NextPageWithLayout = () => {
    const router = useRouter();
    const {data, loadData, setData} = useAxiosGet<TypePost>('http://localhost:8083/api/v1/admin/type-post/list')
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
            pathname: "/admin/type-post/[id]",
            query: {
                id: id,
            }
        })
    }
    const {getToken} = AppStorage();
    const handleDelete = async (id: number) => {
        await axios.delete(`http://localhost:8083/api/v1/admin/type-post/${id}`,{
            headers : {
                Authorization : "Bearer "+getToken(),
            }
        })
            .then((res) => {
                message.success('Delete successfully');
                loadData();
            }).catch((err)=> console.log(err));
    };
    const handleSearch = (filteredData: TypeCourse[]) => {
        // @ts-ignore
        setData(filteredData);
    };
    const columns : any= [
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
            render: (record : TypeCourse) => (
                <>
                    <Space>
                        <ButtonEdit handleUpdate={() => handleUpdate(record.id)}/>
                        <ButtonDelete handleDelete={() => handleDelete(record.id)} description={"Delete type course"}/>

                    </Space>
                </>
            )
        }
    ]
    return(
        <>
            <Card title={"Type course"} size={"default"}>
                <div>
                    <div className={'mb-2 flex justify-end items-center'}>
                        <Search data={data} onSearch={handleSearch} loadData={loadData}/>
                        <LinkCustom
                            href={"/admin/type-post/create"}
                            className={"text-white bg-cyan-800 rounded-lg text-sm text-center px-4 py-2 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium"}
                            text={"Create type post"}/>
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

TypePost.getLayout = function getlayout(page: ReactElement) {
    return <Admin>{page}</Admin>
}
export default TypePost;