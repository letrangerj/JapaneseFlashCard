import { error } from '@sveltejs/kit';
import { DeckService } from '$lib/db.js';

export const load = async ({ params }: { params: { id: string } }) => {
	const deckId = parseInt(params.id);
	
	if (isNaN(deckId)) {
		throw error(400, 'Invalid deck ID');
	}

	const deck = await DeckService.getDeckById(deckId);
	
	if (!deck) {
		throw error(404, 'Deck not found');
	}

	return {
		deck
	};
};
