<script>
	import { onMount } from 'svelte';
	
	let mounted = $state(false);
	
	console.log('🔧 Svelte 5 测试: 脚本开始');
	
	onMount(() => {
		console.log('✅ Svelte 5: onMount 执行成功！');
		mounted = true;
		return () => {
			console.log('🧹 Svelte 5: cleanup');
		};
	});
	
	console.log('🔧 Svelte 5 测试: 脚本结束');
</script>

<h1>Svelte 5 onMount 测试</h1>
<p>已挂载: {mounted}</p>
<p>使用 $state 和新的 onMount 语法</p>
