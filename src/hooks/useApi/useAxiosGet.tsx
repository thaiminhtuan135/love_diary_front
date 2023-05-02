import {Dispatch, SetStateAction, useState} from "react";
import axios from "axios";

interface AxiosGet<T> {
    data: T[];
    setData: Dispatch<SetStateAction<T[]>>;
    loadData: () => void
}
function useAxiosGet<T>(url : string) : AxiosGet<T> {
    const [data, setData] = useState<T[]>([]);
    const loadData = async () => {
        await axios
            .get(url)
            .then((res) => {
                const modifiedData = res.data.map((item : any) => ({
                    ...item,
                    key: item.id,
                }));
                setData(modifiedData)
            }).catch((err) => console.log(err));
    }
    return  {
        data,
        setData,
        loadData,
    }
}

export default useAxiosGet;
