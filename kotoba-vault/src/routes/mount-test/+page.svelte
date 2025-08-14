<script lang="ts">
	import { onMount } from 'svelte';
	
	let mountExecuted = false;
	let mountTime = '';
	
	console.log('🔧 Mount测试脚本加载');
	
	onMount(() => {
		console.log('✅ onMount 执行成功！');
		mountExecuted = true;
		mountTime = new Date().toISOString();
	});
	
	setTimeout(() => {
		console.log('🕐 2秒后检查: onMount执行状态:', mountExecuted);
	}, 2000);
</script>

<svelte:head>
	<title>onMount 测试</title>
</svelte:head>

<div style="padding: 20px;">
	<h1>onMount 生命周期测试</h1>
	
	<p><strong>onMount 是否执行：</strong> 
		<span style="color: {mountExecuted ? 'green' : 'red'}; font-weight: bold;">
			{mountExecuted ? '是' : '否'}
		</span>
	</p>
	
	{#if mountExecuted}
		<p><strong>执行时间：</strong> {mountTime}</p>
	{/if}
	
	<p>如果上面显示"否"，说明 Svelte 的 onMount 生命周期有问题。</p>
</div>
