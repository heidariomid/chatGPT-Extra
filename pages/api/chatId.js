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
	const prompt = `Please generate a related content for the following content ,then in the new line give me a result of the content : ${userMsg} , and put the result in a new line with following format Result:[result generated goes here] }`;
	const config = new Configuration({
		apiKey: process.env.OPENAI_API_KEY,
	});
	const openai = new OpenAIApi(config);
	const chat = await db.collection('chats').findOne({_id: ObjectId(chatId)});
	const systemMessages = chat.systemMessages || [];
	const userMessages = chat.userMessages || [];
	try {
		const response = await openai.createCompletion({
			model: 'text-davinci-003',
			prompt,
			temperature: 0,
			max_tokens: 2200,
		});
		const inputString = response.data.choices[0].text;

		const textMatch = inputString.match(/Result:\s*(.*)$/);
		const systemMsg = textMatch ? textMatch[1] : '';
		const authIdExtract = authId.split('|');
		const userAuthId = authIdExtract[1];
		systemMessages.push(systemMsg);
		userMessages.push(userMsg);
		const responseObj = {
			userId: userProfile._id,
			systemMessages,
			userMessages,
			authId: userAuthId,
			createdAt: new Date(),
		};
		await db.collection('users').updateOne({authId: user.sub}, {$inc: {tokens: -1}});
		await db.collection('chats').updateOne(
			{_id: ObjectId(chatId)},
			{
				$push: {
					systemMessages: systemMsg,
					userMessages: userMsg,
				},
			},
		);

		res.status(200).json(responseObj);
	} catch (error) {
		console.log(error);
		res.status(500).json({error: 'Something went wrong.'});
	}
});

export default chatId;
