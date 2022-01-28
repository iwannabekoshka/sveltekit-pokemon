<script>
	import { fade } from 'svelte/transition'

	export let refresh = ''
</script>

{#key refresh}
	<div
		in:fade={{delay: 500}}
		out:fade
	>
		<slot></slot>
	</div>
{/key}