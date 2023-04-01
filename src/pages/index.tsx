import Head from 'next/head'
import Image from 'next/image'
import {ReactElement, useEffect, useState} from 'react'
import axios from "axios";
import {Layout} from './component/layout';

interface Authenticate{
    email: String;
    password: String;
}
interface User{
    firstname: String;
    lastname: String;
    email: String;
    password: String;
}


const url = "http://localhost:8080/api/v1/auth/register";
function Home() {
    const payload = (token:any) => {
        const payload = token.split(".")[1];
        return decode(payload);
    }
    const decode = (payload:any) => {
        return JSON.parse(atob(payload));
    }
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsYWxhbGFsYWxhbGxhQGdtYWlsLmNvbSIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJVU0VSIn1dLCJpYXQiOjE2Nzk2MzMwMjQsImV4cCI6MTY3OTYzNDQ2NH0.PWQjYAqbtNvLqS5JkyTE1IIoyr8cj-MYAx6fAqb_b_k";
    console.log(payload(token));

    const [user, setUser] = useState<User>(
        {firstname : "tuan" , lastname : "minh" ,email: "lalalalalalla@gmail.com" , password : "123456"}
    );
    // useEffect(() => {
        //  axios
        //     .post(url, user)
        //     .then((res) => {
        //         console.log(res);
        //         console.log(res.data)
        //
        //     }).catch(() => {
        //
        // });
        // axios
        //     .get('http://localhost:8080/api/v1/auth/message')
        //     .then((res) => {
        //         console.log(res.data)
        //
        //     }).catch(() => {
        // });
    // }, []);

    return (
        <>
            <div style={{backgroundImage : "url('/img/pngtree-red-love-balloon-thanksgiving-background-material-backgroundthanksgivingthanksgiving-boardadvertising-backgroundthanksgiving-image_70510.jpg')"}} className={'w-full h-full bg-cover'}>
                <div className={'text-center mb-[50%]'}>
                    <div className={'text-5xl text-teal-900'}>Welcome to love diary</div>
                </div>
                <div className={'opacity-0'}>d</div>
            </div>
            {/*<div className={"font-bold"}>tuan</div>*/}
            {/*<div>dsadsa</div>*/}
        </>
    )
}

// Home.getLayout = function getLayout(page: ReactElement) {
//     return (
//         <Layout>
//             {page}
//         </Layout>
//     )
// }

export default Home
