import {NextPageWithLayout} from "@/pages/_app";
import React, {ReactElement, useEffect, useState} from "react";
import Admin from "@/component/layout/Admin";
import {useRouter} from "next/router";
import useAxiosGet from "@/hooks/useApi/useAxiosGet";
import {AppStorage} from "@/auth/AppStorage";
import axios from "axios";
import {Card, message, Space, Table} from "antd";
import TypeCourse from "@/pages/admin/type-course";
import ButtonEdit from "@/component/button/ButtonEdit";
import ButtonDelete from "@/component/button/ButtonDelete";
import TypePost from "@/pages/admin/type-post";
import Search from "@/component/Search";
import LinkCustom from "@/component/LinkCustom";

interface Topic {
    id: number;
    content: string;
    name: string;
    type_post_id: number;
    posts : Array<any>
}

const Topic: NextPageWithLayout = () => {
    const router = useRouter();
    const {data, loadData, setData} = useAxiosGet<TypePost>('http://localhost:8083/api/v1/admin/topic/list')
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
            pathname: "/admin/topic/[id]",
            query: {
                id: id,
            }
        })
    }
    const {getToken} = AppStorage();
    const handleDelete = async (id: number) => {
        await axios.delete(`http://localhost:8083/api/v1/admin/topic/${id}`,{
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
            dataIndex: "content",
            title: "Content",
            key: "content",
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
                        <ButtonDelete handleDelete={() => handleDelete(record.id)} description={"Delete topic"}/>
                    </Space>
                </>
            )
        }
    ]
    return(
        <>
            <Card title={"Topic"} size={"default"}>
                <div>
                    <div className={'mb-2 flex justify-end items-center'}>
                        <Search data={data} onSearch={handleSearch} loadData={loadData}/>
                        <LinkCustom
                            href={"/admin/topic/create"}
                            className={"text-white bg-cyan-800 rounded-lg text-sm text-center px-4 py-2 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium"}
                            text={"Create topic"}/>
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

Topic.getLayout = function getlayout(page: ReactElement) {
    return <Admin>{page}</Admin>
};
export default Topic;