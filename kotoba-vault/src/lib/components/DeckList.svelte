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
		<div class="deck-card md-card">
			<div class="deck-header">
				{#if editingDeckId === deck.id}
					<input class="md-text-field" type="text" bind:value={editingDeckName} />
				{:else}
					<h3 class="deck-title md-title">{deck.name}</h3>
				{/if}
				<button class="md-button-base md-icon-button" on:click={() => handleDelete(deck.id!, deck.name)} title="删除卡片组" aria-label="删除卡片组">🗑️</button>
				{#if editingDeckId === deck.id}
					<button class="md-button-base md-icon-button" on:click={() => handleSaveEdit(deck.id!)} aria-label="保存名称">✔️</button>
					<button class="md-button-base md-icon-button" on:click={handleCancelEdit} aria-label="取消编辑">❌</button>
				{:else}
					<button class="md-button-base md-icon-button" on:click={() => handleEdit(deck)} title="编辑卡片组" aria-label="编辑卡片组">✏️</button>
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
				<a href="/study/{deck.id}" class="study-button md-button-base">
					<svg class="button-icon" viewBox="0 0 24 24" fill="currentColor">
						<path d="M8 5v14l11-7z"/>
					</svg>
					开始学习
				</a>
			</div>
		</div>
	{/each}
</div>

<style>
	.deck-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: var(--md-sys-spacing-6);
		margin-top: var(--md-sys-spacing-6);
		width: 100%;
	}

	/* 确保大屏幕上最多显示3列 */
	@media (min-width: 1200px) {
		.deck-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.deck-card {
		padding: var(--md-sys-spacing-6);
		transition: all var(--md-sys-duration-short) var(--md-sys-easing-standard);
		display: flex;
		flex-direction: column;
		min-height: 280px;
	}
	
	.deck-card:hover {
		transform: translateY(-2px);
		box-shadow: var(--md-sys-elevation-level3);
	}

	.deck-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: var(--md-sys-spacing-4);
		gap: var(--md-sys-spacing-2);
	}

	.deck-title {
		margin: 0;
		font-size: 20px;
		font-weight: 600;
		color: var(--md-sys-color-on-surface);
		line-height: 1.4;
		flex: 1;
	}

	input[type="text"] {
		font-size: 18px;
		padding: var(--md-sys-spacing-2) var(--md-sys-spacing-3);
		border: 1px solid var(--md-sys-color-outline);
		border-radius: var(--md-sys-shape-corner-small);
		background: var(--md-sys-color-surface);
		color: var(--md-sys-color-on-surface);
		width: 100%;
		font-family: inherit;
	}

	input[type="text"]:focus {
		outline: none;
		border-color: var(--md-sys-color-primary);
		box-shadow: 0 0 0 2px color-mix(in srgb, var(--md-sys-color-primary) 20%, transparent);
	}

	.deck-info {
		margin-bottom: var(--md-sys-spacing-4);
	}

	.card-count {
		display: flex;
		align-items: baseline;
		gap: var(--md-sys-spacing-2);
		margin-bottom: var(--md-sys-spacing-2);
	}

	.count-number {
		font-size: 32px;
		font-weight: 700;
		color: var(--md-sys-color-primary);
	}

	.count-label {
		color: var(--md-sys-color-on-surface-variant);
		font-size: 14px;
	}

	.deck-meta {
		color: var(--md-sys-color-on-surface-variant);
		font-size: 12px;
	}

	.deck-description {
		color: var(--md-sys-color-on-surface-variant);
		font-size: 14px;
		line-height: 1.5;
		margin-bottom: var(--md-sys-spacing-5);
		min-height: 42px;
		flex: 1;
	}

	.deck-actions {
		margin-top: auto;
	}

	.study-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--md-sys-spacing-2);
		width: 100%;
		height: 48px;
		padding: 0 var(--md-sys-spacing-4);
		background: var(--md-sys-color-primary);
		color: var(--md-sys-color-on-primary);
		border: none;
		border-radius: var(--md-sys-shape-corner-medium);
		text-decoration: none;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: all var(--md-sys-duration-short) var(--md-sys-easing-standard);
		box-shadow: var(--md-sys-elevation-level1);
	}

	.study-button:hover {
		background: var(--md-sys-color-primary);
		box-shadow: var(--md-sys-elevation-level2);
		transform: translateY(-1px);
	}

	.study-button:active {
		transform: translateY(0);
		box-shadow: var(--md-sys-elevation-level1);
	}

	.button-icon {
		width: 18px;
		height: 18px;
		flex-shrink: 0;
	}

	/* 学习按钮改为 md-filled-button */

	/* 中等屏幕：2列 */
	@media (max-width: 1200px) {
		.deck-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	/* 小屏幕：1列 */
	@media (max-width: 768px) {
		.deck-grid {
			grid-template-columns: 1fr;
			gap: var(--md-sys-spacing-4);
		}

		.deck-card {
			padding: var(--md-sys-spacing-4);
			min-height: auto;
		}

		.deck-title {
			font-size: 18px;
		}

		.count-number {
			font-size: 28px;
		}
	}

	/* 深色模式由 tokens 控制 */
</style>
