<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let canGoPrev: boolean;
	export let canGoNext: boolean;

	const dispatch = createEventDispatcher();
</script>

<nav class="study-navigation">
	<button 
		class="nav-button md-button-base"
		class:disabled={!canGoPrev}
		disabled={!canGoPrev}
		on:click={() => dispatch('prev')}
	>
		<svg class="button-icon" viewBox="0 0 24 24" fill="currentColor">
			<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
		</svg>
		上一个
	</button>

	<a href="/" class="end-study-button md-button-base">
		<svg class="button-icon" viewBox="0 0 24 24" fill="currentColor">
			<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
		</svg>
		结束学习
	</a>

	<button 
		class="nav-button md-button-base"
		class:disabled={!canGoNext}
		disabled={!canGoNext}
		on:click={() => dispatch('next')}
	>
		下一个
		<svg class="button-icon" viewBox="0 0 24 24" fill="currentColor">
			<path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
		</svg>
	</button>
</nav>

<style>
	.study-navigation {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--md-sys-spacing-4);
		margin-top: var(--md-sys-spacing-6);
		padding-top: var(--md-sys-spacing-4);
		border-top: 1px solid var(--md-sys-color-outline-variant);
	}

	.nav-button {
		display: flex;
		align-items: center;
		gap: var(--md-sys-spacing-2);
		padding: 0 var(--md-sys-spacing-4);
		height: 40px;
		background: var(--md-sys-color-surface-container);
		color: var(--md-sys-color-on-surface);
		border: 1px solid var(--md-sys-color-outline);
		border-radius: var(--md-sys-shape-corner-medium);
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: all var(--md-sys-duration-short) var(--md-sys-easing-standard);
		text-decoration: none;
	}

	.nav-button:hover:not(.disabled) {
		background: var(--md-sys-color-surface-container-high);
		border-color: var(--md-sys-color-outline-variant);
	}

	.nav-button.disabled {
		opacity: 0.38;
		cursor: not-allowed;
	}

	.end-study-button {
		display: flex;
		align-items: center;
		gap: var(--md-sys-spacing-2);
		padding: 0 var(--md-sys-spacing-4);
		height: 40px;
		background: var(--md-sys-color-error-container);
		color: var(--md-sys-color-on-error-container);
		border: none;
		border-radius: var(--md-sys-shape-corner-medium);
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: all var(--md-sys-duration-short) var(--md-sys-easing-standard);
		text-decoration: none;
	}

	.end-study-button:hover {
		background: var(--md-sys-color-error);
		color: var(--md-sys-color-on-error);
	}

	.button-icon {
		width: 18px;
		height: 18px;
		flex-shrink: 0;
	}

	@media (max-width: 768px) {
		.study-navigation {
			flex-direction: column;
			gap: var(--md-sys-spacing-3);
			margin-top: var(--md-sys-spacing-4);
		}

		.nav-button,
		.end-study-button {
			width: 100%;
			justify-content: center;
		}
	}
</style>
