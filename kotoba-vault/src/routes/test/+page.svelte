<script lang="ts">
	import { onMount } from 'svelte';
	import { DeckService } from '$lib/db.js';

	let status = 'initializing...';
	let deckData: any = null;

	onMount(async () => {
		console.log('Test page onMount started');
		status = 'loading...';
		
		try {
			const decks = await DeckService.getAllDecks();
			console.log('All decks:', decks);
			
			const deck1 = await DeckService.getDeckById(1);
			console.log('Deck 1:', deck1);
			
			deckData = deck1;
			status = 'loaded';
		} catch (error) {
			console.error('Test error:', error);
			status = 'error: ' + error.message;
		}
	});
</script>

<h1>数据库测试页面</h1>
<p>状态: {status}</p>

{#if deckData}
	<h2>卡片组数据:</h2>
	<pre>{JSON.stringify(deckData, null, 2)}</pre>
{/if}

<style>
	pre {
		background: #f5f5f5;
		padding: 1rem;
		border-radius: 4px;
		overflow-x: auto;
	}
</style>
