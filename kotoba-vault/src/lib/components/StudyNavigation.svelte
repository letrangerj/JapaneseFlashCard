<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let canGoPrev: boolean;
	export let canGoNext: boolean;

	const dispatch = createEventDispatcher();
</script>

<nav class="study-navigation">
	<button 
		class="nav-btn"
		class:disabled={!canGoPrev}
		disabled={!canGoPrev}
		on:click={() => dispatch('prev')}
	>
		← 上一个
	</button>

	<a href="/" class="home-btn">
		结束学习
	</a>

	<button 
		class="nav-btn"
		class:disabled={!canGoNext}
		disabled={!canGoNext}
		on:click={() => dispatch('next')}
	>
		下一个 →
	</button>
</nav>

<style>
	.study-navigation {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 15px;
		margin-top: 30px;
		padding-top: 20px;
		border-top: 1px solid #e0e0e0;
	}

	.nav-btn {
		background: white;
		border: 1px solid #e0e0e0;
		color: #2c3e50;
		padding: 12px 20px;
		border-radius: 8px;
		font-size: 1em;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
		min-width: 110px;
		font-family: inherit;
	}

	.nav-btn:hover:not(.disabled) {
		background: #f8f9fa;
		border-color: #bdc3c7;
		transform: translateY(-1px);
	}

	.nav-btn.disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.home-btn {
		background: #e74c3c;
		color: white;
		border: none;
		padding: 12px 24px;
		border-radius: 8px;
		font-size: 1em;
		font-weight: 500;
		text-decoration: none;
		transition: all 0.2s;
		text-align: center;
	}

	.home-btn:hover {
		background: #c0392b;
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
	}

	@media (max-width: 768px) {
		.study-navigation {
			flex-direction: column;
			gap: 12px;
		}

		.nav-btn,
		.home-btn {
			width: 100%;
			padding: 14px 20px;
		}

		.study-navigation {
			margin-top: 20px;
		}
	}

	:global(.dark-mode) .study-navigation {
		border-top-color: #40404c;
	}

	:global(.dark-mode) .nav-btn {
		background: #3c3c4a;
		border-color: #50505c;
		color: #e1e1e1;
	}

	:global(.dark-mode) .nav-btn:hover:not(.disabled) {
		background: #50505c;
		border-color: #60606c;
	}

	:global(.dark-mode) .home-btn {
		background: #e55a4e;
	}

	:global(.dark-mode) .home-btn:hover {
		background: #d34836;
	}
</style>
