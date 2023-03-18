import {useUser} from '@auth0/nextjs-auth0/client';
import axios from 'axios';
import {useRouter} from 'next/router';
import {useEffect, useRef, useState} from 'react';
import {BiLoader, BiSend} from 'react-icons/bi';
import {Layout} from '../../components/Layout';
import ChatMessage from './ChatMessage';

const Chat = () => {
	const router = useRouter();
	const {chatId} = router.query;
	const [chat, setChat] = useState({});
	const {user} = useUser();
	const inputRef = useRef(null);
	// extract id from user auth0|640e38965c5d4c4a5fb1fd57
	const extractcurrentUserAuthId = user?.sub?.split('|');
	const currentUserAuthId = extractcurrentUserAuthId && extractcurrentUserAuthId[1];
	const [errMessage, setErrMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const handleSendMessage = (e) => {
		e.preventDefault();
		// implement sending new message functionality here
	};
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.post('/api/chat', {chatId});
				console.log(res.data);
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
		<div className=' w-full flex flex-col overflow-hidden flex-shrink-0'>
			{isLoading ? (
				<div className='flex-grow flex flex-col gap-4 items-center justify-center'>
					<span className='text-lg text-gray-700'>Loading...</span>
					<svg className='animate-spin h-5 w-5 text-gray-600' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
						<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
						<path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm12 0a8 8 0 100-16 8 8 0 000 16z' />
					</svg>
				</div>
			) : (
				<div className='flex flex-col h-full max-h-full'>
					<div className='overflow-y-auto flex-grow px-4 pt-4 pb-20'>
						<ChatMessage key={chat?.id} sender={chat?.sender} text={chat?.text} isSentByMe={chat?.authId === currentUserAuthId} content={chat?.content} />
					</div>
					{/* <div className='absolute bottom-0 left-0 w-full'>
						<form onSubmit={handleSendMessage} className='flex items-center p-4'>
							<input
								type='text'
								className='flex-grow rounded-full border border-gray-400 py-2 px-4 mr-2 focus:outline-none focus:border-blue-500'
								placeholder='Type a message....'
							/>
							<button type='submit' className='rounded-full bg-blue-500 text-white p-2 hover:bg-blue-600 focus:outline-none'>
								<svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
									<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
								</svg>
							</button>
						</form>
					</div> */}
					<div className='w-full'>
						<div>
							<form onSubmit={handleSendMessage} className='flex items-center p-4 '>
								<input
									id='content'
									type='text'
									ref={inputRef}
									className='flex flex-1  rounded-full border border-gray-400 py-2 px-4 mr-2 focus:outline-none focus:border-violet-500'
									placeholder='Type a message...'
								/>
								<button disabled={isLoading} type='submit' className='rounded-full bg-violet-500 text-white p-2 hover:bg-violet-600 focus:outline-none'>
									{isLoading ? <BiLoader /> : <BiSend />}
								</button>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Chat;

Chat.getLayout = (page, pageProps) => {
	return <Layout {...pageProps}>{page}</Layout>;
};
