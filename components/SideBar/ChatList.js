import Link from 'next/link';
import {FaSadCry} from 'react-icons/fa';

const ChatList = ({chats}) => {
	return (
		<>
			{chats?.length === 0 ? (
				<div className='flex-grow flex flex-col gap-4 items-center justify-center'>
					<span className='text-lg text-gray-700'>No Message Found</span>
					<FaSadCry />
				</div>
			) : (
				<div className='p-4 flex-1'>
					<h1 className='text-2xl font-bold text-gray-700 border-b-2 border-gray-400 pb-2'>Messages</h1>
					<ul className='divide-y divide-gray-300'>
						{chats?.map((chat) => {
							return (
								<li key={chat?._id} className='py-4'>
									<Link href={`/chats/${chat?._id}`}>
										<h2 className='text-gray-600  hover:text-violet-700'>{chat?.title}</h2>
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</>
	);
};

export default ChatList;
