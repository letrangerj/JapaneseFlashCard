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
		class="upload-area md-card" 
		class:drag-over={dragOver}
		on:drop={handleDrop}
		on:dragover={handleDragOver}
		on:dragleave={handleDragLeave}
		on:click={openFileDialog}
		role="button"
		tabindex="0"
		aria-label="上传 Markdown 卡片组文件"
		on:keydown={(e) => e.key === 'Enter' && openFileDialog()}
	>
		<div class="upload-icon">📄</div>
		<h3 class="md-title" style="margin-top:0">上传卡片组</h3>
		<p class="md-supporting-text">点击或拖拽 Markdown (.md) 文件到这里</p>
		<div class="upload-hint md-supporting-text">支持格式：.md</div>
		<div style="margin-top:20px;">
			<button type="button" class="md-button-base md-filled-button">选择文件</button>
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
	.upload-container { margin-bottom: 30px; }
	.upload-area { text-align:center; padding:40px 24px; position:relative; border: 2px dashed var(--md-sys-color-outline-variant); background: var(--md-sys-color-surface-container); cursor:pointer; transition: border-color .25s, background .25s; }
	.upload-area:hover { border-color: var(--md-sys-color-primary); }
	.upload-area.drag-over { border-color: var(--md-sys-color-primary); background: var(--md-sys-color-primary-container); color: var(--md-sys-color-on-primary-container); }
	.upload-icon { font-size:3em; margin-bottom:16px; }
	.upload-hint { font-style: italic; }
	@media (max-width:768px){
		.upload-area { padding:30px 16px; }
		.upload-icon { font-size:2.5em; }
	}
	/* 深色模式依赖 Token 自动适配 */
</style>
