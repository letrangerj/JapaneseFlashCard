<script lang="ts">
	import { onMount } from 'svelte';
	import type { DeckData, CardData } from '$lib/db.js';
	import FlashCard from '$lib/components/FlashCard.svelte';
	import NavigationDrawer from '$lib/components/NavigationDrawer.svelte';
	import StudyNavigation from '$lib/components/StudyNavigation.svelte';
	import { goto } from '$app/navigation';
	import { theme } from '$lib/stores/theme.js';
	import { DeckService } from '$lib/db.js';

	export let data: { deck: DeckData | null; notFound?: boolean };

	let shuffledCards: CardData[] = [];
	let currentIndex = 0;
	let showAnswer = false;
	let loadingRealDeck = false;
	let loadError: string | null = null;

	console.log('Study page received data:', data);

	onMount(async () => {
		if (data.notFound || !data.deck) {
			loadError = '找不到该卡片组';
			return;
		}
		// 如果是占位符，尝试客户端加载
		if (!data.deck.cards || data.deck.cards.length === 0 || data.deck.name === '加载中...') {
			loadingRealDeck = true;
			try {
				const real = await DeckService.getDeckById(Number(data.deck.id));
				if (real && real.cards?.length) {
					data.deck = real as DeckData;
					shuffleCards();
				} else if (!real) {
					loadError = '未找到该卡片组或尚未创建内容';
				}
			} catch (e:any) {
				loadError = e?.message || '加载卡片组失败 (可能不支持 IndexedDB)';
			} finally {
				loadingRealDeck = false;
			}
		} else {
			shuffleCards();
		}
	});

	function shuffleCards() {
		if (data.deck && data.deck.cards && data.deck.cards.length > 0) {
			shuffledCards = [...data.deck.cards].sort(() => Math.random() - 0.5);
			currentIndex = 0;
			showAnswer = false;
		}
	}

	function nextCard() {
		if (currentIndex < shuffledCards.length - 1) {
			currentIndex++;
			showAnswer = false;
		}
	}

	function prevCard() {
		if (currentIndex > 0) {
			currentIndex--;
			showAnswer = false;
		}
	}

	function toggleAnswer() {
		showAnswer = !showAnswer;
	}

	function handleNavigation(path: string) {
		goto(path);
	}

	function handleSearch() {
		console.log('Search triggered');
	}

	function handleUpload() {
		console.log('Upload triggered');
	}

	function handleThemeToggle() {
		theme.toggle();
	}

	function handleExport() {
		console.log('Export triggered');
	}

	$: currentCard = shuffledCards[currentIndex];
	$: progress = shuffledCards.length > 0 ? `${currentIndex + 1} / ${shuffledCards.length}` : '';
</script>

<svelte:head>
	<title>学习 - {data.deck?.name || '卡片组'} | Kotoba Vault</title>
</svelte:head>

<div class="app-shell">
	<NavigationDrawer 
		decks={[]}
		on:navigate={e => handleNavigation(e.detail)}
		on:export={handleExport}
		on:search={handleSearch}
		on:upload={handleUpload}
		on:theme-toggle={handleThemeToggle}
	/>

	<div class="app-shell-main">
		<main class="study-container">
			<div class="study-actions">
				<button 
					class="md-button-base md-outlined-button"
					on:click={shuffleCards}
					title="重新洗牌"
				>
					🔀 洗牌
				</button>
			</div>

			<h1>Study Page - {data.deck?.name || 'Unknown'}</h1>
			<p>Progress: {progress}</p>
			
			{#if loadError}
				<div class="error-banner">{loadError}</div>
			{:else if loadingRealDeck}
				<div class="loading">正在加载卡片组...</div>
			{:else if currentCard}
				<div class="card-container">
					<FlashCard 
						card={currentCard}
						{showAnswer}
						on:toggle={toggleAnswer}
					/>
				</div>

				<StudyNavigation
					canGoPrev={currentIndex > 0}
					canGoNext={currentIndex < shuffledCards.length - 1}
					on:prev={prevCard}
					on:next={nextCard}
				/>
			{:else if data.deck && data.deck.cards && data.deck.cards.length === 0}
				<div class="empty-state">
					<div class="empty-icon">📚</div>
					<h2>卡片组为空</h2>
					<p>这个卡片组还没有任何卡片</p>
					<a href="/" class="md-button-base md-filled-button">返回主页</a>
				</div>
			{:else}
				<div class="loading">
					加载中...
				</div>
			{/if}
		</main>
	</div>
</div>

<style>
	.study-container {
		max-width: 800px;
		margin: 0 auto;
		margin-left: 280px; /* 为常驻侧边栏留出空间 */
		padding: 20px;
	}

	.card-container {
		margin: 20px 0;
		display: flex;
		justify-content: center;
	}

	.loading {
		text-align: center;
		padding: 20px;
	}

	.empty-state {
		text-align: center;
		padding: 60px 20px;
		color: var(--md-sys-color-on-surface-variant);
	}

	.empty-icon {
		font-size: 4rem;
		margin-bottom: var(--md-sys-spacing-4);
		opacity: 0.6;
	}

	.empty-state h2 {
		color: var(--md-sys-color-on-surface);
		margin-bottom: var(--md-sys-spacing-2);
	}

	.empty-state p {
		font-size: 1.1em;
		margin-bottom: var(--md-sys-spacing-4);
	}

	.error-banner { 
		background: var(--md-sys-color-error-container); 
		color: var(--md-sys-color-on-error-container); 
		padding:16px 20px; 
		border-radius:12px; 
		margin-bottom:20px; 
		font-size:14px; 
	}

	.error-banner::before { content: '⚠ '; }

	:global(body) {
		font-family: 'Noto Sans JP', 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		margin: 0;
		padding: 0;
		background-color: var(--md-sys-color-background);
		color: var(--md-sys-color-on-background);
		line-height: 1.6;
	}

	@media (max-width: 768px) {
		.study-container {
			margin-left: 0;
		}
	}
</style>
