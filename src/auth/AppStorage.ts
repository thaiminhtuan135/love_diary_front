 const storeToken = (token: string) => {
        localStorage.setItem("token", token)
        setTimeout(function (){
          localStorage.removeItem('token')
        },1000 * 60 * 60)
    };
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
        return localStorage.getItem("token");
        // localStorage.getItem("token");
    }
    const getUser = () => {
        localStorage.getItem("user");
    }


export function AppStorage(){
    return {storeToken, storeUser, store, clear, getToken, getUser}
}
