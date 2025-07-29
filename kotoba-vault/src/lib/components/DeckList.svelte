<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { DeckData } from '$lib/db.js';
	import { DeckService } from '$lib/db.js';

	export let decks: DeckData[];

	const dispatch = createEventDispatcher<{
		delete: number;
	}>();

	function formatDate(date: Date): string {
		return new Intl.DateTimeFormat('zh-CN', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}).format(date);
	}

	function handleDelete(deckId: number, deckName: string) {
		if (confirm(`确定要删除卡片组 "${deckName}" 吗？此操作不可撤销。`)) {
			dispatch('delete', deckId);
		}
	}

	let editingDeckId: number | null = null;
	let editingDeckName = '';

	function handleEdit(deck: DeckData) {
		editingDeckId = deck.id!;
		editingDeckName = deck.name;
	}

	function handleCancelEdit() {
		editingDeckId = null;
		editingDeckName = '';
	}

	async function handleSaveEdit(id: number) {
		if (editingDeckName.trim() === '') return;
		await DeckService.updateDeckName(id, editingDeckName);
		decks = decks.map((d) => (d.id === id ? { ...d, name: editingDeckName } : d));
		handleCancelEdit();
	}
</script>

<div class="deck-grid">
	{#each decks as deck (deck.id)}
		<div class="deck-card">
			<div class="deck-header">
					{#if editingDeckId === deck.id}
						<input type="text" bind:value={editingDeckName} />
					{:else}
						<h3 class="deck-title">{deck.name}</h3>
					{/if}
					<button 
						class="delete-btn"
						on:click={() => handleDelete(deck.id!, deck.name)}
						title="删除卡片组"
					>
						🗑️
					</button>
					{#if editingDeckId === deck.id}
						<button class="save-btn" on:click={() => handleSaveEdit(deck.id!)}>✔️</button>
						<button class="cancel-btn" on:click={handleCancelEdit}>❌</button>
					{:else}
						<button 
							class="edit-btn"
							on:click={() => handleEdit(deck)}
							title="编辑卡片组"
						>
							✏️
						</button>
					{/if}
				</div>
			
			<div class="deck-info">
				<div class="card-count">
					<span class="count-number">{deck.cards.length}</span>
					<span class="count-label">张卡片</span>
				</div>
				<div class="deck-meta">
					<div class="date-info">
						最后更新：{formatDate(deck.updatedAt)}
					</div>
				</div>
			</div>

			<div class="deck-description">
				{deck.description}
			</div>

			<div class="deck-actions">
				<a href="/study/{deck.id}" class="study-btn">
					开始学习
				</a>
			</div>
		</div>
	{/each}
</div>

<style>
	.deck-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 20px;
		margin-top: 20px;
	}

	.deck-card {
		background: white;
		border-radius: 12px;
		padding: 24px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
		border: 1px solid #e0e0e0;
	}

	.deck-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
	}

	.deck-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 16px;
	}

	.deck-title {
		margin: 0;
		font-size: 1.3em;
		font-weight: 600;
		color: #2c3e50;
		line-height: 1.4;
		flex: 1;
		margin-right: 10px;
	}

	.delete-btn {
		background: none;
		border: none;
		font-size: 1.1em;
		cursor: pointer;
		padding: 4px;
		border-radius: 4px;
		transition: all 0.2s;
		opacity: 0.6;
	}

	.delete-btn:hover {
		opacity: 1;
		background: #fee;
		transform: scale(1.1);
	}

	.edit-btn,
	.save-btn,
	.cancel-btn {
		background: none;
		border: none;
		font-size: 1.1em;
		cursor: pointer;
		padding: 4px;
		border-radius: 4px;
		transition: all 0.2s;
		opacity: 0.6;
	}

	.edit-btn:hover {
		opacity: 1;
		background: #e0e0e0;
		transform: scale(1.1);
	}

	.save-btn:hover {
		opacity: 1;
		background: #e0ffe0;
		transform: scale(1.1);
	}

	.cancel-btn:hover {
		opacity: 1;
		background: #ffe0e0;
		transform: scale(1.1);
	}

	input[type="text"] {
		font-size: 1.2em;
		padding: 8px;
		border: 1px solid #ccc;
		border-radius: 4px;
		width: 100%;
	}

	.deck-info {
		margin-bottom: 16px;
	}

	.card-count {
		display: flex;
		align-items: baseline;
		gap: 6px;
		margin-bottom: 8px;
	}

	.count-number {
		font-size: 2em;
		font-weight: 700;
		color: #3498db;
	}

	.count-label {
		color: #7f8c8d;
		font-size: 0.9em;
	}

	.deck-meta {
		color: #95a5a6;
		font-size: 0.85em;
	}

	.deck-description {
		color: #7f8c8d;
		font-size: 0.9em;
		line-height: 1.5;
		margin-bottom: 20px;
		min-height: 40px;
	}

	.deck-actions {
		margin-top: auto;
	}

	.study-btn {
		display: inline-block;
		background: linear-gradient(135deg, #3498db, #2980b9);
		color: white;
		text-decoration: none;
		padding: 12px 24px;
		border-radius: 8px;
		font-weight: 500;
		transition: all 0.2s;
		text-align: center;
		width: 100%;
		box-sizing: border-box;
	}

	.study-btn:hover {
		background: linear-gradient(135deg, #2980b9, #2471a3);
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
	}

	@media (max-width: 768px) {
		.deck-grid {
			grid-template-columns: 1fr;
			gap: 15px;
		}

		.deck-card {
			padding: 20px;
		}

		.deck-title {
			font-size: 1.2em;
		}

		.count-number {
			font-size: 1.8em;
		}
	}

	:global(.dark-mode) .deck-card {
		background: #2a2a34;
		border-color: #40404c;
	}

	:global(.dark-mode) .deck-title {
		color: #e1e1e1;
	}

	:global(.dark-mode) .deck-description {
		color: #8d8d9b;
	}

	:global(.dark-mode) .deck-meta {
		color: #6c6c7a;
	}

	:global(.dark-mode) .count-label {
		color: #8d8d9b;
	}

	:global(.dark-mode) .count-number {
		color: #4aa9f0;
	}

	:global(.dark-mode) .delete-btn:hover {
		background: #4a2a2a;
	}
</style>
