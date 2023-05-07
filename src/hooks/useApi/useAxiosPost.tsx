import axios from "axios";
import {message} from "antd";
import {useRouter} from "next/router";
import {AppStorage} from "@/auth/AppStorage";

interface UseAxiosPost<T> {
    postData: (data : T) => void,
}

function useAxiosPost<T>(url: string, redirect: string, msgSuccess: string,msgError:string): UseAxiosPost<T> {
    const {getToken} = AppStorage();
    const router = useRouter();
    const postData :any = async (data : T) => {
        await axios
            .post(url, data,{
                headers : {
                    Authorization : "Bearer "+getToken(),
                }
            })
            .then(() => {
                    message.success(msgSuccess);
                    router.push(redirect)
            }).catch(() => message.error(msgError));
    }
    return {
        postData,
    }
}

export default useAxiosPost;
