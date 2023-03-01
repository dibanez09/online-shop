import React from 'react';
import axios from 'axios';

const processBaseURL = () => {
    let url = process.env.REACT_APP_BASE_URL;
    return url;
}

const client = axios.create({
    baseURL: processBaseURL(),
    withCredentials: true
});

const useClient = () => {
    return client;
}

export default useClient;