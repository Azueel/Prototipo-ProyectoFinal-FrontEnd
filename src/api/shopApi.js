import axios from 'axios';

const shopApi = axios.create({
	baseURL: 'http://localhost:4003/',
});

shopApi.interceptors.request.use((config) => {
	config.headers = {
		'x-token': localStorage.getItem('token'),
	};
	return config;
});

export default shopApi;
