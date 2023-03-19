import Link from 'next/link';
import {FaPlus, FaSadCry} from 'react-icons/fa';

const ChatList = ({chats}) => {
	return (
		<>
			{chats?.length === 0 ? (
				<div className='flex-grow flex flex-col gap-4 items-center justify-center'>
					<span className='text-lg text-gray-700'>No Message Found</span>
					<FaSadCry />
				</div>
			) : (
				<div className='p-4 flex-1  max-h-full h-full'>
					<div className='flex items-center mb-4 '>
						<Link href='/' className=' text-violet-900 w-full flex items-center rounded-md px-4 py-2 border-2 border-violet-500 hover:text-violet-600'>
							<FaPlus className='mr-4' />
							<p className='text-base '>New Chat</p>
						</Link>
					</div>

					<ul className='divide-y divide-gray-300'>
						{chats?.map((chat) => {
							return (
								<li key={chat?._id} className='py-3'>
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
