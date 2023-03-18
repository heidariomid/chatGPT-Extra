import axios from 'axios';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {Layout} from '../../components/Layout';

const Chat = () => {
	const router = useRouter();
	const {chatId} = router.query;
	const [chat, setChat] = useState([]);
	const [errMessage, setErrMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.post('/api/chat', {chatId});
				setChat(res.data);
				setIsLoading(false);
			} catch (err) {
				// setErrMessage(err.message);
				setIsLoading(false);
			}
		};

		fetchData();
	}, [chatId]);
	// if (errMessage) return <div>{errMessage}</div>;
	return (
		<div className=' h-screen w-full flex flex-col overflow-hidden flex-shrink-0'>
			{isLoading ? (
				<div className='flex-grow flex flex-col gap-4 items-center justify-center'>
					<span className='text-lg text-gray-700'>Loading...</span>
					<svg className='animate-spin h-5 w-5 text-gray-600' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
						<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
						<path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 100-16 8 8 0 000 16z' />
					</svg>
				</div>
			) : (
				<div className='p-4 flex-1'>
					<h1 className='text-2xl font-bold text-gray-700 border-b-2 border-gray-400 pb-2'>{chat?.title}</h1>
					<ul key={chat?._id} className='divide-y divide-gray-300'>
						<li className='py-4'>
							<h2 className='text-gray-600  hover:text-violet-700'>{chat?.text}</h2>
						</li>
					</ul>
				</div>
			)}
		</div>
	);
};

export default Chat;

Chat.getLayout = (page, pageProps) => {
	return <Layout {...pageProps}>{page}</Layout>;
};
