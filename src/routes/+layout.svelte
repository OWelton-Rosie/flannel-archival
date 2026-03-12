<script>
	import { onMount } from "svelte";

	import '/src/app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	let showWarning = $state(false);
	let override = $state(false);
	let checked = $state(false);

	function checkWidth() {
		const width = window.innerWidth;
		showWarning = width < 900 && !override;
	}

	onMount(() => {
		override = localStorage.getItem("mobile-ok") === "true";

		checkWidth();
		window.addEventListener("resize", checkWidth);

		checked = true;

		return () => window.removeEventListener("resize", checkWidth);
	});

	function continueAnyway() {
		override = true;
		localStorage.setItem("mobile-ok", "true");
		showWarning = false;
	}
</script>

<svelte:head>
<link rel="icon" href="/favicon.ico" />
</svelte:head>

{#if checked}
	{#if showWarning}
		<div class="mobile-warning">
			<div class="warning-card">

				<h1>Desktop recommended</h1>

				<p>
					This site is designed for larger screens and may not work well on
					mobile devices.
				</p>

				<p class="hint">
					For the best experience, please visit on a desktop or laptop.
				</p>

				<button onclick={continueAnyway}>
					Continue anyway
				</button>

			</div>
		</div>
	{:else}
		<Header />
		{@render children()}
		<Footer />
	{/if}
{/if}

<style>
.mobile-warning {
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background: var(--background);
	padding: 2rem;
}

.warning-card {
	max-width: 420px;
	text-align: center;
	padding: 2rem;
	border-radius: 12px;
	border: 1px solid #ddd;
	background: white;
	box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

.warning-card h1 {
	margin-bottom: 0.5rem;
}

.hint {
	color: #666;
	margin-bottom: 1.5rem;
}

.warning-card button {
	padding: 0.6rem 1.2rem;
	border-radius: 6px;
	border: none;
	cursor: pointer;
	background: 007BFF;
	color: white;
	font-size: 0.9rem;
}
</style>