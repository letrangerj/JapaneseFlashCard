<script lang="ts">
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	import type { DeckData, CardData } from '$lib/db.js';
	import { DeckService } from '$lib/db.js';

	export let data: { deck: DeckData | null; notFound?: boolean };

	let loadError: string | null = null;
	let deckData: DeckData | null = null;
	let mountExecuted = false;
	let currentCardIndex = 0;
	let showAnswer = false;

	console.log('Script loaded, data:', data);
	
	// 配置 marked
	marked.setOptions({
		breaks: true, // 支持换行
		gfm: true, // 支持 GitHub Flavored Markdown
	});
	
	// 立即执行的测试
	console.log('立即执行测试 - 当前时间:', new Date().toISOString());

	// 异步加载数据的函数
	async function loadDeckData() {
		console.log('🎯 开始加载数据!!! 时间:', new Date().toISOString());
		mountExecuted = true;
		
		try {
			console.log('Trying to load deck ID:', data.deck?.id);
			const real = await DeckService.getDeckById(Number(data.deck?.id));
			console.log('DeckService returned:', real);
			deckData = real || null;
		} catch (e: any) {
			console.error('Error loading deck:', e);
			loadError = e?.message || '加载失败';
		}
		
		console.log('🎯 数据加载完毕!!! 时间:', new Date().toISOString());
	}

	onMount(async () => {
		console.log('✅ onMount 执行成功');
		await loadDeckData();
	});
	
	// 备用方案 - 使用 setTimeout (适配 Svelte 5)
	setTimeout(async () => {
		console.log('🕐 setTimeout 执行 - 检查 onMount 是否执行:', mountExecuted);
		if (!mountExecuted) {
			console.log('⚠️ onMount 未执行，使用 setTimeout 备用方案');
			await loadDeckData();
		}
	}, 100);

	// 卡片控制函数
	function nextCard() {
		if (deckData && currentCardIndex < deckData.cards.length - 1) {
			currentCardIndex++;
			showAnswer = false;
		}
	}

	function prevCard() {
		if (currentCardIndex > 0) {
			currentCardIndex--;
			showAnswer = false;
		}
	}

	function toggleAnswer() {
		showAnswer = !showAnswer;
	}

	// 处理导航按钮点击，阻止事件冒泡
	function handleNavClick(event: MouseEvent, action: () => void) {
		event.stopPropagation();
		action();
	}

	// 打乱卡片顺序
	function shuffleCards() {
		if (deckData && deckData.cards.length > 0) {
			// Fisher-Yates 洗牌算法
			const cards = [...deckData.cards];
			for (let i = cards.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[cards[i], cards[j]] = [cards[j], cards[i]];
			}
			deckData.cards = cards;
			currentCardIndex = 0; // 重置到第一张卡片
			showAnswer = false; // 隐藏答案
		}
	}

	// 渲染 Markdown 为 HTML
	function renderMarkdown(text: string): string {
		if (!text) return '';
		try {
			return marked(text) as string;
		} catch (error) {
			console.error('Markdown rendering error:', error);
			return text; // 如果渲染失败，返回原始文本
		}
	}
</script>

<svelte:head>
	<title>学习卡组 - {deckData?.name || '加载中...'}</title>
</svelte:head>

