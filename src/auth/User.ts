import {Token} from "@/auth/Token";
import {AppStorage} from "./AppStorage"

const {store, getToken} = AppStorage();
const {payload} = Token();

const responseAfterLogin = (token: string, username: string) => {
    if (token) {
        store(token, username);
    }
}
const hasToken = () => {
    const token = localStorage.getItem("token");
    return !!token;
}
const logIn = () => {
    hasToken();
}
const username = () => {

}

const getUseId = () => {
    const token: string | null = getToken();
    // @ts-ignore
    const userInfo = payload(token);
    return userInfo.id;
}

export function User() {
    return {responseAfterLogin, logIn, username, hasToken, getUseId}
}

