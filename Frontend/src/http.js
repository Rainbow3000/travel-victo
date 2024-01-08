import axios from 'axios';

const baseURL = 'http://localhost:5500/api/';

export const userRequest = axios.create({
	baseURL: baseURL,
});

export const publicRequest = axios.create({
	baseURL: baseURL
});

