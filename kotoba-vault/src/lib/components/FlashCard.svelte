<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { CardData } from '$lib/db.js';

	export let card: CardData;
	export let showAnswer: boolean = false;

	const dispatch = createEventDispatcher();

	function speakText(text: string, lang = 'ja-JP') {
		if ('speechSynthesis' in window) {
			const utterance = new SpeechSynthesisUtterance(text);
			utterance.lang = lang;
			utterance.rate = 0.8;
			speechSynthesis.speak(utterance);
		}
	}

	function handleCardClick() {
		if (!showAnswer) {
			dispatch('toggle');
		}
	}

	function handleShowAnswer() {
		dispatch('toggle');
	}
</script>

<div class="flashcard-container">
	<div 
		class="flashcard"
		class:flipped={showAnswer}
		on:click={handleCardClick}
		role="button"
		tabindex="0"
		on:keydown={(e) => e.key === 'Enter' && handleCardClick()}
	>
		<!-- 前面 -->
		<div class="card-face card-front">
			<div class="front-content">
				<div class="word-container">
					<div class="main-word">{card.word}</div>
					<button 
						class="audio-btn"
						on:click|stopPropagation={() => speakText(card.word)}
						title="发音"
					>
						🔊
					</button>
				</div>
				
				{#if !showAnswer}
					<button 
						class="show-answer-btn"
						on:click|stopPropagation={handleShowAnswer}
					>
						<svg class="button-icon" viewBox="0 0 24 24" fill="currentColor">
							<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
						</svg>
						显示答案
					</button>
				{/if}
			</div>
		</div>

		<!-- 背面 -->
		<div class="card-face card-back">
			<div class="back-content">
				<div class="word-header">
					<span class="word">{card.word}</span>
					<span class="reading">({card.reading})</span>
					<button 
						class="audio-btn small"
						on:click|stopPropagation={() => speakText(card.word)}
						title="发音"
					>
						🔊
					</button>
				</div>

				<div class="meanings">
					{#each card.meanings as meaning, i (i)}
						<div class="meaning">{i + 1}. {meaning}</div>
					{/each}
				</div>

				{#if card.examples.length > 0}
					<div class="examples">
						<h4>例句</h4>
						<ul>
							{#each card.examples as example, i (i)}
								<li>
									<div class="jp-sentence">
										{@html example.jp_furigana}
										<button 
											class="audio-btn small"
											on:click|stopPropagation={() => speakText(example.jp_clean)}
											title="发音"
										>
											🔊
										</button>
									</div>
									<div class="cn-translation">{example.cn}</div>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
		.flashcard-container {
		width: 100%;
		max-width: 700px;
		height: 450px;
		perspective: 1000px;
		position: relative;
		cursor: pointer;
		border-radius: 1.5rem;
		transition: transform 0.6s;
		transform-style: preserve-3d;
	}

	.flashcard {
		width: 100%;
		height: 100%;
		position: relative;
		transform-style: preserve-3d;
		transition: transform 0.6s;
		cursor: pointer;
	}

	.flashcard.flipped {
		transform: rotateY(180deg);
	}

	.card-face { position:absolute; width:100%; height:100%; backface-visibility:hidden; -webkit-backface-visibility:hidden; background: var(--md-sys-color-surface-container-high); border-radius: 28px; box-shadow: var(--md-sys-elevation-level2); border:1px solid var(--md-sys-color-outline-variant); display:flex; flex-direction:column; padding:30px; box-sizing:border-box; }

	.card-back {
		transform: rotateY(180deg);
	}

	.front-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		text-align: center;
	}

	.word-container {
		display: flex;
		align-items: center;
		gap: 20px;
		margin-bottom: 30px;
	}

	.main-word {
		font-size: 4em;
		font-weight: 700;
		color: var(--md-sys-color-on-surface);
		line-height: 1.2;
	}

	.audio-btn { background:none; border:none; font-size:2rem; cursor:pointer; color: var(--md-sys-color-primary); transition: all .2s; padding:8px; border-radius: var(--md-sys-shape-corner-large); }

	.audio-btn.small {
		font-size: 1rem;
		padding: 4px;
	}

	.audio-btn:hover {
		background: rgba(52, 152, 219, 0.1);
		transform: scale(1.1);
	}

	.show-answer-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--md-sys-spacing-2);
		background: var(--md-sys-color-primary);
		color: var(--md-sys-color-on-primary);
		border: none;
		padding: 0 var(--md-sys-spacing-6);
		height: 48px;
		border-radius: var(--md-sys-shape-corner-medium);
		font-size: 16px;
		font-weight: 500;
		cursor: pointer;
		transition: all var(--md-sys-duration-short) var(--md-sys-easing-standard);
		box-shadow: var(--md-sys-elevation-level1);
		position: relative;
		overflow: hidden;
	}

	.show-answer-btn:hover {
		background: var(--md-sys-color-primary);
		box-shadow: var(--md-sys-elevation-level2);
		transform: translateY(-1px);
	}

	.show-answer-btn:active {
		transform: translateY(0);
		box-shadow: var(--md-sys-elevation-level1);
	}

	.button-icon {
		width: 20px;
		height: 20px;
		flex-shrink: 0;
	}

	.back-content {
		height: 100%;
		overflow-y: auto;
		text-align: left;
	}

	.back-content::-webkit-scrollbar {
		width: 6px;
	}

	.back-content::-webkit-scrollbar-track {
		background: var(--md-sys-color-surface-container);
		border-radius: 3px;
	}

	.back-content::-webkit-scrollbar-thumb {
		background: var(--md-sys-color-outline);
		border-radius: 3px;
	}

	.word-header {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 20px;
		padding-bottom: 15px;
		border-bottom: 1px solid var(--md-sys-color-outline-variant);
	}

	.word-header .word {
		font-size: 2.2em;
		font-weight: 600;
		color: var(--md-sys-color-on-surface);
	}

	.word-header .reading {
		font-size: 1.2em;
		color: var(--md-sys-color-on-surface-variant);
		font-weight: 400;
	}

	.meanings {
		margin-bottom: 25px;
	}

	.meaning {
		font-size: 1.1em;
		line-height: 1.6;
		margin-bottom: 8px;
		color: var(--md-sys-color-on-surface);
	}

	.examples h4 {
		margin: 0 0 15px 0;
		color: var(--md-sys-color-on-surface-variant);
		font-size: 1em;
		font-weight: 500;
	}

	.examples ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.examples li {
		margin-bottom: 20px;
		padding-bottom: 15px;
		border-bottom: 1px solid var(--md-sys-color-outline-variant);
	}

	.examples li:last-child {
		border-bottom: none;
		margin-bottom: 0;
		padding-bottom: 0;
	}

	.jp-sentence {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 8px;
		font-size: 1.05em;
		line-height: 1.8;
		color: var(--md-sys-color-on-surface);
	}

	.cn-translation {
		color: var(--md-sys-color-on-surface-variant);
		font-size: 0.95em;
		line-height: 1.5;
		padding-left: 5px;
	}

	:global(.flashcard ruby rt) {
		font-size: 0.6em;
		color: var(--md-sys-color-on-surface-variant);
	}

	@media (max-width: 768px) {
		.flashcard-container {
			height: 380px;
		}

		.card-face {
			padding: 20px;
		}

		.main-word {
			font-size: 3em;
		}

		.word-container {
			gap: 15px;
			margin-bottom: 20px;
		}

		.word-header .word {
			font-size: 1.8em;
		}

		.word-header .reading {
			font-size: 1em;
		}
	}
</style>
