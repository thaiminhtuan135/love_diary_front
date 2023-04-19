import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement} from "react";
import Dashboard from "@/pages/admin/dashboard";

const User: NextPageWithLayout = () => {
    return(
        <>
            <div>User</div>
        </>
    )
};


User.getLayout = function getlayout(page : ReactElement) {
    return <Dashboard>{page}</Dashboard>
}

export default User;
