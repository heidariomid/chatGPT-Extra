import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const login = async (email, password) => {
	try {
		const response = await axios.post(`${API_URL}/auth/login`, {
			email,
			password,
		});
		const {token} = response.data;
		localStorage.setItem('token', token);
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		return response.data;
	} catch (error) {
		console.error(error);
		throw new Error(error.response.data.message);
	}
};

export const logout = () => {
	localStorage.removeItem('token');
	delete axios.defaults.headers.common['Authorization'];
};

export const getUserProfile = async () => {
	try {
		const response = await axios.get(`${API_URL}/users/me`);
		return response.data;
	} catch (error) {
		console.error(error);
		throw new Error(error.response.data.message);
	}
};
