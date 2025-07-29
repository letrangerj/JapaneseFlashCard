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
		perspective: 1000px;
		width: 100%;
		max-width: 500px;
		height: 550px;
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

	.card-face {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
		background: white;
		border-radius: 15px;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
		border: 1px solid #e0e0e0;
		display: flex;
		flex-direction: column;
		padding: 30px;
		box-sizing: border-box;
	}

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
		color: #2c3e50;
		line-height: 1.2;
	}

	.audio-btn {
		background: none;
		border: none;
		font-size: 2rem;
		cursor: pointer;
		color: #3498db;
		transition: all 0.2s;
		padding: 8px;
		border-radius: 8px;
	}

	.audio-btn.small {
		font-size: 1rem;
		padding: 4px;
	}

	.audio-btn:hover {
		background: rgba(52, 152, 219, 0.1);
		transform: scale(1.1);
	}

	.show-answer-btn {
		background: #3498db;
		color: white;
		border: none;
		padding: 15px 30px;
		border-radius: 8px;
		font-size: 1.2em;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.show-answer-btn:hover {
		background: #2980b9;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
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
		background: #f1f1f1;
		border-radius: 3px;
	}

	.back-content::-webkit-scrollbar-thumb {
		background: #c1c1c1;
		border-radius: 3px;
	}

	.word-header {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 20px;
		padding-bottom: 15px;
		border-bottom: 1px solid #e0e0e0;
	}

	.word-header .word {
		font-size: 2.2em;
		font-weight: 600;
		color: #2c3e50;
	}

	.word-header .reading {
		font-size: 1.2em;
		color: #7f8c8d;
		font-weight: 400;
	}

	.meanings {
		margin-bottom: 25px;
	}

	.meaning {
		font-size: 1.1em;
		line-height: 1.6;
		margin-bottom: 8px;
		color: #2c3e50;
	}

	.examples h4 {
		margin: 0 0 15px 0;
		color: #7f8c8d;
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
		border-bottom: 1px solid #f0f0f0;
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
		color: #2c3e50;
	}

	.cn-translation {
		color: #7f8c8d;
		font-size: 0.95em;
		line-height: 1.5;
		padding-left: 5px;
	}

	:global(.flashcard ruby rt) {
		font-size: 0.6em;
		color: #7f8c8d;
	}

	@media (max-width: 768px) {
		.flashcard-container {
			height: 450px;
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

	:global(.dark-mode) .card-face {
		background: #2a2a34;
		border-color: #40404c;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
	}

	:global(.dark-mode) .main-word {
		color: #e1e1e1;
	}

	:global(.dark-mode) .word-header {
		border-bottom-color: #40404c;
	}

	:global(.dark-mode) .word-header .word {
		color: #e1e1e1;
	}

	:global(.dark-mode) .word-header .reading {
		color: #8d8d9b;
	}

	:global(.dark-mode) .meaning {
		color: #e1e1e1;
	}

	:global(.dark-mode) .jp-sentence {
		color: #e1e1e1;
	}

	:global(.dark-mode) .cn-translation {
		color: #8d8d9b;
	}

	:global(.dark-mode) .examples h4 {
		color: #8d8d9b;
	}

	:global(.dark-mode) .examples li {
		border-bottom-color: #35354a;
	}

	:global(.dark-mode) .audio-btn {
		color: #4aa9f0;
	}

	:global(.dark-mode) .show-answer-btn {
		background: #4aa9f0;
	}

	:global(.dark-mode) .show-answer-btn:hover {
		background: #3891d9;
	}

	:global(.dark-mode) .back-content::-webkit-scrollbar-track {
		background: #35354a;
	}

	:global(.dark-mode) .back-content::-webkit-scrollbar-thumb {
		background: #50505c;
	}
</style>
