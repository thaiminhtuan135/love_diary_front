
//
// class AppStorage {
//     storeToken(token) {
//         localStorage.setItem("token", token);
//     }
//
//     storeUser(user) {
//         localStorage.setItem("user", user);
//     }
//
//     store(token, user) {
//         this.storeToken(token);
//         this.storeUser(user);
//     }
//
//     clear() {
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//     }
//
//     getToken() {
//         localStorage.getItem("token");
//     }
//
//     getUser() {
//         localStorage.getItem("user");
//     }
// }

// function storeToken(token: string) {
//     localStorage.setItem("token", token);
//
// }
    const storeToken = (token: string) => localStorage.setItem("token", token);
    const storeUser = (user: string) => localStorage.setItem("user", user);

    const store = (token: string, user: string) => {
        storeToken(token);
        storeUser(user);
    }
    const clear = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
    const getToken = () => {
        localStorage.getItem("token");
    }
    const getUser = () => {
        localStorage.getItem("user");
    }


export function AppStorage(){
    return {storeToken, storeUser, store, clear, getToken, getUser}
}
