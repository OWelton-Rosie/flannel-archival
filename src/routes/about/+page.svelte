<script>
	const commit = import.meta.env.VITE_COMMIT_HASH;
	const repo = "https://github.com/OWelton-Rosie/flannel-archival";
</script>


<h1>About</h1>

<p>Source code on <a href="https://github.com/OWelton-Rosie/flannel-archival" target="_blank" rel="noopener noreferrer">GitHub</a></p>
{#if commit}
<p class="build">Current version: <a href={`${repo}/commit/${commit}`} target="_blank" rel="noopener noreferrer"> {commit}</a></p>
{/if}
<p>Staging website: <a href="https://staging-flannel-archival.oweltonrosie.workers.dev/" target="_blank" rel="noopener noreferrer">staging-flannel-archival.oweltonrosie.workers.dev/</a></p>
<p>Site by <a href="https://oweltonrosie.com" target="_blank" rel="noopener noreferrer">Oscar Welton-Rosie</a></p>