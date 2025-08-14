// 轻量 Ripple 与按压态实现，无外部依赖
// 使用方式：在布局 onMount 中调用 initMDInteractions();
// 会自动给 .md-button-base, .md-icon-button, a.md-button-base, .md-card[data-interactive] 添加涟漪效果。

interface RippleOptions { selector?: string; }

function createRipple(e: PointerEvent) {
	const target = e.currentTarget as HTMLElement;
	if (!target) return;
	const rect = target.getBoundingClientRect();
	// 如果用户设置了 reduce motion，使用更快更淡的动画
	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const ripple = document.createElement('span');
	ripple.className = 'md-ripple';
	const size = Math.max(rect.width, rect.height);
	const x = e.clientX - rect.left - size / 2;
	const y = e.clientY - rect.top - size / 2;
	ripple.style.width = ripple.style.height = size + 'px';
	ripple.style.left = x + 'px';
	ripple.style.top = y + 'px';
	if (reduceMotion) {
		ripple.style.animationDuration = '320ms';
		// 减少透明度
		ripple.style.opacity = '0.10';
	}
	target.appendChild(ripple);
	const remove = () => {
		ripple.removeEventListener('animationend', remove);
		ripple.remove();
	};
	ripple.addEventListener('animationend', remove);
}

function attach(el: HTMLElement) {
	if (el.dataset.rippleAttached) return;
	el.dataset.rippleAttached = 'true';
	el.classList.add('md-interactive');
	el.addEventListener('pointerdown', createRipple);
}

export function initMDInteractions(opts: RippleOptions = {}) {
	if (typeof window === 'undefined') return;
	const selector = opts.selector || '.md-button-base, .md-icon-button, a.md-button-base, .md-card[data-interactive]';
	const nodes = document.querySelectorAll<HTMLElement>(selector);
	nodes.forEach(attach);
	// 观察日后动态添加的元素（例如列表更新）
	const observer = new MutationObserver((muts) => {
		for (const m of muts) {
			m.addedNodes.forEach((n) => {
				if (!(n instanceof HTMLElement)) return;
				if (n.matches && n.matches(selector)) attach(n);
				n.querySelectorAll?.(selector).forEach((c) => attach(c as HTMLElement));
			});
		}
	});
	observer.observe(document.body, { childList: true, subtree: true });
	// 可在 window 上暴露关闭
	(window as any).__mdRippleObserver = observer;
}

export function disposeMDInteractions() {
	const observer: MutationObserver | undefined = (window as any).__mdRippleObserver;
	observer?.disconnect();
	delete (window as any).__mdRippleObserver;
	// 不主动移除事件以降低复杂度（元素随 DOM 移除即可 GC）
}
