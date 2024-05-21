<script lang="ts">
	import { page } from '$app/stores';
	import '../app.postcss';
</script>

<svelte:head>
	<title>{$page.url.hostname}</title>
	<link rel="icon" type="image/x-icon" href={`%sveltekit.assets%/favicon.png`} />

	<script async src="https://www.googletagmanager.com/gtag/js?id=G-J1TGFG0V29"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', 'G-J1TGFG0V29');
	</script>
</svelte:head>

<slot />
