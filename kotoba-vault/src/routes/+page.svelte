<script lang="ts">
	import { onMount } from 'svelte';
	import { DeckService, type DeckData } from '$lib/db.js';
	import { MarkdownParser } from '$lib/parser.js';
	import DashboardHeader from '$lib/components/DashboardHeader.svelte';
	import DeckList from '$lib/components/DeckList.svelte';
	import FileUpload from '$lib/components/FileUpload.svelte';

	let decks: DeckData[] = [];
	let loading = true;
	let error = '';

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
</script>

<div class="dashboard">
	<DashboardHeader on:export={handleExportData} />
	
	<main class="main-content">
		<div class="upload-section">
			<FileUpload on:upload={(e) => handleFileUpload(e.detail)} />
		</div>

		{#if error}
			<div class="error-message">
				{error}
			</div>
		{/if}

		{#if loading}
			<div class="loading">加载中...</div>
		{:else if decks.length === 0}
			<div class="empty-state">
				<h2>还没有卡片组</h2>
				<p>上传一个 Markdown 文件开始学习吧！</p>
			</div>
		{:else}
			<DeckList {decks} on:delete={(e) => handleDeleteDeck(e.detail)} />
		{/if}
	</main>
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

	.dashboard {
		min-height: 100vh;
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
	}

	.main-content {
		margin-top: 30px;
	}

	.upload-section {
		margin-bottom: 30px;
	}

	.error-message {
		background-color: #fee;
		color: #d63031;
		padding: 12px 16px;
		border-radius: 8px;
		margin-bottom: 20px;
		border-left: 4px solid #d63031;
	}

	.loading {
		text-align: center;
		padding: 40px;
		color: #7f8c8d;
		font-size: 1.1em;
	}

	.empty-state {
		text-align: center;
		padding: 60px 20px;
		color: #7f8c8d;
	}

	.empty-state h2 {
		color: #2c3e50;
		margin-bottom: 10px;
	}

	.empty-state p {
		font-size: 1.1em;
	}

	@media (max-width: 768px) {
		.dashboard {
			padding: 15px;
		}
	}
</style>
