import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {useCookies} from 'react-cookie';
import {login, logout, getUserProfile} from './api';

export const useAuth = () => {
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [cookies, setCookie, removeCookie] = useCookies(['token']);
	const router = useRouter();

	const loginHandler = async (email, password) => {
		setLoading(true);
		setError(null);
		try {
			const token = await login(email, password);
			setCookie('token', token, {path: '/'});
			router.push('/');
		} catch (error) {
			setError(error.message);
		}
		setLoading(false);
	};

	const logoutHandler = async () => {
		setLoading(true);
		setError(null);
		try {
			await logout();
			removeCookie('token', {path: '/'});
			router.push('/login');
		} catch (error) {
			setError(error.message);
		}
		setLoading(false);
	};

	useEffect(() => {
		const getUser = async () => {
			setLoading(true);
			setError(null);
			try {
				const user = await getUserProfile();
				setUser(user);
			} catch (error) {
				setError(error.message);
				removeCookie('token', {path: '/'});
			}
			setLoading(false);
		};

		const token = cookies.token;
		if (token) {
			setCookie('token', token, {path: '/'});
			getUser();
		} else {
			setUser(null);
			setLoading(false);
		}
	}, []);

	return {user, error, loading, login: loginHandler, logout: logoutHandler};
};
