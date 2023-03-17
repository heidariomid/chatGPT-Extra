import axios from 'axios';
import {useEffect, useState} from 'react';
import ChatList from './ChatList';

export const Sidebar = () => {
	const [chats, setChats] = useState([]);
	const [errMessage, setErrMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		axios
			.get(`/api/chatTitles`)
			.then((res) => {
				console.log(res.data);
				setChats(res.data);
				setIsLoading(false);
			})
			.catch((err) => {
				setErrMessage(err.message);
				setIsLoading(false);
			});
	}, [chats?.length]);

	return (
		<div className='bg-gray-200 h-screen w-full flex flex-col overflow-hidden flex-shrink-0'>
			{isLoading ? (
				<div className='flex-grow flex flex-col gap-4 items-center justify-center'>
					<span className='text-lg text-gray-700'>Loading...</span>
					<svg className='animate-spin h-5 w-5 text-gray-600' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
						<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
						<path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 100-16 8 8 0 000 16z' />
					</svg>
				</div>
			) : (
				<ChatList chats={chats} />
			)}
		</div>
	);
};

export default Sidebar;
