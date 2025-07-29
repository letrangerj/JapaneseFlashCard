import type { DeckData, CardData, ExampleData } from './db.js';

export class MarkdownParser {
	static parseMarkdownToDeck(content: string, filename: string): Omit<DeckData, 'id'> {
		const lines = content.split('\n');
		const deck: Omit<DeckData, 'id'> = {
			name: '',
			description: '',
			cards: [],
			createdAt: new Date(),
			updatedAt: new Date()
		};

		let currentCard: Partial<CardData> | null = null;
		let currentSection = '';
		let cardId = 1;

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i].trim();

			// 解析标题
			if (line.startsWith('# ')) {
				deck.name = line.substring(2).trim();
				deck.description = `来自文件: ${filename}`;
				continue;
			}

			// 解析单词卡片开始
			if (line.startsWith('## ')) {
				// 保存上一张卡片
				if (currentCard && currentCard.word && currentCard.reading) {
					deck.cards.push({
						id: cardId++,
						word: currentCard.word,
						reading: currentCard.reading,
						meanings: currentCard.meanings || [],
						examples: currentCard.examples || []
					});
				}

				// 开始新卡片
				const wordInfo = line.substring(3).trim();
				const match = wordInfo.match(/^(.+?)（(.+?)）$/);
				
				if (match) {
					currentCard = {
						word: match[1],
						reading: match[2],
						meanings: [],
						examples: []
					};
				} else {
					currentCard = {
						word: wordInfo,
						reading: wordInfo,
						meanings: [],
						examples: []
					};
				}
				currentSection = '';
				continue;
			}

			// 解析含义部分
			if (line.startsWith('### 含义')) {
				currentSection = 'meanings';
				continue;
			}

			// 解析例句部分
			if (line.startsWith('### 例句')) {
				currentSection = 'examples';
				continue;
			}

			// 解析含义列表
			if (currentSection === 'meanings' && line.match(/^\d+\.\s/)) {
				const meaning = line.replace(/^\d+\.\s/, '').trim();
				if (currentCard && meaning) {
					currentCard.meanings = currentCard.meanings || [];
					currentCard.meanings.push(meaning);
				}
				continue;
			}

			// 解析例句列表
			if (currentSection === 'examples' && line.match(/^\d+\.\s/)) {
				const exampleText = line.replace(/^\d+\.\s/, '').trim();
				const parts = exampleText.split('／');
				
				if (parts.length >= 2) {
					const jpPart = parts[0].trim();
					const cnPart = parts[1].trim();
					
					// 提取纯文本（去除ruby标签）
					const jpClean = jpPart.replace(/<ruby[^>]*>([^<]*)<rt[^>]*>[^<]*<\/rt><\/ruby>/g, '$1');
					
					const example: ExampleData = {
						jp_furigana: jpPart,
						jp_clean: jpClean,
						cn: cnPart
					};

					if (currentCard) {
						currentCard.examples = currentCard.examples || [];
						currentCard.examples.push(example);
					}
				}
				continue;
			}
		}

		// 添加最后一张卡片
		if (currentCard && currentCard.word && currentCard.reading) {
			deck.cards.push({
				id: cardId++,
				word: currentCard.word,
				reading: currentCard.reading,
				meanings: currentCard.meanings || [],
				examples: currentCard.examples || []
			});
		}

		return deck;
	}

	static async parseFile(file: File): Promise<Omit<DeckData, 'id'>> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				try {
					const content = e.target?.result as string;
					const deck = this.parseMarkdownToDeck(content, file.name);
					resolve(deck);
				} catch (error) {
					reject(error);
				}
			};
			reader.onerror = () => reject(new Error('文件读取失败'));
			reader.readAsText(file, 'utf-8');
		});
	}
}
