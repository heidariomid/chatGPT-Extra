const ChatMessage = ({sender, text, isSentByMe, content}) => {
	return (
		<>
			<div className={`${isSentByMe ? 'mr-auto bg-indigo-500' : 'ml-auto bg-indigo-500'} max-w-xs rounded-lg p-2 text-white mb-2`}>
				<p className='text-sm'>{content}</p>
			</div>
			<div className={`${isSentByMe ? 'ml-auto bg-violet-500' : 'mr-auto bg-violet-500'} max-w-xs rounded-lg p-2 text-white mb-2`}>
				<div className='flex items-center justify-between'>
					<p className='text-sm font-bold'>{sender}</p>
				</div>

				<p className='text-sm'>{text}</p>
			</div>
		</>
	);
};

export default ChatMessage;
