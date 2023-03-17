import {withPageAuthRequired} from '@auth0/nextjs-auth0';
import axios from 'axios';
import React from 'react';
import {Layout} from '../components/Layout';

const Token = () => {
	const submitTokenHandler = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post('/api/addToken');
			if (response.data.success) {
				alert('Tokens added successfully');
			}
		} catch (error) {
			throw new Error(error);
		}
	};
	return (
		<div>
			<svg className='h-6 w-6 text-green-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
				<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
			</svg>
			<button onClick={submitTokenHandler} className='text-gray-700 font-bold ml-2'>
				Tokens
			</button>
		</div>
	);
};

export default Token;

Token.getLayout = (page, pageProps) => {
	return <Layout {...pageProps}>{page}</Layout>;
};

export const getServerSideProps = withPageAuthRequired();
