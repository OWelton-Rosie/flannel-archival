<script>
	import { onMount } from "svelte";

	export let search = "";

	let pdfs = [];
	let selected = null;
	let highlightIndex = 0;

	onMount(async () => {
		const res = await fetch("/assets/pdfs/pdfs.json");
		pdfs = await res.json();
	});

	$: filtered = pdfs.filter((p) =>
		p.name.toLowerCase().includes(search.toLowerCase())
	);

	function handleKey(e) {
		if (filtered.length === 0) return;

		if (e.key === "ArrowDown") {
			e.preventDefault();
			highlightIndex = (highlightIndex + 1) % filtered.length;
		}

		if (e.key === "ArrowUp") {
			e.preventDefault();
			highlightIndex =
				(highlightIndex - 1 + filtered.length) % filtered.length;
		}

		if (e.key === "Enter") {
			selected = filtered[highlightIndex].url;
		}
	}

	$: if (highlightIndex >= filtered.length) {
		highlightIndex = 0;
	}
</script>

<svelte:window on:keydown={handleKey} />

<div class="container">

	<div class="sidebar">

		<ul>
			{#each filtered as pdf, i}
				<li>
					<button class:selected={i === highlightIndex} on:click={() => (selected = pdf.url)}> {pdf.name}</button>
				</li>
			{/each}
		</ul>

	</div>

	<div class="viewer">
		{#if selected}
			<iframe src={selected} title="PDF viewer"></iframe>
		{:else}
			<div class="empty">Select a PDF from the sidebar or press Enter.</div>
		{/if}
	</div>

</div>

<style>
.container {
	display: grid;
	grid-template-columns: 250px 1fr;
	height: 90vh;
}

.sidebar {
	border-right: 1px solid #ccc;
	padding: 10px;
	overflow-y: auto;
}

.sidebar ul {
	padding: 0;
	margin: 0;
}

.sidebar li {
	list-style: none;
	margin-bottom: 4px;
}

.sidebar button {
	width: 100%;
	text-align: left;
	padding: 6px;
	border: none;
	background: none;
	cursor: pointer;
}

.sidebar button:hover {
	background: #eee;
}

.sidebar button.selected {
	background: #dfe9ff;
}

.viewer iframe {
	width: 100%;
	height: 100%;
	border: none;
}

.empty {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	color: #777;
	font-size: 1.1rem;
}
</style>