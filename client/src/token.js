import {deleteTokenFromLs, getTokenFromLS, setTokenToLs} from './localStorage';
import {deleteTokenHeader, setTokenHeader} from './axios';

export const initToken = () => {
    const storedToken = getTokenFromLS();
    if (storedToken) {
        setTokenHeader(storedToken)
    }
};

export const setToken = token => {
    setTokenHeader(token);
    setTokenToLs(token);
};

export const deleteToken = () => {
    deleteTokenHeader();
    deleteTokenFromLs();
};
