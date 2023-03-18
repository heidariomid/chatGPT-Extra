import {getSession, withApiAuthRequired} from '@auth0/nextjs-auth0';
import clientPromise from '../../lib/mongodb';

const userProfile = withApiAuthRequired(async (req, res) => {
	const {user} = await req.body;
	if (!user) {
		return res.status(401).json({message: 'Unauthorized'});
	}
	try {
		const client = await clientPromise;
		const db = client.db('chatGPT');
		const userProfile = await db.collection('users').findOne({authId: user.sub});

		if (!userProfile?.tokens) {
			// send a message and say you do not have enought token
			res.status(200).json({error: 'You do not have enough tokens to chat.'});
			return;
		}
		res.status(200).json(userProfile);
	} catch (error) {
		res.status(500).json({error: 'Something went wrong.'});
	}
});

export default userProfile;
