import axios from 'axios';

const shopApi = axios.create({
	baseURL: 'backendproducto.up.railway.app',
});

shopApi.interceptors.request.use((config) => {
	config.headers = {
		'x-token': localStorage.getItem('token'),
	};
	return config;
});

export default shopApi;
