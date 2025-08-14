<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let title = 'Kotoba Vault';
	export let showMenuButton = true;

	const dispatch = createEventDispatcher<{
		menu: void;
		theme: void;
	}>();

	let isDarkMode = false;

	function toggleTheme() {
		isDarkMode = !isDarkMode;
		document.body.classList.toggle('dark-mode', isDarkMode);
		localStorage.setItem('darkMode', isDarkMode.toString());
		dispatch('theme');
	}

	// 检查保存的主题偏好
	if (typeof window !== 'undefined') {
		const savedTheme = localStorage.getItem('darkMode');
		if (savedTheme === 'true') {
			isDarkMode = true;
			document.body.classList.add('dark-mode');
		}
	}
</script>

<header class="top-app-bar surface-container">
	<div class="app-bar-content">
		{#if showMenuButton}
			<button 
				class="md-button-base md-icon-button"
				on:click={() => dispatch('menu')}
				aria-label="打开导航菜单"
			>
				☰
			</button>
		{/if}

		<div class="app-bar-title">
			<h1 class="md-title-large">{title}</h1>
		</div>

		<div class="app-bar-actions">
			<button 
				class="md-button-base md-icon-button"
				on:click={toggleTheme}
				aria-label="切换主题"
				title="切换主题"
			>
				{isDarkMode ? '☀️' : '🌙'}
			</button>
		</div>
	</div>
</header>

<style>
	.top-app-bar {
		position: sticky;
		top: 0;
		z-index: 100;
		background: var(--md-sys-color-surface-container-low);
		border-bottom: 1px solid var(--md-sys-color-outline-variant);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
	}

	.app-bar-content {
		display: flex;
		align-items: center;
		height: 64px;
		padding: 0 var(--md-sys-spacing-2);
		max-width: 100%;
	}

	.app-bar-title {
		flex: 1;
		margin-left: var(--md-sys-spacing-2);
		overflow: hidden;
	}

	.app-bar-title h1 {
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: var(--md-sys-color-on-surface);
	}

	.app-bar-actions {
		display: flex;
		align-items: center;
		gap: var(--md-sys-spacing-1);
	}

	@media (max-width: 768px) {
		.app-bar-content {
			height: 56px;
			padding: 0 var(--md-sys-spacing-1);
		}

		.app-bar-title {
			margin-left: var(--md-sys-spacing-1);
		}

		.app-bar-title h1 {
			font-size: 1.25rem;
		}
	}
</style>
