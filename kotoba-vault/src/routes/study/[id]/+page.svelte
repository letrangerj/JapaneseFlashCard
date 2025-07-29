<script lang="ts">
	import { onMount } from 'svelte';
	import type { DeckData, CardData } from '$lib/db.js';
	import FlashCard from '$lib/components/FlashCard.svelte';
	import StudyHeader from '$lib/components/StudyHeader.svelte';
	import StudyNavigation from '$lib/components/StudyNavigation.svelte';

	export let data: { deck: DeckData };

	let shuffledCards: CardData[] = [];
	let currentIndex = 0;
	let showAnswer = false;

	onMount(() => {
		shuffleCards();
	});

	function shuffleCards() {
		shuffledCards = [...data.deck.cards].sort(() => Math.random() - 0.5);
		currentIndex = 0;
		showAnswer = false;
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

	$: currentCard = shuffledCards[currentIndex];
	$: progress = shuffledCards.length > 0 ? `${currentIndex + 1} / ${shuffledCards.length}` : '';
</script>

<svelte:head>
	<title>学习 - {data.deck.name} | Kotoba Vault</title>
</svelte:head>

<div class="study-container">
	<StudyHeader 
		deckName={data.deck.name} 
		{progress}
		on:shuffle={shuffleCards}
	/>

	{#if currentCard}
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
	{:else}
		<div class="loading">
			加载中...
		</div>
	{/if}
</div>

<style>
	:global(body) {
		font-family: 'Noto Sans JP', 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		margin: 0;
		padding: 0;
		background-color: #f4f7f9;
		color: #2c3e50;
		line-height: 1.6;
	}

	.study-container {
		min-height: 100vh;
		max-width: 600px;
		margin: 0 auto;
		padding: 20px;
		display: flex;
		flex-direction: column;
	}

	.card-container {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 30px 0;
		min-height: 500px;
	}

	.loading {
		text-align: center;
		padding: 60px;
		color: #7f8c8d;
		font-size: 1.2em;
	}

	@media (max-width: 768px) {
		.study-container {
			padding: 15px;
		}

		.card-container {
			margin: 20px 0;
			min-height: 400px;
		}
	}

	:global(.dark-mode) {
		background-color: #1c1c22;
		color: #e1e1e1;
	}
</style>
