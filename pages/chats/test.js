import {useRouter} from 'next/router';
import {useState} from 'react';
import Link from 'next/link';
import {FaArrowLeft} from 'react-icons/fa';
import Head from 'next/head';
import {getSession} from '@auth0/nextjs-auth0';
import clientPromise from '../../lib/mongodb';
const messages = [
	{id: '1', sender: 'John', text: 'Hey there!'},
	{id: '2', sender: 'Mary', text: 'Hi John!'},
	{id: '3', sender: 'John', text: 'How are you doing?'},
	{id: '4', sender: 'Mary', text: "I'm good, thanks. How about you?"},
	{id: '5', sender: 'John', text: "I'm doing great, thanks!"},
];

const ChatMessage = ({sender, text, isSentByMe}) => {
	return (
		<div className={`${isSentByMe ? 'ml-auto bg-gray-300' : 'mr-auto bg-blue-500'} max-w-xs rounded-lg p-2 text-white mb-2`}>
			<div className='flex items-center justify-between'>
				<p className='text-sm font-bold'>{sender}</p>
			</div>
			<p className='text-sm'>{text}</p>
		</div>
	);
};

const ChatTest = async () => {
	const router = useRouter();
	const {id} = router.query;
	const {user} = await getSession(req, res);
	if (!user) {
		return res.status(401).json({message: 'Unauthorized'});
	}
	const client = await clientPromise;
	const db = client.db('chatGPT');
	console.log({user, id});
	const userProfile = await db.collection('users').findOne({userId: user.sub});
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [chatMessages, setChatMessages] = useState([]);

	// eslint-disable-next-line react-hooks/rules-of-hooks
	// useEffect(() => {
	// 	setChatMessages(messages.filter((msg) => msg.id !== id));
	// }, [id]);
	const handleSendMessage = (e) => {
		e.preventDefault();
		// implement sending new message functionality here
	};
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [post, setPost] = useState(null);
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [errMessage, setErrMessage] = useState(null);
	// eslint-disable-next-line react-hooks/rules-of-hooks
	// useEffect(() => {
	// 	if (id) {
	// 		axios
	// 			.get(`/api/chats/${id}`)
	// 			.then((res) => {
	// 				setPost(res.data);
	// 			})
	// 			.catch((err) => {
	// 				setErrMessage(err.message);
	// 			});
	// 	}
	// }, [id]);

	if (!errMessage) {
		return (
			<div className='flex h-screen items-center justify-center'>
				<div className='bg-gray-100 p-8 rounded-lg shadow-xl'>
					<h1 className='text-black font-bold mb-4'>Error</h1>
					<p className='text-red-500 mb-4'>{errMessage}</p>
					<Link href='/chat/new'>
						<div className='flex mt-8 items-center text-gray-600 hover:text-black transition duration-200'>
							<FaArrowLeft className='mr-2' />
							Back to Posts
						</div>
					</Link>
				</div>
			</div>
		);
	}
	if (post) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Head>
				<title>Chat with {id}</title>
			</Head>
			{/* <div className='flex flex-col h-screen'>
				<div className='overflow-y-auto flex-grow px-4 pt-4 pb-20'>
					{chatMessages?.map((msg) => (
						<ChatMessage key={msg.id} sender={msg.sender} text={msg.text} isSentByMe={msg.sender === 'John'} />
					))}
				</div>
				<div className='absolute bottom-0 left-0 w-full'>
					<form onSubmit={handleSendMessage} className='flex items-center p-4'>
						<input
							type='text'
							className='flex-grow rounded-full border border-gray-400 py-2 px-4 mr-2 focus:outline-none focus:border-blue-500'
							placeholder='Type a message...'
						/>
						<button type='submit' className='rounded-full bg-blue-500 text-white p-2 hover:bg-blue-600 focus:outline-none'>
							<svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
							</svg>
						</button>
					</form>
				</div>
			</div> */}
		</>
	);
};

export default ChatTest;

// Post.getLayout = (page, pageProps) => {
// 	return <Layout {...pageProps}>{page}</Layout>;
// };
