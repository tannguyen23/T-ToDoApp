import axios from 'axios';


const axiosClient = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		"Content-Type": "application/json; charset=utf-8",
	},
});

export { axiosClient };
