<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fly, scale } from 'svelte/transition';

	export let expanded = false;
	
	const dispatch = createEventDispatcher<{
		upload: void;
		import: void;
		toggle: boolean;
	}>();

	function toggle() {
		expanded = !expanded;
		dispatch('toggle', expanded);
	}

	function handleUpload() {
		dispatch('upload');
		expanded = false;
	}

	function handleImport() {
		dispatch('import');
		expanded = false;
	}
</script>

<div class="fab-container">
	{#if expanded}
		<!-- Backdrop -->
		<div 
			class="fab-backdrop" 
			on:click={toggle}
			transition:fly={{ duration: 200, opacity: 0 }}
		></div>
		
		<!-- Speed dial actions -->
		<div class="speed-dial" transition:fly={{ y: 20, duration: 200 }}>
			<button 
				class="fab-action md-card"
				on:click={handleUpload}
				title="上传 Markdown 文件"
			>
				<span class="fab-icon">📄</span>
				<span class="fab-label">上传文件</span>
			</button>
			
			<button 
				class="fab-action md-card"
				on:click={handleImport}
				title="导入备份数据"
			>
				<span class="fab-icon">📥</span>
				<span class="fab-label">导入备份</span>
			</button>
		</div>
	{/if}

	<!-- Main FAB -->
	<button 
		class="fab-main md-button-base md-filled-button"
		class:expanded
		on:click={toggle}
		aria-label="添加内容"
		title="添加内容"
		transition:scale={{ duration: 200 }}
	>
		<span class="fab-icon" class:rotated={expanded}>
			{expanded ? '✕' : '+'}
		</span>
	</button>
</div>

<style>
	.fab-container {
		position: fixed;
		bottom: var(--md-sys-spacing-4);
		right: var(--md-sys-spacing-4);
		z-index: 1000;
	}

	.fab-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.3);
		z-index: -1;
	}

	.speed-dial {
		display: flex;
		flex-direction: column;
		gap: var(--md-sys-spacing-3);
		margin-bottom: var(--md-sys-spacing-3);
	}

	.fab-action {
		display: flex;
		align-items: center;
		gap: var(--md-sys-spacing-3);
		padding: var(--md-sys-spacing-3) var(--md-sys-spacing-4);
		border: none;
		cursor: pointer;
		background: var(--md-sys-color-surface-container-high);
		color: var(--md-sys-color-on-surface);
		border-radius: var(--md-sys-shape-corner-large);
		box-shadow: var(--md-sys-elevation-level2);
		transition: all var(--md-sys-duration-short) var(--md-sys-easing-standard);
		min-width: 140px;
		white-space: nowrap;
	}

	.fab-action:hover {
		box-shadow: var(--md-sys-elevation-level3);
		transform: translateY(-2px);
	}

	.fab-main {
		width: 56px;
		height: 56px;
		border-radius: var(--md-sys-shape-corner-large);
		box-shadow: var(--md-sys-elevation-level3);
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		transition: all var(--md-sys-duration-short) var(--md-sys-easing-standard);
	}

	.fab-main:hover {
		box-shadow: var(--md-sys-elevation-level3);
		transform: translateY(-2px);
	}

	.fab-main.expanded {
		background: var(--md-sys-color-secondary-container);
		color: var(--md-sys-color-on-secondary-container);
	}

	.fab-icon {
		font-size: 1.5rem;
		font-weight: 500;
		transition: transform var(--md-sys-duration-short) var(--md-sys-easing-standard);
	}

	.fab-icon.rotated {
		transform: rotate(45deg);
	}

	.fab-label {
		font: var(--md-typescale-label-large);
		font-weight: 500;
	}

	@media (max-width: 768px) {
		.fab-container {
			bottom: var(--md-sys-spacing-3);
			right: var(--md-sys-spacing-3);
		}

		.fab-action {
			min-width: 120px;
			padding: var(--md-sys-spacing-2) var(--md-sys-spacing-3);
		}
	}
</style>
