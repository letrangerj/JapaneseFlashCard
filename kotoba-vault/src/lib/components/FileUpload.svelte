<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		upload: File;
	}>();

	let fileInput: HTMLInputElement;
	let dragOver = false;

	function handleFileSelect(event: Event) {
		const target = event.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file && file.name.endsWith('.md')) {
			dispatch('upload', file);
			target.value = ''; // 清空输入，允许重复上传同一文件
		} else if (file) {
			alert('请选择 Markdown (.md) 文件');
		}
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		dragOver = false;
		
		const file = event.dataTransfer?.files[0];
		if (file && file.name.endsWith('.md')) {
			dispatch('upload', file);
		} else if (file) {
			alert('请选择 Markdown (.md) 文件');
		}
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
		dragOver = true;
	}

	function handleDragLeave(event: DragEvent) {
		event.preventDefault();
		dragOver = false;
	}

	function openFileDialog() {
		fileInput.click();
	}
</script>

<div class="upload-container">
	<div 
		class="upload-area" 
		class:drag-over={dragOver}
		on:drop={handleDrop}
		on:dragover={handleDragOver}
		on:dragleave={handleDragLeave}
		on:click={openFileDialog}
		role="button"
		tabindex="0"
		on:keydown={(e) => e.key === 'Enter' && openFileDialog()}
	>
		<div class="upload-icon">📄</div>
		<h3>上传卡片组</h3>
		<p>点击选择或拖拽 Markdown 文件到这里</p>
		<div class="upload-hint">
			支持格式：.md（Markdown 文件）
		</div>
	</div>

	<input
		type="file"
		accept=".md"
		bind:this={fileInput}
		on:change={handleFileSelect}
		style="display: none;"
	/>
</div>

<style>
	.upload-container {
		margin-bottom: 30px;
	}

	.upload-area {
		border: 2px dashed #bdc3c7;
		border-radius: 12px;
		padding: 40px 20px;
		text-align: center;
		background: white;
		cursor: pointer;
		transition: all 0.3s ease;
		user-select: none;
	}

	.upload-area:hover {
		border-color: #3498db;
		background: #f8f9ff;
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(52, 152, 219, 0.1);
	}

	.upload-area.drag-over {
		border-color: #3498db;
		background: #e3f2fd;
		box-shadow: 0 0 20px rgba(52, 152, 219, 0.2);
	}

	.upload-icon {
		font-size: 3em;
		margin-bottom: 15px;
	}

	.upload-area h3 {
		margin: 0 0 10px 0;
		color: #2c3e50;
		font-size: 1.3em;
		font-weight: 600;
	}

	.upload-area p {
		margin: 0 0 15px 0;
		color: #7f8c8d;
		font-size: 1em;
	}

	.upload-hint {
		font-size: 0.9em;
		color: #95a5a6;
		font-style: italic;
	}

	@media (max-width: 768px) {
		.upload-area {
			padding: 30px 15px;
		}

		.upload-icon {
			font-size: 2.5em;
		}

		.upload-area h3 {
			font-size: 1.1em;
		}

		.upload-area p {
			font-size: 0.9em;
		}
	}

	:global(.dark-mode) .upload-area {
		background: #2a2a34;
		border-color: #50505c;
	}

	:global(.dark-mode) .upload-area:hover {
		background: #35354a;
		border-color: #4aa9f0;
	}

	:global(.dark-mode) .upload-area.drag-over {
		background: #3a3a4f;
		border-color: #4aa9f0;
	}

	:global(.dark-mode) .upload-area h3 {
		color: #e1e1e1;
	}

	:global(.dark-mode) .upload-area p {
		color: #8d8d9b;
	}

	:global(.dark-mode) .upload-hint {
		color: #6c6c7a;
	}
</style>
