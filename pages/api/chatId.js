import {getSession, withApiAuthRequired} from '@auth0/nextjs-auth0';
import {ObjectId} from 'mongodb';
import {Configuration, OpenAIApi} from 'openai';
import clientPromise from '../../lib/mongodb';

const chatId = withApiAuthRequired(async (req, res) => {
	const {userMsg, authId, chatId} = req.body;
	const {user} = await getSession(req, res);
	if (!user) {
		return res.status(401).json({message: 'Unauthorized'});
	}
	const client = await clientPromise;
	const db = client.db('chatGPT');
	const userProfile = await db.collection('users').findOne({authId});
	if (!userProfile?.tokens) {
		res.status(403).json({message: 'Unauthorized'});
		return;
	}

	const prompt = `{"role":"user","content":"${userMsg}"},please response with following format Result:[result goes here in single line]`;
	const config = new Configuration({
		apiKey: process.env.OPENAI_API_KEY,
		organization: process.env.ORGANIZATION_ID,
	});
	const openai = new OpenAIApi(config);

	const chat = await db.collection('chats').findOne({_id: ObjectId(chatId)});
	const messages = chat.messages || [];

	try {
		const response = await openai.createCompletion({
			model: 'text-davinci-003',
			prompt,
			temperature: 0.7,
			max_tokens: 1000,
			top_p: 1.0,
			frequency_penalty: 0.0,
			presence_penalty: 0.0,
		});
		const inputString = response.data.choices[0].text;
		const textMatch = inputString.match(/^Result:\s*(.*)$/m);
		const systemMsg = textMatch ? textMatch[1] : '';
		const authIdExtract = authId.split('|');
		const userAuthId = authIdExtract[1];

		messages.push({role: 'system', content: systemMsg}, {role: 'user', content: userMsg});

		const responseObj = {
			userId: userProfile._id,
			messages,
			authId: userAuthId,
			createdAt: new Date(),
		};

		await db.collection('users').updateOne({authId: user.sub}, {$inc: {tokens: -1}});
		await db.collection('chats').updateOne(
			{_id: ObjectId(chatId)},
			{
				$push: {
					messages: {
						$each: [
							{role: 'system', content: systemMsg},
							{role: 'user', content: userMsg},
						],
					},
				},
			},
		);

		res.status(200).json(responseObj);
	} catch (error) {
		res.status(500).json({error: 'Something went wrong.'});
	}
});

export default chatId;
