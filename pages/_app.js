import '../styles/globals.css';
import {UserProvider} from '@auth0/nextjs-auth0/client';
import {ErrorBoundary} from 'react-error-boundary';
function MyApp({Component, pageProps}) {
	const getLayout = Component.getLayout || ((page) => page);
	return (
		<>
			<UserProvider>
				{getLayout(
					<ErrorBoundary>
						{' '}
						<Component {...pageProps} />
					</ErrorBoundary>,
					pageProps,
				)}
			</UserProvider>
		</>
	);
}

export default MyApp;
