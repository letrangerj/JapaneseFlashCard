<script lang="ts">
	import { createEventDispatcher } from 'svelte';

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

<header class="header">
	<div class="header-left">
		<h1 class="app-title">
			<span class="icon">語</span>
			Kotoba Vault
		</h1>
		<p class="app-subtitle">纯本地日语单词卡片学习应用</p>
	</div>

	<div class="header-right">
		<button 
			class="action-btn" 
			on:click={() => dispatch('export')}
			title="导出备份数据"
		>
			📤 导出
		</button>
		<button 
			class="theme-toggle" 
			on:click={toggleTheme}
			title="切换主题"
		>
			{isDarkMode ? '☀️' : '🌙'}
		</button>
	</div>
</header>

<style>
	.header {
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

	.app-title {
		display: flex;
		align-items: center;
		margin: 0 0 5px 0;
		font-size: 2em;
		font-weight: 700;
		color: #2c3e50;
	}

	.icon {
		background: linear-gradient(135deg, #3498db, #2980b9);
		color: white;
		width: 50px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 12px;
		margin-right: 15px;
		font-size: 1.2em;
		font-weight: bold;
	}

	.app-subtitle {
		margin: 0;
		color: #7f8c8d;
		font-size: 1em;
	}

	.header-right {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.action-btn {
		background: #3498db;
		color: white;
		border: none;
		padding: 10px 16px;
		border-radius: 8px;
		cursor: pointer;
		font-size: 0.9em;
		font-weight: 500;
		transition: all 0.2s;
	}

	.action-btn:hover {
		background: #2980b9;
		transform: translateY(-1px);
	}

	.theme-toggle {
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
	}

	.theme-toggle:hover {
		background: #f8f9fa;
		border-color: #bdc3c7;
	}

	@media (max-width: 768px) {
		.header {
			flex-direction: column;
			align-items: flex-start;
			gap: 15px;
		}

		.header-right {
			align-self: flex-end;
		}

		.app-title {
			font-size: 1.6em;
		}

		.icon {
			width: 40px;
			height: 40px;
			font-size: 1em;
		}
	}

	:global(.dark-mode) .header {
		border-bottom-color: #40404c;
	}

	:global(.dark-mode) .app-title {
		color: #e1e1e1;
	}

	:global(.dark-mode) .app-subtitle {
		color: #8d8d9b;
	}

	:global(.dark-mode) .theme-toggle {
		border-color: #50505c;
		background: #3c3c4a;
	}

	:global(.dark-mode) .theme-toggle:hover {
		background: #50505c;
	}
</style>
