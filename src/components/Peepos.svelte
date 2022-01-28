<script>
	import { peeposCount } from '../stores/peepoStore.js'

	let peeposArr = []

	$: {
		peeposArr = []
		for (let i = 1; i <= $peeposCount; i++) {
			peeposArr.push(i)
		}
	}
</script>

<h2>Peepos count</h2>
<input
	class='rounded-md text--lg p-4 border-2 border-gray-200'
	type='number'
	bind:value={$peeposCount}
	min='1'
	on:keydown|preventDefault
>
<div class='grid grid-flow-col justify-items-center'>
	{#each peeposArr as peepoNum}
		<img src='/static/peepoHop.gif' alt='Peepo Hop'>
	{/each}
</div>