<div class="study-container">
	{#if loadError}
		<div class="error-message">
			<h2>加载错误</h2>
			<p>{loadError}</p>
			<button on:click={() => location.reload()}>重新加载</button>
		</div>
	{:else if deckData && deckData.cards.length > 0}
		<!-- 成功加载卡组数据 -->
		<div class="study-header">
			<h1>{deckData.name}</h1>
			<p>{deckData.description}</p>
			<div class="header-controls">
				<div class="progress">
					卡片进度: {currentCardIndex + 1} / {deckData.cards.length}
				</div>
				<button class="shuffle-btn" on:click={shuffleCards} title="打乱卡片顺序">
					<svg class="shuffle-icon" viewBox="0 0 24 24" fill="currentColor">
						<path d="M10.59,9.17L5.41,4L4,5.41L9.17,10.58L10.59,9.17M14.5,4L16.54,6.04L4,18.59L5.41,20L17.96,7.46L20,9.5V4M14.83,13.41L20,18.59L18.59,20L13.41,14.83L14.83,13.41Z"/>
					</svg>
					<span class="shuffle-text">打乱</span>
				</button>
			</div>
		</div>

		<div class="flashcard">
			<!-- 顶部导航栏 -->
			<div class="card-navigation">
				<button class="nav-btn" on:click={(e) => handleNavClick(e, prevCard)} disabled={currentCardIndex === 0}>
					<span class="nav-icon">←</span>
				</button>
				<span class="card-counter">{currentCardIndex + 1} / {deckData.cards.length}</span>
				<button class="nav-btn" on:click={(e) => handleNavClick(e, nextCard)} disabled={currentCardIndex === deckData.cards.length - 1}>
					<span class="nav-icon">→</span>
				</button>
			</div>

			<div class="card-content" on:click={toggleAnswer}>
				<div class="word-section">
					<h2 class="japanese-word">{deckData.cards[currentCardIndex].word}</h2>
					{#if showAnswer}
						<p class="reading">{deckData.cards[currentCardIndex].reading}</p>
					{/if}
				</div>
				
				{#if showAnswer}
					<div class="answer-section">
						<h3>释义:</h3>
						<ul class="meanings">
							{#each deckData.cards[currentCardIndex].meanings as meaning}
								<li>{@html renderMarkdown(meaning)}</li>
							{/each}
						</ul>
						
						{#if deckData.cards[currentCardIndex].examples.length > 0}
							<h3>例句:</h3>
							<div class="examples">
								{#each deckData.cards[currentCardIndex].examples as example}
									<div class="example">
										<div class="example-jp">{@html renderMarkdown(example.japanese)}</div>
										<div class="example-cn">{@html renderMarkdown(example.chinese)}</div>
									</div>
								{/each}
							</div>
						{/if}
					</div>
				{:else}
					<!-- 卡片正面的提示信息 -->
					<div class="card-hint">
						<p>点击卡片任意位置查看答案</p>
						<svg class="tap-icon" viewBox="0 0 24 24" fill="currentColor">
							<path d="M7.5,4A5.5,5.5 0 0,0 2,9.5C2,10 2.09,10.5 2.22,11H6.3L7.57,7.63C7.87,6.83 8.93,6.59 9.5,7.16L10.5,8.16L14.22,11H16V9.5A5.5,5.5 0 0,0 10.5,4C9.23,4 8.07,4.54 7.22,5.39C7.08,5.25 6.93,5.12 6.78,5C6.35,4.67 5.8,4.44 5.19,4.34C4.73,4.21 4.26,4.24 3.81,4.43C3.36,4.62 2.97,4.96 2.69,5.41C2.41,5.86 2.25,6.39 2.25,6.94C2.25,7.5 2.41,8.03 2.69,8.47C2.83,8.69 3,8.89 3.19,9.06C3.55,9.42 4,9.66 4.5,9.78V11.5C4.5,12.61 5.39,13.5 6.5,13.5H9.5C10.61,13.5 11.5,12.61 11.5,11.5V9.16L7.78,5.44C7.57,5.23 7.29,5.11 7,5.11C6.71,5.11 6.43,5.23 6.22,5.44C6.08,5.58 6,5.77 6,6C6,6.23 6.08,6.42 6.22,6.56L7.5,7.84V10.5C7.5,10.78 7.28,11 7,11C6.72,11 6.5,10.78 6.5,10.5V7.84L5.22,6.56C4.86,6.2 4.86,5.64 5.22,5.28C5.58,4.92 6.14,4.92 6.5,5.28L7.78,6.56C8.14,6.92 8.7,6.92 9.06,6.56L10.34,5.28C10.7,4.92 11.26,4.92 11.62,5.28C11.98,5.64 11.98,6.2 11.62,6.56L10.34,7.84V10.5C10.34,10.78 10.12,11 9.84,11C9.56,11 9.34,10.78 9.34,10.5V7.84L8.06,6.56C7.92,6.42 7.84,6.23 7.84,6C7.84,5.77 7.92,5.58 8.06,5.44C8.27,5.23 8.55,5.11 8.84,5.11C9.13,5.11 9.41,5.23 9.62,5.44L13.34,9.16V11.5C13.34,12.61 14.23,13.5 15.34,13.5H18.34C19.45,13.5 20.34,12.61 20.34,11.5V9.78C20.84,9.66 21.29,9.42 21.65,9.06C21.84,8.89 22.01,8.69 22.15,8.47C22.43,8.03 22.59,7.5 22.59,6.94C22.59,6.39 22.43,5.86 22.15,5.41C21.87,4.96 21.48,4.62 21.03,4.43C20.58,4.24 20.11,4.21 19.65,4.34C19.04,4.44 18.49,4.67 18.06,5C17.91,5.12 17.76,5.25 17.62,5.39C16.77,4.54 15.61,4 14.34,4C13.84,4 13.36,4.1 12.91,4.27C12.46,4.44 12.05,4.68 11.69,5C11.33,5.32 11.03,5.71 10.8,6.16C10.57,6.61 10.44,7.11 10.44,7.63L11.71,11H15.84L12.12,7.16C12.69,6.59 13.75,6.83 14.05,7.63L15.32,11H19.4C19.53,10.5 19.62,10 19.62,9.5A5.5,5.5 0 0,0 14.12,4M7.5,15.5C6.67,15.5 6,16.17 6,17V20C6,20.83 6.67,21.5 7.5,21.5C8.33,21.5 9,20.83 9,20V17C9,16.17 8.33,15.5 7.5,15.5Z"/>
						</svg>
					</div>
				{/if}
			</div>
			
			<div class="controls">
				<button class="btn-primary" on:click={(e) => handleNavClick(e, toggleAnswer)}>
					{showAnswer ? '隐藏答案' : '显示答案'}
				</button>
			</div>
		</div>
	{:else if deckData}
		<!-- 卡组为空 -->
		<div class="empty-state">
			<h2>卡组为空</h2>
			<p>此卡组中没有卡片。</p>
		</div>
	{:else}
		<!-- 加载中状态 -->
		<div class="loading-state">
			<h2>加载中...</h2>
			<p>正在加载卡组数据...</p>
			<div class="debug-info">
				<h3>调试信息:</h3>
				<p><strong>Mount 状态:</strong> {mountExecuted ? '已执行' : '未执行'}</p>
				<p><strong>服务器数据:</strong> {data.deck?.name || '无'}</p>
			</div>
		</div>
	{/if}
</div>

<style>
	.study-container {
		max-width: 800px;
		margin: 0 auto;
		padding: var(--md-sys-spacing-6);
		font-family: 'Noto Sans JP', 'Noto Sans SC', sans-serif;
		background: var(--md-sys-color-background);
		color: var(--md-sys-color-on-background);
		min-height: 100vh;
	}

	.study-header {
		text-align: center;
		margin-bottom: var(--md-sys-spacing-8);
	}

	.study-header h1 {
		font: var(--md-typescale-title-large);
		color: var(--md-sys-color-primary);
		margin-bottom: var(--md-sys-spacing-2);
		font-weight: 500;
	}

	.study-header p {
		font: var(--md-typescale-body-medium);
		color: var(--md-sys-color-on-surface-variant);
		margin-bottom: var(--md-sys-spacing-5);
	}

	.header-controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--md-sys-spacing-4);
		flex-wrap: wrap;
	}

	.progress {
		background: var(--md-sys-color-primary-container);
		color: var(--md-sys-color-on-primary-container);
		padding: var(--md-sys-spacing-3);
		border-radius: var(--md-sys-shape-corner-extra-large);
		font-weight: 500;
		font-size: 14px;
		line-height: 1.4;
		min-height: 48px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-shadow: none;
		border: none;
		cursor: default;
		transition: all var(--md-sys-duration-short) var(--md-sys-easing-standard);
	}

	.shuffle-btn {
		background: var(--md-sys-color-secondary-container);
		color: var(--md-sys-color-on-secondary-container);
		padding: var(--md-sys-spacing-3);
		border: none;
		border-radius: var(--md-sys-shape-corner-extra-large);
		font-weight: 500;
		font-size: 14px;
		line-height: 1.4;
		min-height: 48px;
		cursor: pointer;
		transition: all var(--md-sys-duration-short) var(--md-sys-easing-standard);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--md-sys-spacing-2);
		box-shadow: none;
		font-family: inherit;
		position: relative;
		overflow: hidden;
	}

	.shuffle-btn:hover {
		background: var(--md-sys-color-secondary);
		color: var(--md-sys-color-on-secondary);
		transform: none;
	}

	.shuffle-btn:active {
		transform: scale(0.95);
	}

	.shuffle-icon {
		width: 18px;
		height: 18px;
		flex-shrink: 0;
	}

	.shuffle-text {
		font-size: 14px;
		font-weight: 500;
	}

	.flashcard {
		background: var(--md-sys-color-surface-container);
		border-radius: var(--md-sys-shape-corner-extra-large);
		box-shadow: var(--md-sys-elevation-level2);
		margin: var(--md-sys-spacing-6) 0;
		min-height: 500px;
		display: flex;
		flex-direction: column;
		border: 1px solid var(--md-sys-color-outline-variant);
		transition: all var(--md-sys-duration-medium) var(--md-sys-easing-standard);
		overflow: hidden;
	}

	.flashcard:hover {
		transform: translateY(-2px);
		box-shadow: var(--md-sys-elevation-level3);
	}

	/* 顶部导航栏 */
	.card-navigation {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--md-sys-spacing-5) var(--md-sys-spacing-6);
		background: var(--md-sys-color-surface-variant);
		border-bottom: 1px solid var(--md-sys-color-outline-variant);
	}

	.nav-btn {
		background: var(--md-sys-color-surface-container-highest);
		border: 1px solid var(--md-sys-color-outline);
		border-radius: var(--md-sys-shape-corner-full);
		width: 48px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all var(--md-sys-duration-short) var(--md-sys-easing-standard);
		color: var(--md-sys-color-on-surface);
		box-shadow: var(--md-sys-elevation-level1);
	}

	.nav-btn:hover:not(:disabled) {
		background: var(--md-sys-color-primary);
		color: var(--md-sys-color-on-primary);
		transform: scale(1.05);
		box-shadow: var(--md-sys-elevation-level2);
	}

	.nav-btn:disabled {
		opacity: 0.38;
		cursor: not-allowed;
		transform: none;
		background: var(--md-sys-color-surface);
		color: var(--md-sys-color-on-surface-variant);
	}

	.nav-icon {
		font-size: 18px;
		font-weight: 600;
	}

	.card-counter {
		background: var(--md-sys-color-tertiary-container);
		color: var(--md-sys-color-on-tertiary-container);
		padding: var(--md-sys-spacing-3);
		border-radius: var(--md-sys-shape-corner-extra-large);
		font-weight: 500;
		font-size: 14px;
		line-height: 1.4;
		min-height: 48px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-shadow: none;
		border: none;
		cursor: default;
		transition: all var(--md-sys-duration-short) var(--md-sys-easing-standard);
	}

	.card-content {
		flex: 1;
		padding: var(--md-sys-spacing-10) var(--md-sys-spacing-6) var(--md-sys-spacing-5);
		display: flex;
		flex-direction: column;
		justify-content: center;
		cursor: pointer;
		transition: all var(--md-sys-duration-short) var(--md-sys-easing-standard);
		border-radius: var(--md-sys-shape-corner-medium);
		position: relative;
	}

	.card-content:hover {
		background: color-mix(in srgb, var(--md-sys-color-surface-container) 95%, var(--md-sys-color-primary));
	}

	.card-content:active {
		transform: scale(0.995);
		background: color-mix(in srgb, var(--md-sys-color-surface-container) 90%, var(--md-sys-color-primary));
	}

	.word-section {
		text-align: center;
		margin-bottom: var(--md-sys-spacing-8);
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.japanese-word {
		font-size: 3.5rem;
		font-family: 'Noto Sans JP', sans-serif;
		color: var(--md-sys-color-on-surface);
		margin-bottom: var(--md-sys-spacing-4);
		font-weight: 700;
		text-shadow: 0 2px 4px var(--md-sys-color-shadow);
		line-height: 1.2;
	}

	.reading {
		font-size: 1.6rem;
		color: var(--md-sys-color-secondary);
		font-family: 'Noto Sans JP', sans-serif;
		font-weight: 500;
		animation: fadeIn var(--md-sys-duration-medium) var(--md-sys-easing-standard);
	}

	/* 卡片提示样式 */
	.card-hint {
		text-align: center;
		margin-top: var(--md-sys-spacing-10);
		padding: var(--md-sys-spacing-5);
		background: var(--md-sys-color-secondary-container);
		border-radius: var(--md-sys-shape-corner-large);
		border: 2px dashed var(--md-sys-color-outline);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--md-sys-spacing-3);
	}

	.card-hint p {
		color: var(--md-sys-color-on-secondary-container);
		font: var(--md-typescale-body-medium);
		margin: 0;
		font-style: italic;
	}

	.tap-icon {
		width: 32px;
		height: 32px;
		color: var(--md-sys-color-on-secondary-container);
		opacity: 0.7;
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 0.7; transform: scale(1); }
		50% { opacity: 1; transform: scale(1.1); }
	}

	.answer-section {
		margin-top: var(--md-sys-spacing-8);
		padding-top: var(--md-sys-spacing-6);
		border-top: 2px solid var(--md-sys-color-outline-variant);
		animation: fadeIn var(--md-sys-duration-medium) var(--md-sys-easing-standard);
	}

	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(10px); }
		to { opacity: 1; transform: translateY(0); }
	}

	.answer-section h3 {
		color: var(--md-sys-color-primary);
		margin-bottom: var(--md-sys-spacing-5);
		font: var(--md-typescale-title-medium);
		font-weight: 500;
	}

	.meanings {
		list-style: none;
		padding: 0;
		margin-bottom: var(--md-sys-spacing-6);
	}

	.meanings li {
		background: var(--md-sys-color-primary-container);
		color: var(--md-sys-color-on-primary-container);
		padding: var(--md-sys-spacing-4) var(--md-sys-spacing-5);
		margin: var(--md-sys-spacing-2) 0;
		border-radius: var(--md-sys-shape-corner-medium);
		border-left: 4px solid var(--md-sys-color-primary);
		transition: all var(--md-sys-duration-short) var(--md-sys-easing-standard);
		box-shadow: var(--md-sys-elevation-level1);
	}

	.meanings li:hover {
		transform: translateX(4px);
		box-shadow: var(--md-sys-elevation-level2);
	}

	.meanings li :global(p) {
		margin: 0;
		display: inline;
	}

	.meanings li :global(strong) {
		font-weight: 700;
		color: var(--md-sys-color-primary);
	}

	.meanings li :global(em) {
		font-style: italic;
		color: var(--md-sys-color-secondary);
	}

	.meanings li :global(code) {
		background: var(--md-sys-color-surface);
		color: var(--md-sys-color-on-surface);
		padding: 2px 4px;
		border-radius: var(--md-sys-shape-corner-extra-small);
		font-family: 'Courier New', monospace;
		font-size: 0.9em;
	}

	.examples {
		margin-top: var(--md-sys-spacing-5);
	}

	.example {
		margin-bottom: var(--md-sys-spacing-5);
		padding: var(--md-sys-spacing-5);
		background: var(--md-sys-color-tertiary-container);
		color: var(--md-sys-color-on-tertiary-container);
		border-radius: var(--md-sys-shape-corner-medium);
		border-left: 4px solid var(--md-sys-color-tertiary);
		transition: all var(--md-sys-duration-short) var(--md-sys-easing-standard);
		box-shadow: var(--md-sys-elevation-level1);
	}

	.example:hover {
		transform: translateX(4px);
		box-shadow: var(--md-sys-elevation-level2);
	}

	.example-jp {
		font-family: 'Noto Sans JP', sans-serif;
		font-size: 1.1rem;
		margin-bottom: var(--md-sys-spacing-2);
		font-weight: 500;
		line-height: 1.5;
	}

	.example-jp :global(p) {
		margin: 0 0 var(--md-sys-spacing-1) 0;
		font-family: 'Noto Sans JP', sans-serif;
		font-size: 1.1rem;
		font-weight: 500;
		line-height: 1.5;
	}

	.example-jp :global(strong) {
		font-weight: 700;
		color: var(--md-sys-color-primary);
	}

	.example-jp :global(em) {
		font-style: italic;
		color: var(--md-sys-color-secondary);
	}

	.example-jp :global(code) {
		background: var(--md-sys-color-surface-variant);
		color: var(--md-sys-color-on-surface-variant);
		padding: 2px 6px;
		border-radius: var(--md-sys-shape-corner-extra-small);
		font-family: 'Courier New', monospace;
		font-size: 0.9em;
	}

	.example-cn {
		font-size: 1rem;
		line-height: 1.5;
		opacity: 0.9;
	}

	.example-cn :global(p) {
		margin: 0 0 var(--md-sys-spacing-1) 0;
		font-size: 1rem;
		line-height: 1.5;
		opacity: 0.9;
	}

	.example-cn :global(strong) {
		font-weight: 700;
		color: var(--md-sys-color-primary);
		opacity: 1;
	}

	.example-cn :global(em) {
		font-style: italic;
		color: var(--md-sys-color-secondary);
		opacity: 1;
	}

	.example-cn :global(code) {
		background: var(--md-sys-color-surface-variant);
		color: var(--md-sys-color-on-surface-variant);
		padding: 2px 6px;
		border-radius: var(--md-sys-shape-corner-extra-small);
		font-family: 'Courier New', monospace;
		font-size: 0.9em;
		opacity: 1;
	}

	/* Markdown 通用样式 */
	.example :global(ul), .example :global(ol) {
		margin: var(--md-sys-spacing-2) 0;
		padding-left: var(--md-sys-spacing-5);
	}

	.example :global(li) {
		margin: var(--md-sys-spacing-1) 0;
	}

	.example :global(blockquote) {
		margin: var(--md-sys-spacing-3) 0;
		padding: var(--md-sys-spacing-2) var(--md-sys-spacing-4);
		border-left: 4px solid var(--md-sys-color-primary);
		background: var(--md-sys-color-surface-variant);
		border-radius: var(--md-sys-shape-corner-small);
		font-style: italic;
	}

	.controls {
		padding: var(--md-sys-spacing-5) var(--md-sys-spacing-6) var(--md-sys-spacing-8);
		text-align: center;
	}

	.btn-primary {
		background: var(--md-sys-color-primary);
		color: var(--md-sys-color-on-primary);
		padding: var(--md-sys-spacing-3) var(--md-sys-spacing-6);
		border: none;
		border-radius: var(--md-sys-shape-corner-extra-large);
		font-weight: 500;
		font-size: 14px;
		line-height: 1.4;
		min-height: 48px;
		cursor: pointer;
		transition: all var(--md-sys-duration-short) var(--md-sys-easing-standard);
		min-width: 160px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-shadow: none;
		font-family: inherit;
		position: relative;
		overflow: hidden;
	}

	.btn-primary:hover {
		background: color-mix(in srgb, var(--md-sys-color-primary) 92%, black);
		box-shadow: none;
		transform: none;
	}

	.btn-primary:active {
		transform: none;
		box-shadow: none;
	}

	.error-message, .empty-state, .loading-state {
		text-align: center;
		padding: var(--md-sys-spacing-10);
		background: var(--md-sys-color-surface-container);
		border-radius: var(--md-sys-shape-corner-extra-large);
		box-shadow: var(--md-sys-elevation-level1);
		border: 1px solid var(--md-sys-color-outline-variant);
		color: var(--md-sys-color-on-surface);
	}

	.error-message h2 {
		color: var(--md-sys-color-error);
		font: var(--md-typescale-title-medium);
		margin-bottom: var(--md-sys-spacing-3);
	}

	.debug-info {
		margin-top: var(--md-sys-spacing-5);
		padding: var(--md-sys-spacing-4);
		background: var(--md-sys-color-surface-variant);
		border-radius: var(--md-sys-shape-corner-medium);
		text-align: left;
		font: var(--md-typescale-body-medium);
		color: var(--md-sys-color-on-surface-variant);
		border: 1px solid var(--md-sys-color-outline-variant);
	}

	/* 移动端适配 */
	@media (max-width: 600px) {
		.study-container {
			padding: var(--md-sys-spacing-4);
		}

		.header-controls {
			flex-direction: column;
			gap: var(--md-sys-spacing-3);
		}

		.shuffle-btn {
			padding: var(--md-sys-spacing-2) var(--md-sys-spacing-4);
			min-height: 40px;
			font-size: 12px;
		}

		.shuffle-icon {
			width: 16px;
			height: 16px;
		}

		.shuffle-text {
			font-size: 12px;
		}

		.card-navigation {
			padding: var(--md-sys-spacing-4) var(--md-sys-spacing-5);
		}

		.nav-btn {
			width: 40px;
			height: 40px;
		}

		.card-content {
			padding: var(--md-sys-spacing-8) var(--md-sys-spacing-5) var(--md-sys-spacing-5);
		}

		.card-content:active {
			transform: scale(0.98);
		}

		.japanese-word {
			font-size: 2.8rem;
		}
		
		.reading {
			font-size: 1.4rem;
		}

		.card-hint {
			margin-top: var(--md-sys-spacing-8);
			padding: var(--md-sys-spacing-4);
		}

		.card-hint p {
			font-size: 14px;
		}

		.tap-icon {
			width: 28px;
			height: 28px;
		}

		.controls {
			padding: var(--md-sys-spacing-4) var(--md-sys-spacing-5) var(--md-sys-spacing-6);
		}
		
		.btn-primary {
			width: 100%;
			max-width: 280px;
			padding: var(--md-sys-spacing-3) var(--md-sys-spacing-6);
		}

		.meanings li, .example {
			padding: var(--md-sys-spacing-3) var(--md-sys-spacing-4);
		}

		.progress, .card-counter {
			padding: var(--md-sys-spacing-2) var(--md-sys-spacing-4);
			font-size: 12px;
			min-height: 40px;
		}
	}

	/* 暗色主题适配 */
	.dark-theme .flashcard {
		background: var(--md-sys-color-surface-container);
		border-color: var(--md-sys-color-outline-variant);
	}
	
	.dark-theme .btn-primary {
		box-shadow: var(--md-sys-elevation-level2);
	}
	
	.dark-theme .btn-primary:hover {
		box-shadow: var(--md-sys-elevation-level3);
	}
</style>
