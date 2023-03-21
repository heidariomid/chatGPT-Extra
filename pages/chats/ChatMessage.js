const ChatMessage = ({messages = []}) => {
	return (
		<>
			{messages.map((msg, i) => (
				<div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
					{msg.role === 'system' && (
						<div className={`bg-violet-400 text-white w-fit rounded-lg p-2 break-word shadow-md`}>
							<p className={'text-sm'}>{msg.content}</p>
						</div>
					)}
					{msg.role === 'user' && (
						<div className={`bg-gray-100 w-fit rounded-lg p-2 break-word shadow-md`}>
							<p className={'text-gray-700 text-sm'}>{msg.content}</p>
						</div>
					)}
				</div>
			))}
		</>
	);
};

export default ChatMessage;
