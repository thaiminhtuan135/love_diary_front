import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement, useEffect, useState} from "react";
import {faker} from "@faker-js/faker";
import {Table, message, Space, Input, Card} from "antd";
import LinkCustom from "@/component/LinkCustom";
import {useRouter} from "next/router";
import ButtonEdit from "@/component/button/ButtonEdit";
import ButtonDelete from "@/component/button/ButtonDelete";
import {SearchOutlined} from "@ant-design/icons";
import Admin from "@/component/layout/Admin";

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

    const [searchText, setSearchText] = useState("");
    let [filteredData] = useState();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        const newData = [];

        for (let i = 0; i < 34; i++) {
            newData.push({
                id: i,
                name: faker.name.fullName(),
                time: new Date(),
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
    };

    const router = useRouter();
    const handleUpdate = (id: number) => {
        router.push({
            pathname: "/admin/course/[id]",
            query: {
                id: id,
            }
        })
    }

    const handleDelete = (id: number) => {
        console.log(id)
        message.success('Clicked on Yes.');
    };

    const modifiedData = courses.map((item) => ({
        ...item,
        key: item.id,
    }));

    const columns = [
        {
            dataIndex: "id",
            title: "ID",
            key: "id",
            align: "center",
            sorter: (a, b) => a.id - b.id,
        },
        {
            dataIndex: "name",
            title: "name",
            key: "name",
            align: "center",
            sorter: (a, b) => a.name.length - b.name.length,
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
            sorter: (a, b) => a.introduce.length - b.introduce.length,
        },
        {
            dataIndex: "content",
            title: "Content",
            key: "content",
            align: "center",
            sorter: (a, b) => a.content.length - b.content.length,
        },
        {
            dataIndex: "price",
            title: "Price",
            key: "price",
            align: "center",
            sorter: (a, b) => a.price - b.price,
        },
        {
            dataIndex: "amount_students",
            title: "Amount students",
            key: "amount_students",
            align: "center",
            sorter: (a, b) => a.amount_students - b.amount_students,
        },
        {
            dataIndex: "amount_subject",
            title: "Amount Subject",
            key: "amount_subject",
            align: "center",
            sorter: (a, b) => a.amount_subject - b.amount_subject,
        },
        {
            dataIndex: "image",
            title: "Image",
            key: "image",
            align: "center"
        },
        {
            dataIndex: "typeCourse",
            title: "Type Course",
            key: "typeCourse", align: "center",
            sorter: (a, b) => a.typeCourse - b.typeCourse,

        },
        {
            title: "Actions",
            align: "center",
            render: (record) => (
                <>
                    <Space>
                        <ButtonEdit handleUpdate={() => handleUpdate(record.id)}/>
                        <ButtonDelete handleDelete={() => handleDelete(record.id)} description={"Delete Course"}/>
                    </Space>
                </>
            )
        }
    ];

    const handleInputSearch = (e: any) => {
        setSearchText(e.target.value);
        if (e.target.value === "") {
            loadData();
        }
    }
    const globalSearch = () => {
        filteredData = modifiedData.filter((value) => {
            return (
                value.name.toLowerCase().includes(searchText.toLowerCase()) ||
                value.introduce.toLowerCase().includes(searchText.toLowerCase())
            )
        })
        setCourses(filteredData);
    }
    return (
        <>
            <Card title={"List course"} size={"default"}>
                <div className={'mb-2 flex justify-end items-center'}>
                    <input value={searchText}
                           placeholder={"Search"}
                           name={"searchText"}
                           onChange={handleInputSearch}
                           type={"text"}/>
                    {/*<button className={'mr-2'} onClick={globalSearch}>search</button>*/}
                    <button
                        className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mr-2"
                        onClick={globalSearch}>
                        <SearchOutlined/>
                        <p className={'ml-2'}>Search</p>
                    </button>
                    <LinkCustom
                        href={"/admin/course/create"}
                        className={"text-white bg-cyan-800 rounded-lg text-sm text-center px-4 py-2 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium"}
                        text={"Create course"}/>
                </div>
                <div className={'overflow-scroll bg-white w-full'}>
                    <Table
                        dataSource={filteredData && filteredData.length ? filteredData : modifiedData}
                        pagination={{
                            showQuickJumper: true,
                            defaultPageSize: 10,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '30']
                        }}
                        bordered
                        columns={columns}
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
