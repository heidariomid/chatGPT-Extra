import axios from 'axios';
import {useUser} from '@auth0/nextjs-auth0/client';
import {useRef, useState} from 'react';
import NewChat from '../pages/chats/NewChat';
import {Layout} from '../components/Layout/Layout';
const ChatApp = () => {
	const {user} = useUser();
	const inputRef = useRef(null);
	const [isLoading, setIsLoading] = useState(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const content = e.target.content.value;
		try {
			await axios.post('/api/chats', {content, authId: user.sub});
			inputRef.current.value = '';
		} catch (error) {
			throw new Error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<NewChat />
		</>
	);
};

export default ChatApp;

ChatApp.getLayout = (page, pageProps) => {
	return <Layout {...pageProps}>{page}</Layout>;
};
