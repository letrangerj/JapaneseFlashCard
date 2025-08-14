<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { DeckService, type DeckData } from '$lib/db.js';
	import { MarkdownParser } from '$lib/parser.js';
	import NavigationDrawer from '$lib/components/NavigationDrawer.svelte';
	import DeckList from '$lib/components/DeckList.svelte';
	import FileUpload from '$lib/components/FileUpload.svelte';
	import { themeStore } from '$lib/stores/theme.js';

	let decks: DeckData[] = [];
	let loading = true;
	let error = '';
	let fileInput: HTMLInputElement;
	let searchQuery = '';

	onMount(async () => {
		await loadDecks();
	});

	async function loadDecks() {
		try {
			loading = true;
			decks = await DeckService.getAllDecks();
		} catch (err) {
			error = '加载卡片组失败';
			console.error(err);
		} finally {
			loading = false;
		}
	}

	async function handleFileUpload(file: File) {
		try {
			error = '';
			const deckData = await MarkdownParser.parseFile(file);
			await DeckService.addDeck(deckData);
			await loadDecks();
		} catch (err) {
			error = '文件解析失败，请检查文件格式';
			console.error(err);
		}
	}

	async function handleDeleteDeck(deckId: number) {
		try {
			await DeckService.deleteDeck(deckId);
			await loadDecks();
		} catch (err) {
			error = '删除失败';
			console.error(err);
		}
	}

	async function handleExportData() {
		try {
			const data = await DeckService.exportAllData();
			const blob = new Blob([data], { type: 'application/json' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `kotoba-vault-backup-${new Date().toISOString().split('T')[0]}.json`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		} catch (err) {
			error = '导出失败';
			console.error(err);
		}
	}

	function openFileDialog() {
		fileInput?.click();
	}

	function handleFileSelect(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file && file.name.endsWith('.md')) {
			handleFileUpload(file);
			target.value = '';
		} else if (file) {
			error = '请选择 Markdown (.md) 文件';
		}
	}

	function handleNavigation(path: string) {
		goto(path);
	}

	function handleSearch() {
		// TODO: 实现搜索功能
		console.log('Searching for:', searchQuery);
	}

	function toggleTheme() {
		themeStore.update(current => {
			switch (current) {
				case 'light': return 'dark';
				case 'dark': return 'auto';
				case 'auto': return 'light';
				default: return 'light';
			}
		});
	}
</script>

<div class="app-shell">
	<NavigationDrawer 
		{decks}
		{searchQuery}
		on:navigate={e => handleNavigation(e.detail)}
		on:export={handleExportData}
		on:search={handleSearch}
		on:upload={openFileDialog}
		on:theme-toggle={toggleTheme}
	/>

	<div class="app-shell-main">
		<main class="main-content">
			{#if error}
				<div class="error-message">
					{error}
				</div>
			{/if}

			{#if loading}
				<div class="loading">加载中...</div>
			{:else if decks.length === 0}
				<div class="empty-state">
					<div class="empty-icon">📚</div>
					<h2 class="md-title-large">开始你的学习之旅</h2>
					<p class="md-supporting-text">上传 Markdown 文件创建你的第一个卡片组</p>
					<button 
						class="md-button-base md-filled-button" 
						on:click={openFileDialog}
						style="margin-top: var(--md-sys-spacing-4);"
					>
						选择文件
					</button>
				</div>
			{:else}
				<div class="content-header">
					<h2 class="md-title-large">我的卡片组</h2>
					<p class="md-supporting-text">共 {decks.length} 个卡片组</p>
				</div>
				<DeckList {decks} on:delete={(e) => handleDeleteDeck(e.detail)} />
			{/if}
		</main>
	</div>

	<input
		type="file"
		accept=".md"
		bind:this={fileInput}
		on:change={handleFileSelect}
		style="display: none;"
	/>
</div>

<style>
	:global(body) {
		font-family: 'Noto Sans JP', 'Noto Sans SC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		margin: 0;
		padding: 0;
		background-color: var(--md-sys-color-background);
		color: var(--md-sys-color-on-background);
		line-height: 1.6;
	}

	.main-content {
		padding: var(--md-sys-spacing-6);
		margin-left: 280px; /* 为常驻侧边栏留出空间 */
		min-height: 100vh;
		width: calc(100vw - 280px - var(--md-sys-spacing-6) * 2);
	}

	.content-header {
		margin-bottom: var(--md-sys-spacing-6);
	}

	.content-header h2 {
		margin: 0 0 var(--md-sys-spacing-1) 0;
	}

	.content-header p {
		margin: 0;
	}

	.error-message { background: var(--md-sys-color-error-container); color: var(--md-sys-color-on-error-container); padding:12px 16px; border-radius: var(--md-sys-shape-corner-small); margin-bottom:20px; border-left:4px solid var(--md-sys-color-error); }

	.loading { text-align:center; padding:40px; color: var(--md-sys-color-on-surface-variant); font-size:1.1em; }

	.empty-state { text-align:center; padding:60px 20px; color: var(--md-sys-color-on-surface-variant); }

	.empty-icon {
		font-size: 4rem;
		margin-bottom: var(--md-sys-spacing-4);
		opacity: 0.6;
	}

	.empty-state h2 { color: var(--md-sys-color-on-surface); margin-bottom: var(--md-sys-spacing-2); }

	.empty-state p {
		font-size: 1.1em;
		margin-bottom: 0;
	}

	@media (max-width: 768px) {
		.main-content {
			margin-left: 0;
			padding: var(--md-sys-spacing-4);
			max-width: none;
		}
	}
</style>
