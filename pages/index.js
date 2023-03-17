import Link from 'next/link';
import axios from 'axios';
import {BiSend} from 'react-icons/bi';
import {Layout} from '../components/Layout';
import {useUser} from '@auth0/nextjs-auth0/client';

const NewChat = () => {
	const {user} = useUser();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const content = e.target.content.value;

		try {
			await axios.post('/api/chats', {content});
		} catch (error) {
			throw new Error(error);
		}
	};

	return (
		<div className='flex flex-col justify-center items-center '>
			<div className='text-center mx-4 shadow-xl w-1/2  p-24 rounded-3xl bg-indigo-100'>
				<h1 className='text-4xl font-bold mb-8 text-indigo-900 pb-6'>
					ChatGPT<span className='bg-violet-600 text-white px-3 py-1 rounded-xl ml-2 tracking-wider font-extrabold'> Extra</span>
				</h1>
				<div className='flex flex-row justify-center space-x-4'>
					{!user && (
						<Link href='/api/auth/login'>
							<span className='  text-indigo-900 font-bold py-2 px-4  '>Please</span>
							<span className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full transition duration-200'>Login</span>
							<span className='  text-indigo-900 font-bold py-2 px-4  '>First to send a message!</span>
						</Link>
					)}

					{user && (
						<div className='w-full'>
							<div>
								<form onSubmit={handleSubmit} className='flex items-center p-4 '>
									<input
										id='content'
										type='text'
										className='flex flex-1  rounded-full border border-gray-400 py-2 px-4 mr-2 focus:outline-none focus:border-violet-500'
										placeholder='Type a message...'
									/>
									<button type='submit' className='rounded-full bg-violet-500 text-white p-2 hover:bg-violet-600 focus:outline-none'>
										<BiSend />
									</button>
								</form>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default NewChat;

NewChat.getLayout = (page, pageProps) => {
	return <Layout {...pageProps}>{page}</Layout>;
};