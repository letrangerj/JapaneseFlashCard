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

<header class="header md-card">
	<div class="header-left">
		<h1 class="app-title md-title-large">
			<span class="icon md-icon-surface">語</span>
			Kotoba Vault
		</h1>
		<p class="app-subtitle md-supporting-text">纯本地日语单词卡片学习应用</p>
	</div>

	<div class="header-right">
		<button 
			class="md-button-base md-outlined-button" 
			on:click={() => dispatch('export')}
			title="导出备份数据"
			aria-label="导出备份数据"
		>
			📤<span style="margin-left:6px">导出</span>
		</button>
		<button 
			class="md-button-base md-icon-button" 
			on:click={toggleTheme}
			title="切换主题"
			aria-label="切换主题"
		>
			{isDarkMode ? '☀️' : '🌙'}
		</button>
	</div>
</header>

<style>
	.header { display:flex; justify-content: space-between; align-items:center; padding:16px 24px; margin-bottom: 24px; }
	.header-left { flex:1; }
	.app-title { display:flex; align-items:center; margin:0 0 4px 0; }
	.icon { background: var(--md-sys-color-primary-container); color: var(--md-sys-color-on-primary-container); width:52px; height:52px; display:flex; align-items:center; justify-content:center; border-radius: var(--md-sys-shape-corner-large); margin-right:16px; font-weight:600; font-size:1.25rem; }
	.app-subtitle { margin:0; }
	.header-right { display:flex; align-items:center; gap:12px; }

	@media (max-width: 768px) {
		.header { flex-direction: column; align-items: flex-start; gap:16px; }
		.header-right { align-self: flex-end; }
		.icon { width:44px; height:44px; font-size:1.1rem; }
	}
</style>
