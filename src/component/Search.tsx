import {SearchOutlined} from "@ant-design/icons";
import React, {ChangeEvent, useState} from "react";

interface SearchProps<T> {
    data: T[];
    onSearch: (filteredData: T[]) => void;
    loadData: () => void;
}

export default function Search<T>(prop: SearchProps<T>) {

    const [searchText, setSearchText] = useState("");
    const handleInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
        if (e.target.value === "") {
            prop.loadData();
        }
    };

    const globalSearch = () => {
        if (searchText) {
            const filteredData = prop.data.filter(
                (item: any) => Object.values(item)
                    .some(
                        (value) => value && value.toString().toLowerCase().includes(searchText.toLowerCase())
                    )
                //     item.name.toLowerCase().includes(searchText.toLowerCase()) ||
                //     item.introduce.toLowerCase().includes(searchText.toLowerCase())
            );
            prop.onSearch(filteredData);
        }
    };

    return (
        <>
            <input value={searchText}
                   placeholder={"Search"}
                   name={"searchText"}
                   onChange={handleInputSearch}
                   type={"text"}
                   className={'border h-9 p-2 text-[16px] rounded-lg mr-2 focus:ring-2 focus:ring-3 focus:outline-none focus:ring-teal-300 from-teal-400 via-teal-500 to-teal-600'}
            />
            <button
                className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-2 focus:outline-none focus:ring-[#FF9119]/50  rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mr-2"
                onClick={globalSearch}>
                <SearchOutlined/>
                <p className={'ml-2'}>Search</p>
            </button>
        </>
    )
};


