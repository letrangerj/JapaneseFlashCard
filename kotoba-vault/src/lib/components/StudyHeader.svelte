<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let deckName: string;
	export let progress: string;

	const dispatch = createEventDispatcher();

	let isDarkMode = false;

	function toggleTheme() {
		isDarkMode = !isDarkMode;
		document.body.classList.toggle('dark-mode', isDarkMode);
		localStorage.setItem('darkMode', isDarkMode.toString());
	}

	// 在组件挂载时检查保存的主题偏好
	if (typeof window !== 'undefined') {
		const savedTheme = localStorage.getItem('darkMode');
		if (savedTheme === 'true') {
			isDarkMode = true;
			document.body.classList.add('dark-mode');
		}
	}
</script>

<header class="study-header">
	<div class="header-left">
		<div class="progress-info">
			<span class="progress">{progress}</span>
		</div>
		<h1 class="deck-name">{deckName}</h1>
	</div>

	<div class="header-right">
		<button 
			class="action-btn"
			on:click={() => dispatch('shuffle')}
			title="重新洗牌"
		>
			🔀
		</button>
		<button 
			class="theme-toggle" 
			on:click={toggleTheme}
			title="切换主题"
		>
			{isDarkMode ? '☀️' : '🌙'}
		</button>
		<a href="/" class="back-btn" title="返回主页">
			🏠
		</a>
	</div>
</header>

<style>
	.study-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px 0;
		border-bottom: 1px solid #e0e0e0;
		margin-bottom: 20px;
	}

	.header-left {
		flex: 1;
	}

	.progress-info {
		margin-bottom: 8px;
	}

	.progress {
		background: #3498db;
		color: white;
		padding: 4px 12px;
		border-radius: 16px;
		font-size: 0.85em;
		font-weight: 600;
	}

	.deck-name {
		margin: 0;
		font-size: 1.6em;
		font-weight: 600;
		color: #2c3e50;
		line-height: 1.3;
	}

	.header-right {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.action-btn,
	.theme-toggle,
	.back-btn {
		background: none;
		border: 1px solid #e0e0e0;
		width: 44px;
		height: 44px;
		border-radius: 8px;
		cursor: pointer;
		font-size: 1.2em;
		transition: all 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		color: inherit;
	}

	.action-btn:hover,
	.theme-toggle:hover,
	.back-btn:hover {
		background: #f8f9fa;
		border-color: #bdc3c7;
		transform: translateY(-1px);
	}

	@media (max-width: 768px) {
		.study-header {
			flex-direction: column;
			align-items: flex-start;
			gap: 15px;
		}

		.header-right {
			align-self: flex-end;
		}

		.deck-name {
			font-size: 1.3em;
		}

		.action-btn,
		.theme-toggle,
		.back-btn {
			width: 40px;
			height: 40px;
			font-size: 1.1em;
		}
	}

	:global(.dark-mode) .study-header {
		border-bottom-color: #40404c;
	}

	:global(.dark-mode) .deck-name {
		color: #e1e1e1;
	}

	:global(.dark-mode) .progress {
		background: #4aa9f0;
	}

	:global(.dark-mode) .action-btn,
	:global(.dark-mode) .theme-toggle,
	:global(.dark-mode) .back-btn {
		border-color: #50505c;
		background: #3c3c4a;
	}

	:global(.dark-mode) .action-btn:hover,
	:global(.dark-mode) .theme-toggle:hover,
	:global(.dark-mode) .back-btn:hover {
		background: #50505c;
	}
</style>
