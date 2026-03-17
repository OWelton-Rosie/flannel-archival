<script>
	import { createEventDispatcher } from "svelte";

	export let pdfs = [];

	let search = "";
	let sortMode = "name";

	const dispatch = createEventDispatcher();

	$: filtered = pdfs
		.filter((p) =>
			p.name.toLowerCase().includes(search.toLowerCase())
		)
		.sort((a, b) => {
			if (sortMode === "name") {
				return a.name.localeCompare(b.name);
			}

			if (sortMode === "year") {
				return (b.year ?? 0) - (a.year ?? 0);
			}

			return 0;
		});

	$: dispatch("update", filtered);
</script>

<div class="filters">

	<input
		type="text"
		placeholder="Search PDFs..."
		bind:value={search}
	/>

	<select bind:value={sortMode}>
		<option value="name">Sort: Name</option>
		<option value="year">Sort: Year</option>
	</select>

</div>

<style>
.filters {
	display: flex;
	gap: 10px;
	padding: 10px;
	border-bottom: 1px solid #ddd;
}

.filters input {
	flex: 1;
	padding: 6px;
}

.filters select {
	padding: 6px;
}
</style>