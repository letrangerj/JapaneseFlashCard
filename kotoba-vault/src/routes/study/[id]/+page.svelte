<script lang="ts">
	import { onMount } from 'svelte';
	import type { DeckData, CardData } from '$lib/db.js';
	import { DeckService } from '$lib/db.js';

	export let data: { deck: DeckData | null; notFound?: boolean };

	let loadError: string | null = null;
	let deckData: DeckData | null = null;
	let mountExecuted = false;
	let currentCardIndex = 0;
	let showAnswer = false;

	console.log('Script loaded, data:', data);
	
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
			<div class="progress">
				卡片进度: {currentCardIndex + 1} / {deckData.cards.length}
			</div>
		</div>

		<div class="flashcard">
			<!-- 顶部导航栏 -->
			<div class="card-navigation">
				<button class="nav-btn" on:click={prevCard} disabled={currentCardIndex === 0}>
					<span class="nav-icon">←</span>
				</button>
				<span class="card-counter">{currentCardIndex + 1} / {deckData.cards.length}</span>
				<button class="nav-btn" on:click={nextCard} disabled={currentCardIndex === deckData.cards.length - 1}>
					<span class="nav-icon">→</span>
				</button>
			</div>

			<div class="card-content">
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
								<li>{meaning}</li>
							{/each}
						</ul>
						
						{#if deckData.cards[currentCardIndex].examples.length > 0}
							<h3>例句:</h3>
							<div class="examples">
								{#each deckData.cards[currentCardIndex].examples as example}
									<div class="example">
										<p class="example-jp">{example.japanese}</p>
										<p class="example-cn">{example.chinese}</p>
									</div>
								{/each}
							</div>
						{/if}
					</div>
				{:else}
					<!-- 卡片正面的提示信息 -->
					<div class="card-hint">
						<p>点击"显示答案"查看读音和释义</p>
					</div>
				{/if}
			</div>
			
			<div class="controls">
				<button class="btn-primary" on:click={toggleAnswer}>
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
	}

	.card-hint p {
		color: var(--md-sys-color-on-secondary-container);
		font: var(--md-typescale-body-medium);
		margin: 0;
		font-style: italic;
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

	.example-cn {
		font-size: 1rem;
		line-height: 1.5;
		opacity: 0.9;
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
