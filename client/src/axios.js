import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api'
});

export const setTokenHeader = token => {
    instance.defaults.headers.common['Authorization'] = token;
};

export const deleteTokenHeader = () => {
    delete instance.defaults.headers.common['Authorization']
};

export default instance;
