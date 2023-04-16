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
// const email = () => {
//     if (!logIn()) {
//         return false;
//     } else {
//         // const payload = payload(localStorage.getItem("token"));
//         return payload(localStorage.getItem("token")).sub;
//     }
// }
// class User {

// responseAfterLogin(token, username) {
//     if (token) {
//         store(token, username);
//     }
//
// }

// hasToken() {
//     const token = localStorage.getItem("token");
//     return !!token;
// }

// loggIn() {
//     this.hasToken();
// }

// name() {
//
// }

// email() {
//     if (this.loggIn()) {
//         const payload = payload(localStorage.getItem("token"));
//         return payload.sub;
//     }
//     return false;
// }
// }

export function User() {
    return {responseAfterLogin, logIn, username, hasToken}
}

// export default User = new User();
