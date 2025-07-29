import Dexie, { type Table } from 'dexie';

export interface DeckData {
	id?: number;
	name: string;
	description: string;
	cards: CardData[];
	createdAt: Date;
	updatedAt: Date;
}

export interface CardData {
	id: number;
	word: string;
	reading: string;
	meanings: string[];
	examples: ExampleData[];
}

export interface ExampleData {
	jp_furigana: string;
	jp_clean: string;
	cn: string;
}

export class KotobaVaultDB extends Dexie {
	decks!: Table<DeckData>;

	constructor() {
		super('KotobaVaultDB');
		this.version(1).stores({
			decks: '++id, name, createdAt'
		});
	}
}

export const db = new KotobaVaultDB();

// 数据库操作方法
export class DeckService {
	static async getAllDecks(): Promise<DeckData[]> {
		return await db.decks.orderBy('updatedAt').reverse().toArray();
	}

	static async getDeckById(id: number): Promise<DeckData | undefined> {
		return await db.decks.get(id);
	}

	static async addDeck(deck: Omit<DeckData, 'id'>): Promise<number> {
		return await db.decks.add(deck);
	}

	static async updateDeck(id: number, changes: Partial<DeckData>): Promise<number> {
		return await db.decks.update(id, { ...changes, updatedAt: new Date() });
	}

	static async deleteDeck(id: number): Promise<void> {
		await db.decks.delete(id);
	}

	static async exportAllData(): Promise<string> {
		const decks = await this.getAllDecks();
		return JSON.stringify(decks, null, 2);
	}

	static async importData(jsonData: string): Promise<void> {
		try {
			const decks: DeckData[] = JSON.parse(jsonData);
			await db.decks.clear();
			await db.decks.bulkAdd(decks);
		} catch (error) {
			throw new Error('导入数据格式错误');
		}
	}
}
