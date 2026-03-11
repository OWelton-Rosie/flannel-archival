<script>
	import { onMount } from "svelte";

	export let value = "";
	export let placeholder = "";

	let input;

	onMount(() => {
		input.focus();
	});
</script>

<input bind:this={input} type="text" bind:value placeholder={placeholder} />

<style>
input {
	width: 100%;
	padding: 6px;
	margin-bottom: 10px;
	box-sizing: border-box;
	font-size: 14px;
}
</style>