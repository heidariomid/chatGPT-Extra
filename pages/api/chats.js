import {getSession, withApiAuthRequired} from '@auth0/nextjs-auth0';
import {Configuration, OpenAIApi} from 'openai';
import clientPromise from '../../lib/mongodb';

const chats = withApiAuthRequired(async (req, res) => {
	const {content, authId} = req.body;
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
	const prompt = `Please generate a related title for the following content and put the title in a new line with following format Title:[title generated goes here] ,then in the new line give me a result of the content : ${content} , and put the result in a new line with following format Result:[result generated goes here] }`;

	const config = new Configuration({
		apiKey: process.env.OPENAI_API_KEY,
	});
	const openai = new OpenAIApi(config);
	const messages = [];

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
		const titleMatch = inputString.match(/Title:\s*(.*)\s*\n/);
		const title = titleMatch ? titleMatch[1] : '';
		const textMatch = inputString.match(/^Result:\s*(.*)$/m);
		const text = textMatch ? textMatch[1] : '';
		const authIdExtract = authId.split('|');
		const userAuthId = authIdExtract[1];

		messages.push({role: 'system', content: text}, {role: 'user', content});

		const responseObj = {
			userId: userProfile._id,
			title,
			messages,
			authId: userAuthId,
			createdAt: new Date(),
		};

		await db.collection('users').updateOne({authId: user.sub}, {$inc: {tokens: -1}});
		await db.collection('chats').insertOne(responseObj);
		res.status(200).json(responseObj);
	} catch (error) {
		res.status(500).json({error: 'Something went wrong !!!'});
	}
});

export default chats;
