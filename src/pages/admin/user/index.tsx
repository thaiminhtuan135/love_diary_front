import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement} from "react";
import Admin from "@/component/layout/Admin";

const User: NextPageWithLayout = () => {
    return(
        <>
            <div>User</div>
        </>
    )
};


User.getLayout = function getlayout(page : ReactElement) {
    return <Admin>{page}</Admin>
}

export default User;
