import {getSession} from '@auth0/nextjs-auth0';
import clientPromise from '../../lib/mongodb';

const addToken = async (req, res) => {
	const {user} = await getSession(req, res);
	console.log(user);
	if (!user) {
		return res.status(401).json({message: 'Unauthorized'});
	}
	const client = await clientPromise;
	const db = client.db('chatGPT');
	const userProfile = await db.collection('users').findOne({authId: user.sub});

	if (!userProfile) {
		await db.collection('users').insertOne({
			authId: user.sub,
			tokens: 10,
		});
	} else {
		await db.collection('users').updateOne({authId: user.sub}, {$inc: {tokens: 10}});
	}

	return res.status(200).json({message: 'Tokens added successfully', success: true});
};

export default addToken;
