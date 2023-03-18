import axios from 'axios';
import {useEffect, useState} from 'react';
import {FaSadCry} from 'react-icons/fa';
import {BiLoader} from 'react-icons/bi';
import ChatList from './ChatList';

export const Sidebar = () => {
	const [chats, setChats] = useState([]);
	const [errMessage, setErrMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get('/api/chatTitles');

				setChats(res.data);
				setIsLoading(false);
			} catch (err) {
				setErrMessage(err.message);
				setIsLoading(false);
			}
		};

		fetchData();
	}, [chats?.length]);
	if (errMessage)
		return (
			<div className='bg-violet-200 h-full w-full flex flex-col overflow-hidden flex-shrink-0'>
				<div className='flex-grow flex flex-col gap-4 items-center justify-center'>
					<span className='text-lg text-red-500'>Error Occured</span>
					<span className='text-lg text-gray-700'>{errMessage}</span>
					<FaSadCry className='text-red-500' />
				</div>
			</div>
		);
	return (
		<div className='bg-violet-100 border-r-2 border-r-gray-200 h-full w-full flex flex-col overflow-hidden flex-shrink-0'>
			{isLoading ? (
				<div className='flex-grow flex flex-col gap-4 items-center justify-center'>
					<span className='text-lg text-gray-700'>Loading...</span>
					<BiLoader />
				</div>
			) : (
				<ChatList chats={chats} />
			)}
		</div>
	);
};

export default Sidebar;
