import {getSession, withApiAuthRequired} from '@auth0/nextjs-auth0';
import clientPromise from '../../lib/mongodb';

const chatTitles = withApiAuthRequired(async (req, res) => {
	const {user} = await getSession(req, res);
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

		const chats = await db.collection('chats').find({userId: userProfile._id}).toArray();

		res.status(200).json(chats);
	} catch (error) {
		res.status(500).json({error: 'Something went wrong.'});
	}
});

export default chatTitles;
