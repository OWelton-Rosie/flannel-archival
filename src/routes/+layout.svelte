<script>
	import favicon from '$lib/assets/favicon.png';
	import '/src/app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


<Header />

{@render children()}

<Footer />
