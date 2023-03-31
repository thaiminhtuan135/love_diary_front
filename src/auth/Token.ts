// class Token {

// isValidToken(token) {
//     const payload = this.payload(token);
//     if (!payload) {
//         return false;
//     }
//     return true;
// }
//
// payload(token) {
//     const payload = token.split(".");
//     return this.decode(payload);
// }
//
// decode(payload) {
//     return JSON.parse(atob(payload));
// }
// }


const payload = (token: string) => {
    const payload: string = token.split(".")[1];
    return decode(payload);
}

function isValidToken(token: string) {
    return !payload(token) ? false : true;

}

function decode(payload: string) {
    return JSON.parse(atob(payload));
}


export function Token() {
    return {isValidToken, payload, decode}
}

