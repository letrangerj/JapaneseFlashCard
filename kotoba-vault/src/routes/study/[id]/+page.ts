import { DeckService } from '$lib/db.js';
import { browser } from '$app/environment';

export const load = async ({ params }: { params: { id: string } }) => {
	try {
		const deckId = parseInt(params.id);
		if (isNaN(deckId)) {
			return { deck: null, notFound: true };
		}
		
		if (!browser) {
			// 服务器端：返回占位数据
			return { 
				deck: { 
					id: deckId, 
					name: '加载中...', 
					description: '', 
					cards: [], 
					createdAt: new Date(), 
					updatedAt: new Date() 
				}, 
				notFound: false 
			};
		}
		
		// 客户端：尝试获取真实数据
		const deck = await DeckService.getDeckById(deckId);
		if (!deck) {
			return { deck: null, notFound: true };
		}
		return { deck, notFound: false };
		
	} catch (error) {
		console.error('Load error:', error);
		return { deck: null, notFound: true };
	}
};
