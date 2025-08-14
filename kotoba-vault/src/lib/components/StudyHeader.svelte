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

<header class="study-header md-card" style="padding:16px 20px; margin-bottom:24px;">
	<div class="header-left">
		<div class="progress-info"><span class="progress chip">{progress}</span></div>
		<h1 class="deck-name md-title-large" style="margin-top:4px;">{deckName}</h1>
	</div>
	<div class="header-right">
		<button class="md-button-base md-icon-button" on:click={() => dispatch('shuffle')} title="重新洗牌" aria-label="重新洗牌">🔀</button>
		<button class="md-button-base md-icon-button" on:click={toggleTheme} title="切换主题" aria-label="切换主题">{isDarkMode ? '☀️' : '🌙'}</button>
		<a href="/" class="md-button-base md-icon-button" title="返回主页" aria-label="返回主页">🏠</a>
	</div>
</header>

<style>
	.study-header { display:flex; justify-content:space-between; align-items:center; }

	.header-left {
		flex: 1;
	}

	.progress-info {
		margin-bottom: 8px;
	}

	.progress { background: var(--md-sys-color-primary-container); color: var(--md-sys-color-on-primary-container); padding:4px 12px; border-radius:999px; font-size:0.75rem; font-weight:600; letter-spacing:.5px; }

	.deck-name { margin:0; line-height:1.3; }

	.header-right {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	/* 按钮使用 md-icon-button 通用类 */

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

	/* 深色模式由 tokens 控制 */
</style>
