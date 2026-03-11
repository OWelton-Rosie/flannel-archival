<script>
	import { onMount } from "svelte";

	export let search = "";

	let pdfs = [];
	let selected = null;
	let highlightIndex = 0;

	let viewer;
	let iframe;

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

		/* fullscreen shortcut */
		if (e.key.toLowerCase() === "f") {
			toggleFullscreen();
		}

		/* allow browser search inside PDF */
		if ((e.metaKey || e.ctrlKey) && e.key === "f") {
			iframe?.focus();
		}
	}

	function toggleFullscreen() {
		if (!document.fullscreenElement) {
			viewer.requestFullscreen();
		} else {
			document.exitFullscreen();
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
					<button class:selected={i === highlightIndex} on:click={() => (selected = pdf.url)}> {pdf.name} </button>
				</li>
			{/each}
		</ul>
	</div>

	<div class="viewer" bind:this={viewer}>

		{#if selected}
			<div class="toolbar">

				<button class="icon-btn" on:click={toggleFullscreen} title="Fullscreen (F)">
					<svg viewBox="0 0 24 24">
						<path d="M7 14H5v5h5v-2H7v-3zm12 5v-5h-2v3h-3v2h5zM7 7h3V5H5v5h2V7zm10 0v3h2V5h-5v2h3z"/>
					</svg>
				</button>
			</div>

			<iframe bind:this={iframe} src={selected} title="PDF viewer"></iframe>

		{:else}
			<div class="empty"> Select a PDF from the sidebar or press Enter.</div>
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

.viewer {
	position: relative;
	padding-bottom: 50px;
}

.viewer iframe {
	width: 100%;
	height: 100%;
	border: none;
}

.toolbar {
	position: absolute;
	top: 12px;
	right: 12px;
	z-index: 10;
}

.icon-btn {
	background: rgba(255,255,255,0.9);
	border: 1px solid #ccc;
	border-radius: 6px;
	padding: 6px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
}

.icon-btn:hover {
	background: white;
}

.icon-btn svg {
	width: 18px;
	height: 18px;
	fill: #333;
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