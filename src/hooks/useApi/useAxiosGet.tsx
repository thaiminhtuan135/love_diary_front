import {useState, useEffect, useCallback} from "react";
import axios from "axios";

export default function useAxiosGet<T>(url : string): T[] {
    const [data, setData] = useState<T[]>([]);

    const getData = useCallback(
        async () => {
            try {
                const res = await axios.get(url);
                setData(res.data);
            } catch (err){
                console.log(err)
            }
        }, [url]);


    useEffect(() => {
        getData();
    }, [getData]);

    return data;
}
