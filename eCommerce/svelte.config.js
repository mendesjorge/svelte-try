import adapter from '@sveltejs/adapter-auto';
import { resolve } from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			resolve: {
				alias: {
					$modules: resolve('./src/module'),
					$images: resolve('./static/images')
				}
			}
		}
	}
};

export default config;
