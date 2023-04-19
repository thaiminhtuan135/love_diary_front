import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement, useEffect, useState} from "react";
import {faker} from "@faker-js/faker";
import {Card, message, Row, Space, Table} from "antd";
import LinkCustom from "@/component/LinkCustom";
import {useRouter} from "next/router";
import ButtonEdit from "@/component/button/ButtonEdit";
import ButtonDelete from "@/component/button/ButtonDelete";
import Admin from "@/component/layout/Admin";

interface TypeCourse {
    id: number;
    name: string;
}

const TypeCourse: NextPageWithLayout = () => {

    const [typeCourses, setTypeCourses] = useState<TypeCourse[]>([]);

    useEffect(() => {
        const newData = [];
        for (let i = 0; i < 50; i++) {
            newData.push({
                id: i,
                name: faker.name.fullName(),
            })
        }
        setTypeCourses(newData);
    }, []);


    useEffect(() => {
        console.log(typeCourses, 'sda');
    }, [typeCourses]);

    const confirm = (id: number) => {
        message.success('Clicked on Yes.' + id);
    };
    const router = useRouter();
    const handleUpdate = (id: number) => {
        router.push({
            pathname: "/admin/type-course/[id]",
            query: {
                id: id,
            }
        })
    }

    const handleDelete = (id : number) => {
        console.log(id)
        message.success('Clicked on Yes.');
    };

    const modifiedData = typeCourses.map((item) => ({
        ...item,
        key: item.id,
    }));

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
                        {/*<button onClick={() => handleUpdate(record.id)}>Edit</button>*/}
                        <ButtonEdit handleUpdate={() => handleUpdate(record.id)}/>
                        <ButtonDelete handleDelete={() => handleDelete(record.id)} description={"Delete type course"} />

                    </Space>
                </>
            )
        }
    ]

    return (
        <>
            <Card title={"Type course"} size={"default"}>
            {/*<div className={' text-[24px] font-bold w-full'}>Type course</div>*/}
            <div>
                <div className={'mb-2 flex justify-end items-center'}>
                    <LinkCustom
                        href={"/admin/type-course/create"}
                        className={"text-white bg-cyan-800 rounded-lg text-sm text-center px-4 py-2 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium"}
                        text={"Create type course"}/>
                </div>
            </div>
            <div className={'overflow-scroll bg-white w-full'}>
                <Table
                    dataSource={modifiedData}
                    pagination={{
                        showQuickJumper: true,
                        defaultPageSize: 10,
                        showSizeChanger: true,
                        pageSizeOptions: ['10', '20', '30']
                    }}
                    columns={columns}
                    bordered
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
