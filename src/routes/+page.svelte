<script>
	import Search from "$lib/components/SearchBar.svelte";
	import PDFViewer from "$lib/components/PDF_viewer.svelte";

	let search = "";
</script>

<svelte:head>
	<title>Flannel Archival</title>
</svelte:head>

<Search bind:value={search} placeholder="Search PDFs..." />

<PDFViewer {search} />