import Head from 'next/head';
import {Sidebar} from '../SideBar';
import Header from './Header';

export const Layout = ({children}) => {
	return (
		<div className='min-h-screen overflow-hidden'>
			<Head>
				<title>chatGPT Extra</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Header />
			<main className='grid grid-cols-[300px_1fr] '>
				<Sidebar />
				{children}
			</main>

			<footer className='bg-violet-300 text-white py-4'>
				<div className='container mx-auto px-4'>
					<p className='text-center'>&copy; 2023 chatGPT Extra. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
};
