<script>
	import { onMount } from 'svelte';
	
	let mounted = false;
	
	console.log('🚀 简单测试: 脚本开始');
	
	onMount(() => {
		console.log('🎉 成功: onMount 执行了!');
		mounted = true;
	});
	
	console.log('🚀 简单测试: 脚本结束');
</script>

<h1>超简单 onMount 测试</h1>
<p>已挂载: {mounted}</p>
<p>如果上面显示 true，那么 onMount 工作正常。</p>
