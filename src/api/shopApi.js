import axios from 'axios';

const shopApi = axios.create({
	baseURL: 'http://localhost:4003/',
});

export default shopApi;
