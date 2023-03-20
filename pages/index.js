import NewChat from '../pages/chats/NewChat';
import {Layout} from '../components/Layout/Layout';

const ChatApp = () => {
	return (
		<div className='flex flex-col min-h-screen'>
			<div className='flex-1 overflow-hidden'>
				<NewChat />
			</div>
		</div>
	);
};

export default ChatApp;

ChatApp.getLayout = (page, pageProps) => {
	return <Layout {...pageProps}>{page}</Layout>;
};
