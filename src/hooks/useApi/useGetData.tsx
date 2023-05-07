import {useEffect, useState} from "react";
import axios from "axios";
import {AppStorage} from "@/auth/AppStorage";

function useGetData(url : string) {
    const {getToken} = AppStorage();
    const [list, setList] = useState<any>([]);
    const getData = async () => {
        await axios
            .get(url,{
                headers : {
                    Authorization : "Bearer "+getToken(),
                }
            })
            .then((res) => {
                const modifiedData = res.data.map((item: any) => ({
                    ...item,
                    key: item.id,
                }));
                setList(modifiedData)
            }).catch((r) => console.log(r));
    }
    useEffect(() => {
        getData();
    }, []);
    return list

}
export default useGetData;
