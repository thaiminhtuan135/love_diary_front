import axios from "axios";
import {STATUS} from "@/constant/constant";
import {message} from "antd";
import {useRouter} from "next/router";

interface UseAxiosPost<T> {
    postData: () => void
}

function useAxiosPost<T>(url: string, redirect: string, msgSuccess: string,msgError:string): UseAxiosPost<T> {
    const router = useRouter();
    const postData = async (data : T) => {
        await axios
            .post(url, data)
            .then((res) => {
                    message.success(msgSuccess);
                    router.push(redirect)
            }).catch(() => message.error(msgError));
    }
    return {
        postData,
    }
}

export default useAxiosPost;
