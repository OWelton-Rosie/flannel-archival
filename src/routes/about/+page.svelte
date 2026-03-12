<script>
	const commit = import.meta.env.VITE_COMMIT_HASH;
	const repo = "https://github.com/OWelton-Rosie/flannel-archival";
</script>

<svelte:head>
    <title>About this site</title>
</svelte:head>


<h1>About this site</h1>

<p>This site is an archival of all published Flannels.</p>

<ul>
	<li>Source code on <a href="https://github.com/OWelton-Rosie/flannel-archival" target="_blank" rel="noopener noreferrer">GitHub</a></li>
	{#if commit} <li>Current version: <a href={`${repo}/commit/${commit}`} target="_blank" rel="noopener noreferrer"> {commit}</a></li> {/if}
	<li>Staging website (contains unreleased features and may be broken): <a href="https://staging-flannel-archival.oweltonrosie.workers.dev/" target="_blank" rel="noopener noreferrer">https://staging-flannel-archival.oweltonrosie.workers.dev/</a></li>
	<li>Live website (latest stable version): <a href="https://flannel-archival.oweltonrosie.workers.dev/" target="_blank" rel="noopener noreferrer">https://staging-flannel-archival.oweltonrosie.workers.dev/</a></li>
	<li>Website written by <a href="https://oweltonrosie.com" target="_blank" rel="noopener noreferrer">Oscar Welton-Rosie</a></li>
</ul>

<p>For information on having content in our archives removed or redacted, <a href="/takedown">click here</a>.</p>