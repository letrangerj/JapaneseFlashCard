<script lang="ts">
	import '../app.css';
	import '$lib/styles/material3.css';
	import { onMount } from 'svelte';
	import { initMDInteractions } from '$lib/ui/ripple';

	onMount(() => {
		initMDInteractions();
	});
</script>

<slot />
