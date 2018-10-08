const key = 'user-admin-react-node-token';
export const getTokenFromLS = () => {
    return localStorage.getItem(key);
};
export const setTokenToLs = token => {
    localStorage.setItem(key, token)
};

export const deleteTokenFromLs = () => {
    localStorage.removeItem(key);
};

