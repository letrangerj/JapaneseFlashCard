import Dexie, { type Table } from 'dexie';

// 检查 IndexedDB 支持
function checkIndexedDBSupport(): boolean {
	if (typeof window === 'undefined') return false;
	return 'indexedDB' in window && window.indexedDB !== null;
}

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
		
		// 处理 IndexedDB 不可用的情况
		this.on('ready', () => {
			console.log('IndexedDB 连接成功');
		});
		
		this.on('blocked', () => {
			console.warn('IndexedDB 被阻塞');
		});
	}
}

// 初始化数据库实例，但在服务器端不执行
export const db = checkIndexedDBSupport() ? new KotobaVaultDB() : null;

// 内存回退实现
class InMemoryDeckStore {
	private decks: DeckData[] = [];
	private idSeq = 1;

	constructor() {
		// 添加一些初始测试数据
		this.initializeTestData();
	}

	private initializeTestData() {
		const testDeck: DeckData = {
			id: 1,
			name: "基础日语词汇",
			description: "常用的日语基础词汇学习卡片组",
			cards: [
				{
					id: 1,
					word: "水",
					reading: "みず",
					meanings: ["水"],
					examples: [
						{
							jp_furigana: "水を飲みます。",
							jp_clean: "水を飲みます。",
							cn: "喝水。"
						}
					]
				},
				{
					id: 2,
					word: "本",
					reading: "ほん",
					meanings: ["书", "本"],
					examples: [
						{
							jp_furigana: "本を読みます。",
							jp_clean: "本を読みます。",
							cn: "读书。"
						}
					]
				},
				{
					id: 3,
					word: "学校",
					reading: "がっこう",
					meanings: ["学校"],
					examples: [
						{
							jp_furigana: "学校に行きます。",
							jp_clean: "学校に行きます。",
							cn: "去学校。"
						}
					]
				}
			],
			createdAt: new Date(),
			updatedAt: new Date()
		};
		this.decks.push(testDeck);
		this.idSeq = 2;
	}

	async getAll(): Promise<DeckData[]> { return [...this.decks].sort((a,b)=>b.updatedAt.getTime()-a.updatedAt.getTime()); }
	async get(id:number): Promise<DeckData | undefined> { return this.decks.find(d=>d.id===id); }
	async add(deck: Omit<DeckData,'id'>): Promise<number> { const id = this.idSeq++; this.decks.push({...deck,id}); return id; }
	async update(id:number, changes: Partial<DeckData>): Promise<number> { const d = this.decks.find(x=>x.id===id); if(!d) return 0; Object.assign(d, changes); return 1; }
	async delete(id:number): Promise<void> { this.decks = this.decks.filter(d=>d.id!==id); }
	async clear() { this.decks = []; }
	async bulkAdd(list: DeckData[]) { for (const d of list) { if(!d.id) d.id = this.idSeq++; this.decks.push(d); } }
}

const memoryStore = !db ? new InMemoryDeckStore() : null;

// 重写 DeckService 使用回退存储
export class DeckService {
	static async getAllDecks(): Promise<DeckData[]> {
		if (db) return await db.decks.orderBy('updatedAt').reverse().toArray();
		return await memoryStore!.getAll();
	}
	static async getDeckById(id: number): Promise<DeckData | undefined> {
		if (db) return await db.decks.get(id);
		return await memoryStore!.get(id);
	}
	static async addDeck(deck: Omit<DeckData, 'id'>): Promise<number> {
		if (db) return await db.decks.add(deck);
		return await memoryStore!.add(deck);
	}
	static async updateDeck(id: number, changes: Partial<DeckData>): Promise<number> {
		if (db) return await db.decks.update(id, { ...changes, updatedAt: new Date() });
		return await memoryStore!.update(id, { ...changes, updatedAt: new Date() });
	}
	static async deleteDeck(id: number): Promise<void> {
		if (db) return await db.decks.delete(id);
		return await memoryStore!.delete(id);
	}
	static async updateDeckName(id: number, name: string): Promise<number> {
		if (db) return await db.decks.update(id, { name, updatedAt: new Date() });
		return await memoryStore!.update(id, { name, updatedAt: new Date() });
	}
	static async exportAllData(): Promise<string> {
		const decks = await this.getAllDecks();
		return JSON.stringify(decks, null, 2);
	}
	static async importData(jsonData: string): Promise<void> {
		const decks: DeckData[] = JSON.parse(jsonData);
		if (db) {
			await db.decks.clear();
			await db.decks.bulkAdd(decks);
		} else {
			await memoryStore!.clear();
			await memoryStore!.bulkAdd(decks);
		}
	}
}
