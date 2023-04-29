import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement} from "react";
import Admin from "@/component/layout/Admin";
import User from "@/pages/admin/user";

const Home: NextPageWithLayout = () => {
    return(
        <>
            <div>Home</div>
        </>
    )
};

Home.getLayout = function getlayout(page : ReactElement) {
    return <Admin>{page}</Admin>
}

export default Home;
