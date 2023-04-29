import {Token} from "@/auth/Token";
import {AppStorage} from "./AppStorage"

const { store } = AppStorage();
const { payload } = Token();

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

export function User() {
    return {responseAfterLogin, logIn, username, hasToken}
}

