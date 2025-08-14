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
			<div class="card-content">
				<div class="word-section">
					<h2 class="japanese-word">{deckData.cards[currentCardIndex].word}</h2>
					<p class="reading">{deckData.cards[currentCardIndex].reading}</p>
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
				{/if}
			</div>
			
			<div class="controls">
				{#if !showAnswer}
					<button class="btn-primary" on:click={toggleAnswer}>显示答案</button>
				{:else}
					<div class="answer-controls">
						<button class="btn-secondary" on:click={prevCard} disabled={currentCardIndex === 0}>
							上一张
						</button>
						<button class="btn-primary" on:click={toggleAnswer}>隐藏答案</button>
						<button class="btn-secondary" on:click={nextCard} disabled={currentCardIndex === deckData.cards.length - 1}>
							下一张
						</button>
					</div>
				{/if}
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
		padding: 20px;
		font-family: 'Noto Sans SC', 'Noto Sans JP', sans-serif;
	}

	.study-header {
		text-align: center;
		margin-bottom: 30px;
	}

	.study-header h1 {
		color: #1976d2;
		margin-bottom: 10px;
	}

	.progress {
		background: #e3f2fd;
		padding: 10px;
		border-radius: 8px;
		color: #1976d2;
		font-weight: 500;
	}

	.flashcard {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		padding: 30px;
		margin: 20px 0;
		min-height: 400px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.word-section {
		text-align: center;
		margin-bottom: 30px;
	}

	.japanese-word {
		font-size: 3rem;
		font-family: 'Noto Sans JP', sans-serif;
		color: #333;
		margin-bottom: 10px;
		font-weight: 700;
	}

	.reading {
		font-size: 1.5rem;
		color: #666;
		font-family: 'Noto Sans JP', sans-serif;
	}

	.answer-section {
		margin-top: 20px;
		padding-top: 20px;
		border-top: 2px solid #e0e0e0;
	}

	.answer-section h3 {
		color: #1976d2;
		margin-bottom: 15px;
	}

	.meanings {
		list-style: none;
		padding: 0;
		margin-bottom: 20px;
	}

	.meanings li {
		background: #f5f5f5;
		padding: 10px 15px;
		margin: 5px 0;
		border-radius: 6px;
		border-left: 4px solid #1976d2;
	}

	.examples {
		margin-top: 15px;
	}

	.example {
		margin-bottom: 15px;
		padding: 15px;
		background: #f9f9f9;
		border-radius: 8px;
		border-left: 3px solid #4caf50;
	}

	.example-jp {
		font-family: 'Noto Sans JP', sans-serif;
		font-size: 1.1rem;
		margin-bottom: 5px;
		color: #333;
	}

	.example-cn {
		color: #666;
		font-size: 0.95rem;
	}

	.controls {
		margin-top: 30px;
		text-align: center;
	}

	.answer-controls {
		display: flex;
		gap: 15px;
		justify-content: center;
		flex-wrap: wrap;
	}

	.btn-primary, .btn-secondary {
		padding: 12px 24px;
		border: none;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
		min-width: 120px;
	}

	.btn-primary {
		background: #1976d2;
		color: white;
	}

	.btn-primary:hover {
		background: #1565c0;
		transform: translateY(-2px);
	}

	.btn-secondary {
		background: #f5f5f5;
		color: #333;
		border: 1px solid #ddd;
	}

	.btn-secondary:hover:not(:disabled) {
		background: #e0e0e0;
	}

	.btn-secondary:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.error-message, .empty-state, .loading-state {
		text-align: center;
		padding: 40px;
		background: white;
		border-radius: 12px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	}

	.error-message h2 {
		color: #d32f2f;
	}

	.debug-info {
		margin-top: 20px;
		padding: 15px;
		background: #f5f5f5;
		border-radius: 8px;
		text-align: left;
		font-size: 0.9rem;
		color: #666;
	}

	@media (max-width: 600px) {
		.japanese-word {
			font-size: 2rem;
		}
		
		.reading {
			font-size: 1.2rem;
		}
		
		.answer-controls {
			flex-direction: column;
			align-items: center;
		}
		
		.btn-primary, .btn-secondary {
			width: 100%;
			max-width: 200px;
		}
	}
</style>
