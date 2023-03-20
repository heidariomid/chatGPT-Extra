import '../styles/globals.css';
import {UserProvider} from '@auth0/nextjs-auth0/client';
import {ErrorBoundary} from 'react-error-boundary';
import {StateProvider} from '../store/StateContext';

const App = ({Component, pageProps}) => {
	const getLayout = Component.getLayout || ((page) => page);
	return (
		<UserProvider>
			<StateProvider>
				{getLayout(
					<ErrorBoundary>
						<Component {...pageProps} />
					</ErrorBoundary>,
					pageProps,
				)}
			</StateProvider>
		</UserProvider>
	);
};

export default App;
