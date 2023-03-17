import nlp from 'compromise';

const generateTitle = (content) => {
	// Tokenize and tag the content
	const doc = nlp(content);

	// Extract noun phrases and named entities
	const phrases = doc.nouns().out('array');
	const entities = doc
		.nouns()
		.out('tags')
		.filter((tag) => tag === 'Person' || tag === 'Place' || tag === 'Organization');

	// Concatenate the phrases and entities to form the title
	const title = [...phrases, ...entities].join(' ');

	return title;
};

export default generateTitle;
