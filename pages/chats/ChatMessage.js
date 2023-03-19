import {v4 as uuidv4} from 'uuid';

const ChatMessage = ({systemMessages = [], userMessages = []}) => {
	const userId = uuidv4();
	const systemId = uuidv4();
	const messages = [];

	for (let i = 0; i < Math.max(systemMessages.length, userMessages.length); i++) {
		if (userMessages[i]) messages.push({message: userMessages[i], type: 'user', id: `${userId}-${i}`});
		if (systemMessages[i]) messages.push({message: systemMessages[i], type: 'system', id: `${systemId}-${i}`});
	}

	const widthClass = `max-w-[${Math.min(Math.ceil(messages.length / 10), 12) * 3}px]`;

	return (
		<>
			{messages.map((msg, index) => (
				<div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
					{msg.type === 'system' && (
						<div className={`bg-violet-400 text-white ${widthClass} rounded-lg p-2 break-word shadow-md`}>
							<p className={'text-sm'}>{msg.message}</p>
						</div>
					)}
					{msg.type === 'user' && (
						<div className={`bg-gray-100 ${widthClass} rounded-lg p-2 break-word shadow-md`}>
							<p className={'text-gray-700 text-sm'}>{msg.message}</p>
						</div>
					)}
				</div>
			))}
		</>
	);
};

export default ChatMessage;
