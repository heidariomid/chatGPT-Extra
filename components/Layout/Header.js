import {useUser} from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import logo from '../../public/favicon.png';
const Header = () => {
	const {user} = useUser();
	const [userProfile, setUserProfile] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.post('/api/userProfile', {user});
				setUserProfile(res.data);
				setIsLoading(false);
			} catch (err) {
				// setErrMessage(err.message);
				setIsLoading(false);
			}
		};

		fetchData();
	}, [user]);
	if (isLoading) return <div>Loading...</div>;
	return (
		<>
			<header className='bg-gray-900 text-white py-4'>
				<div className='container mx-auto px-4'>
					<nav className='flex items-center justify-between'>
						<div className='flex flex-row items-center gap-2 text-xl font-bold'>
							<Image src={logo} alt='Logo' className='h-12' width={50} height={50} />
							<Link href='/'>ChatGPT Extra</Link>
						</div>
						{user ? (
							<ul className='flex items-center'>
								<li>
									<Link href='/' className='block px-4 py-2 hover:text-gray-300'>
										New Chat
									</Link>
								</li>
								<li>
									<Link href='/token' className='block px-4 py-2 hover:text-gray-300'>
										{/* add remaining token with icon */}
										<div className='flex justify-center items-center gap-2'>
											<div>
												Token :<span className='text-red-500'> {userProfile?.tokens}</span>
											</div>
										</div>
									</Link>
								</li>
								<li>
									<Link href='/api/auth/logout' className='block px-2 py-1 hover:text-gray-300 bg-gray-500'>
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
