import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark' | 'auto';

// Create the theme store
function createThemeStore() {
	const { subscribe, set, update } = writable<Theme>('auto');

	return {
		subscribe,
		set: (theme: Theme) => {
			if (browser) {
				localStorage.setItem('theme', theme);
				applyTheme(theme);
			}
			set(theme);
		},
		init: () => {
			if (browser) {
				const stored = localStorage.getItem('theme') as Theme | null;
				const theme = stored || 'auto';
				set(theme);
				applyTheme(theme);
			}
		}
	};
}

function applyTheme(theme: Theme) {
	if (!browser) return;

	const root = document.documentElement;
	
	// Remove existing theme classes
	root.classList.remove('light-theme', 'dark-theme');
	
	if (theme === 'auto') {
		// Use system preference
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		root.classList.add(prefersDark ? 'dark-theme' : 'light-theme');
	} else {
		root.classList.add(`${theme}-theme`);
	}
}

export const themeStore = createThemeStore();

// Initialize theme when module loads
if (browser) {
	themeStore.init();
	
	// Listen for system theme changes
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
		themeStore.set('auto'); // This will reapply the auto theme
	});
}
