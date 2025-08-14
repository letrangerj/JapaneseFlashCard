<script>
	import { onMount } from 'svelte';
	
	let mounted = false;
	let domLoaded = false;
	let timeoutExecuted = false;
	
	console.log('🚀 测试开始');
	
	// 检查 DOM 是否已加载
	if (typeof document !== 'undefined') {
		console.log('📄 document 存在');
		domLoaded = true;
		
		// 使用原生 DOM 事件
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', () => {
				console.log('📄 DOMContentLoaded 事件触发');
			});
		} else {
			console.log('📄 DOM 已就绪');
		}
	}
	
	// 使用 setTimeout 作为备用方案
	setTimeout(() => {
		console.log('⏰ setTimeout 执行');
		timeoutExecuted = true;
		
		// 如果 onMount 没有执行，这里手动设置
		if (!mounted) {
			console.log('⚠️ onMount 未执行，使用 setTimeout 作为备用');
			mounted = true;
		}
	}, 100);
	
	onMount(() => {
		console.log('✅ onMount 执行成功！！！');
		mounted = true;
	});
	
	console.log('🚀 测试结束');
</script>

<h1>调试测试页面</h1>
<div>
	<p><strong>DOM 已加载:</strong> {domLoaded}</p>
	<p><strong>setTimeout 已执行:</strong> {timeoutExecuted}</p>
	<p><strong>onMount 已执行:</strong> <span style="color: {mounted ? 'green' : 'red'}; font-weight: bold;">{mounted}</span></p>
</div>

<style>
	h1 { color: #333; }
	div { padding: 20px; border: 1px solid #ccc; margin: 20px; }
</style>
