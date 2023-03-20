import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import logo from '../../public/favicon.png';
import {useStore} from '../../store/StateContext';
const Header = () => {
	const [userProfile, setUserProfile] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const {chatKey, setChatKey} = useStore();
	const submitTokenHandler = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('/api/addToken');
			if (response.data.success) {
				setChatKey(Math.random());
			}
		} catch (error) {
			throw new Error(error);
		}
	};
	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const res = await axios.get('/api/userProfile');
				setUserProfile(res.data);
				setIsLoading(false);
			} catch (err) {
				// setErrMessage(err.message);
				setIsLoading(false);
			}
		};

		fetchData();
	}, [chatKey]);
	return (
		<>
			<header className='bg-violet-300 text-white py-4'>
				<div className='container mx-auto px-4'>
					<nav className='flex items-center justify-between'>
						<div className='flex flex-row items-center gap-2 text-xl font-bold'>
							<Image src={logo} alt='Logo' className='h-12' width={50} height={50} />
							<Link href='/'>ChatGPT Extra</Link>
						</div>
						{userProfile && !isLoading ? (
							<ul className='flex items-center gap-x-4'>
								<li>
									<button onClick={submitTokenHandler} className='block px-4 py-2 bg-violet-500  hover:text-gray-300'>
										{/* add remaining token with icon */}
										Token :<span> {userProfile?.tokens}</span>
									</button>
								</li>
								<li>
									<Link href='/api/auth/logout' className='block px-4 py-2  hover:text-gray-300 bg-violet-600'>
										Logout
									</Link>
								</li>
							</ul>
						) : (
							<ul className='flex items-center'>
								<li>
									<Link href='/api/auth/login' className='block px-4 py-2 hover:text-gray-300 bg-gray-600'>
										Login
									</Link>
								</li>
							</ul>
						)}
					</nav>
				</div>
			</header>
		</>
	);
};

export default Header;
