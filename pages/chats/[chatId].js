import {useUser} from '@auth0/nextjs-auth0/client';
import axios from 'axios';
import {useRouter} from 'next/router';
import {useEffect, useRef, useState} from 'react';
import {BiLoader, BiSend} from 'react-icons/bi';
import {Layout} from '../../components/Layout';
import {useStore} from '../../store/StateContext';
import ChatMessage from './ChatMessage';

const Chat = () => {
	const router = useRouter();
	const {chatId} = router.query;
	const [chat, setChat] = useState({});
	const {user} = useUser();
	const inputRef = useRef(null);
	const [isLoading, setIsLoading] = useState(true);
	const {setChatKey} = useStore();
	const handleSendMessage = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const content = e.target.content.value;
		try {
			const res = await axios.post('/api/chatId', {userMsg: content, authId: user.sub, chatId});
			setChat(res.data);
			setChatKey(Math.random());
			inputRef.current.value = '';
		} catch (error) {
			throw new Error(error);
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.post('/api/chat', {chatId});

				setChat(res.data);
				setIsLoading(false);
			} catch (err) {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [chatId]);
	return (
		<div className=' w-full flex flex-col min-h-screen overflow-hidden flex-shrink-0'>
			<div className='flex flex-col h-full max-h-full'>
				<div className='overflow-y-auto flex-grow px-4 pt-4 pb-20'>
					<ChatMessage key={chat?.id} messages={chat?.messages} />
				</div>

				<div className='w-full'>
					<div>
						<form onSubmit={handleSendMessage} className='flex items-center p-4 w-full'>
							<input
								id='content'
								type='text'
								ref={inputRef}
								className='flex flex-1  rounded-full border border-gray-400 py-2 px-4 mr-2 focus:outline-none focus:border-violet-500'
								placeholder='Type a message...'
							/>
							<button disabled={isLoading} type='submit' className='rounded-full bg-violet-500 text-white p-2 hover:bg-violet-600 focus:outline-none'>
								{isLoading ? <BiLoader className='animate-spin' /> : <BiSend />}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Chat;

Chat.getLayout = (page, pageProps) => {
	return <Layout {...pageProps}>{page}</Layout>;
};
