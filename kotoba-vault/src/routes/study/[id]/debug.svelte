<script lang="ts">
	export let data: any;
	console.log('Study page data:', data);
</script>

<h1>Study Page Debug</h1>
<pre>{JSON.stringify(data, null, 2)}</pre>

{#if data.deck}
	<p>Deck name: {data.deck.name}</p>
	<p>Deck ID: {data.deck.id}</p>
{:else}
	<p>No deck data</p>
{/if}
