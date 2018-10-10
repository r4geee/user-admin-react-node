import lscache from 'lscache';

const key = 'user-admin-react-node-token';
export const getTokenFromLS = () => {
    return lscache.get(key);
};
export const setTokenToLs = token => {
    lscache.set(key, token, 10)
};

export const deleteTokenFromLs = () => {
    lscache.remove(key);
};

