

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

