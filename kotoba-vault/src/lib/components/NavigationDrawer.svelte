<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let decks: any[] = [];
	export let searchQuery = '';

	const dispatch = createEventDispatcher<{
		navigate: string;
		export: void;
		search: void;
		upload: void;
		'theme-toggle': void;
	}>();

	function navigate(path: string) {
		dispatch('navigate', path);
	}

	function handleExport() {
		dispatch('export');
	}

	function handleSearch() {
		dispatch('search');
	}

	function handleUpload() {
		dispatch('upload');
	}

	function handleThemeToggle() {
		dispatch('theme-toggle');
	}
</script>

<!-- Persistent Navigation Drawer -->
<nav class="nav-drawer">
	<div class="nav-content">
		<!-- App Identity -->
		<div class="nav-header">
			<div class="app-identity">
				<div class="app-icon">語</div>
				<div class="app-info">
					<h2 class="app-name md-title">Kotoba Vault</h2>
					<p class="app-tagline md-supporting-text">日语单词学习</p>
				</div>
			</div>
		</div>

		<!-- Search FAB below identity -->
		<div class="nav-search-section">
			<button 
				class="search-fab md-button-base md-fab extended"
				on:click={handleSearch}
				title="搜索"
			>
				<svg class="fab-icon" viewBox="0 0 24 24" fill="currentColor">
					<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
				</svg>
				<span class="fab-label">搜索</span>
			</button>
		</div>

		<!-- Main Navigation -->
		<div class="nav-section">
			<div class="nav-items">
				<button class="nav-item active" on:click={() => navigate('/')}>
					<svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
						<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
					</svg>
					<span class="nav-label">主页</span>
				</button>
				
				<button class="nav-item" on:click={() => navigate('/library')}>
					<svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
						<path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
					</svg>
					<span class="nav-label">单词库</span>
				</button>
			</div>
		</div>
		<!-- Deck List Section -->
		<div class="nav-section">
			<h3 class="nav-section-title">学习卡组</h3>
			<div class="nav-items">
				{#each decks.slice(0, 5) as deck}
					<button 
						class="nav-item" 
						on:click={() => navigate(`/study/${deck.id}`)}
					>
						<svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
							<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
						</svg>
						<span class="nav-label">{deck.name}</span>
						<span class="nav-badge">{deck.cardCount || deck.cards?.length || 0}</span>
					</button>
				{/each}
				
				{#if decks.length > 5}
					<button class="nav-more" on:click={() => navigate('/library')}>
						查看全部 ({decks.length})
					</button>
				{/if}
			</div>
		</div>

		<!-- Upload Action -->
		<div class="nav-section">
			<button 
				class="nav-item upload-item" 
				on:click={handleUpload}
			>
				<svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
					<path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
				</svg>
				<span class="nav-label">添加文件</span>
			</button>
		</div>
	</div>

	<!-- Theme Toggle at bottom -->
	<div class="nav-bottom">
		<button 
			class="theme-toggle md-button-base md-icon-button"
			on:click={handleThemeToggle}
			title="切换主题"
		>
			<svg class="toggle-icon" viewBox="0 0 24 24" fill="currentColor">
				<path d="M12,18C11.11,18 10.26,17.8 9.5,17.45C11.56,16.5 13,14.42 13,12C13,9.58 11.56,7.5 9.5,6.55C10.26,6.2 11.11,6 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31L23.31,12L20,8.69Z"/>
			</svg>
		</button>
	</div>
</nav>

<style>
	.nav-drawer {
		position: fixed;
		top: 0;
		left: 0;
		width: 280px;
		height: 100vh;
		background: var(--md-sys-color-surface-container-low);
		border-right: 1px solid var(--md-sys-color-outline-variant);
		display: flex;
		flex-direction: column;
		z-index: 100;
		overflow: hidden;
	}

	/* Search FAB at top */
	.nav-search-section {
		padding: var(--md-sys-spacing-4);
		display: flex;
		justify-content: stretch;
		background: var(--md-sys-color-surface-container-highest);
		border-bottom: 1px solid var(--md-sys-color-outline-variant);
	}

	.search-fab {
		width: 100%;
		height: 56px;
		border-radius: var(--md-sys-shape-corner-large);
		background: var(--md-sys-color-primary);
		color: var(--md-sys-color-on-primary);
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--md-sys-spacing-2);
		box-shadow: var(--md-sys-elevation-level3);
		transition: all var(--md-sys-duration-short) var(--md-sys-easing-standard);
		position: relative;
		overflow: hidden;
	}

	.search-fab.extended {
		justify-content: flex-start;
		padding: 0 var(--md-sys-spacing-4);
	}

	.search-fab:hover {
		background: var(--md-sys-color-primary);
		box-shadow: var(--md-sys-elevation-level4);
		transform: scale(1.02);
	}

	.search-fab:active {
		transform: scale(0.98);
	}

	.fab-icon {
		width: 24px;
		height: 24px;
		flex-shrink: 0;
	}

	.fab-label {
		font-size: 14px;
		font-weight: 500;
		color: inherit;
	}

	/* App Identity */
	.nav-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--md-sys-spacing-4);
		background: var(--md-sys-color-surface-container-highest);
		border-bottom: 1px solid var(--md-sys-color-outline-variant);
	}

	.app-identity {
		display: flex;
		align-items: center;
		gap: var(--md-sys-spacing-3);
	}

	.app-icon {
		width: 40px;
		height: 40px;
		background: var(--md-sys-color-primary);
		color: var(--md-sys-color-on-primary);
		border-radius: var(--md-sys-shape-corner-medium);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 18px;
		font-weight: 500;
		box-shadow: var(--md-sys-elevation-level1);
	}

	.app-info {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.app-name {
		margin: 0;
		font-size: 20px;
		font-weight: 600;
		color: var(--md-sys-color-on-surface);
		line-height: 1.3;
	}

	.app-tagline {
		margin: 0;
		font-size: 12px;
		color: var(--md-sys-color-on-surface-variant);
		line-height: 1.2;
	}	/* Navigation Content */
	.nav-content {
		flex: 1;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
	}

	.nav-section {
		padding: var(--md-sys-spacing-3) var(--md-sys-spacing-4);
		border-bottom: 1px solid var(--md-sys-color-outline-variant);
	}

	.nav-section:last-child {
		border-bottom: none;
	}

	.nav-section-title {
		margin: 0 0 var(--md-sys-spacing-2) 0;
		font-size: 12px;
		font-weight: 600;
		color: var(--md-sys-color-on-surface-variant);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.nav-items {
		display: flex;
		flex-direction: column;
		gap: var(--md-sys-spacing-1);
	}

	/* Navigation Items */
	.nav-item {
		display: flex;
		align-items: center;
		gap: var(--md-sys-spacing-3);
		padding: var(--md-sys-spacing-3);
		border-radius: var(--md-sys-shape-corner-extra-large);
		text-align: left;
		width: 100%;
		border: none;
		background: transparent;
		color: var(--md-sys-color-on-surface);
		transition: all var(--md-sys-duration-short) var(--md-sys-easing-standard);
		position: relative;
		overflow: hidden;
		text-decoration: none;
		font-size: 14px;
		font-weight: 500;
		line-height: 1.4;
		min-height: 48px;
		cursor: pointer;
	}

	.nav-item:hover {
		background: var(--md-sys-color-secondary-container);
		color: var(--md-sys-color-on-secondary-container);
	}

	.nav-item.active {
		background: var(--md-sys-color-primary-container);
		color: var(--md-sys-color-on-primary-container);
		font-weight: 600;
	}

	.nav-item.upload-item {
		background: var(--md-sys-color-tertiary-container);
		color: var(--md-sys-color-on-tertiary-container);
		font-weight: 600;
	}

	.nav-item.upload-item:hover {
		background: var(--md-sys-color-tertiary);
		color: var(--md-sys-color-on-tertiary);
	}

	.nav-icon {
		width: 24px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.nav-label {
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.nav-badge {
		background: var(--md-sys-color-tertiary);
		color: var(--md-sys-color-on-tertiary);
		border-radius: var(--md-sys-shape-corner-full);
		padding: 2px 8px;
		font-size: 12px;
		font-weight: 600;
		min-width: 16px;
		text-align: center;
		line-height: 1.2;
	}

	.nav-more {
		padding: var(--md-sys-spacing-2) var(--md-sys-spacing-4);
		font-size: 12px;
		color: var(--md-sys-color-on-surface-variant);
		text-align: center;
		background: transparent;
		border: none;
		cursor: pointer;
		border-radius: var(--md-sys-shape-corner-medium);
		transition: background var(--md-sys-duration-short);
	}

	.nav-more:hover {
		background: var(--md-sys-color-surface-container-high);
	}

	/* Theme Toggle at Bottom */
	.nav-bottom {
		margin-top: auto;
		padding: var(--md-sys-spacing-4);
		border-top: 1px solid var(--md-sys-color-outline-variant);
		background: var(--md-sys-color-surface-container-lowest);
		display: flex;
		justify-content: center;
	}

	.theme-toggle {
		width: 48px;
		height: 48px;
		border-radius: var(--md-sys-shape-corner-full);
		background: transparent;
		color: var(--md-sys-color-on-surface-variant);
		border: 1px solid var(--md-sys-color-outline);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all var(--md-sys-duration-short) var(--md-sys-easing-standard);
		position: relative;
		overflow: hidden;
	}

	.theme-toggle:hover {
		background: var(--md-sys-color-surface-container-high);
		color: var(--md-sys-color-on-surface);
		border-color: var(--md-sys-color-outline-variant);
	}

	.theme-toggle:active {
		transform: scale(0.95);
	}

	.toggle-icon {
		width: 20px;
		height: 20px;
		transition: transform var(--md-sys-duration-short);
	}

	.theme-toggle:hover .toggle-icon {
		transform: rotate(180deg);
	}

	/* Mobile Responsiveness */
	@media (max-width: 768px) {
		.nav-drawer {
			transform: translateX(-100%);
			transition: transform var(--md-sys-duration-medium) var(--md-sys-easing-standard);
			z-index: 1000;
		}

		.nav-drawer.mobile-open {
			transform: translateX(0);
		}
	}
</style>
