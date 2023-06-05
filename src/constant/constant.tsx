export const STATUS = {
    "OK": 200,
    "BAD_REQUEST": 400,
    "UNAUTHORIZED": 401,
    "NOT_FOUND": 404,
    "INTERNAL_ERR": 500,
}

export enum ROLE  {
    ADMIN = "ADMIN",
    USER = "USER",
}

export const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
    max: '${label} must be exceeded ${max} characters',
    min: '${label} must be less than ${max} characters',
};


export const exploreWorlds = [
    {
        id: 'world-1',
        imgUrl: '/tech3.jpg',
        title: 'The Hogwarts',
    },
    {
        id: 'world-2',
        imgUrl: '/tech4.jpg',
        title: 'The Upside Down',
    },
    {
        id: 'world-3',
        imgUrl: '/iot.jpg',
        title: 'Kadirojo Permai',
    },
    {
        id: 'world-4',
        imgUrl: '/tech5.jpg',
        title: 'Paradise Island',
    },
    {
        id: 'world-5',
        imgUrl: '/tech6.jpg',
        title: 'Hawkins Labs',
    },
];