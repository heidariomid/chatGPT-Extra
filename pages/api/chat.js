import {getSession, withApiAuthRequired} from '@auth0/nextjs-auth0';
import clientPromise from '../../lib/mongodb';
const {ObjectId} = require('mongodb');

const chat = withApiAuthRequired(async (req, res) => {
	const {chatId} = req.body;
	const chatObjectId = new ObjectId(chatId);
	const {user} = await getSession(req, res);
	if (!user) {
		return res.status(401).json({message: 'Unauthorized'});
	}
	try {
		const client = await clientPromise;
		const db = client.db('chatGPT');
		const userProfile = await db.collection('users').findOne({authId: user.sub});
		if (!userProfile?.tokens) {
			res.status(403).json({message: 'Unauthorized'});
			return;
		}

		const chat = await db.collection('chats').findOne({_id: chatObjectId, userId: userProfile._id});
		res.status(200).json(chat);
	} catch (error) {
		res.status(500).json({error: 'Something went wrong.'});
	}
});

export default chat;
