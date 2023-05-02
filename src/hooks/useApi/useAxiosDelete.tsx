import axios from "axios";
import {message} from "antd";

interface UseAxiosDelete {
    deleteData : (url : string) => void

}

function useApiDelete(msgSuccess : string , msgErr : string , loadData : () => void ) : UseAxiosDelete {
    const deleteData = async (url : string) => {
        await axios.delete(url)
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