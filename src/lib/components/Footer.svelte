<script>
	const commit = import.meta.env.VITE_COMMIT_HASH;
	const repo = "https://github.com/OWelton-Rosie/flannel-archival";
</script>

<footer>
	<p>
		<a href="/">Homepage</a> |
		<a href="https://github.com/OWelton-Rosie/flannel-archival" target="_blank" rel="noopener noreferrer">GitHub</a>
	</p>

	{#if commit}
	<p class="build">Running on <a href={`${repo}/commit/${commit}`} target="_blank" rel="noopener noreferrer"> {commit}</a></p>
	{/if}
</footer>

<style>
footer {
	background-color: #f8f8f8;
	padding: 1rem;
	text-align: left;
	font-size: 0.9rem;
	color: #555;
}

.build {
	font-family: monospace;
	font-size: 0.75rem;
	opacity: 0.6;
	margin-top: 0.4rem;
}

.build a {
	color: inherit;
	text-decoration: none;
}

.build a:hover {
	text-decoration: underline;
}
</style>