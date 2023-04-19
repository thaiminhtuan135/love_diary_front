import {useRouter} from "next/router";
import React, {ReactElement} from "react";
import Dashboard from "@/pages/admin/dashboard";
import CreateCourse from "@/pages/admin/course/create";

function CourseDetail() {
    const route = useRouter();
    return(
        <>
            <div>tuan</div>
            <div>Query : {JSON.stringify(route.query)}</div>
        </>
    )
};

CourseDetail.getLayout = function getlayout(page: ReactElement) {
    return <Dashboard>{page}</Dashboard>
}

export default CourseDetail;
