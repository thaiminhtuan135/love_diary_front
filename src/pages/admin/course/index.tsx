import {NextPageWithLayout} from "@/pages/_app";
import {ReactElement} from "react";
import Dashboard from "@/pages/admin/dashboard";


const Course: NextPageWithLayout = () => {
    return (
        <>
            <div className={'text-[24px] font-bold'}>Thêm khóa học</div>
        </>
    )
};

Course.getLayout = function getlayout(page: ReactElement) {
    return <Dashboard>{page}</Dashboard>
}

export default Course;
