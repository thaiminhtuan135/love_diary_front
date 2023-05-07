import axios from "axios";
import {message} from "antd";
import {AppStorage} from "@/auth/AppStorage";

interface UseAxiosDelete {
    deleteData : (url : string) => void

}

function useApiDelete(msgSuccess : string , msgErr : string , loadData : () => void ) : UseAxiosDelete {
    const {getToken} = AppStorage();
    const deleteData = async (url : string) => {
        await axios.delete(url,{
            headers : {
                Authorization : "Bearer "+getToken(),
            }
        })
            .then((res) => {
                message.success(msgSuccess);
                loadData();
            }).catch(()=> message.error(msgErr));
    }
    return{
        deleteData,
    }
}

export default useApiDelete;