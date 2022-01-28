<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				error,
				status
			}
		}
	}
</script>

<script>
	import PageTitle from '../components/PageTitle.svelte'

	export let error
	export let status
</script>

<svelte:head>
	<title>Pokedex</title>
</svelte:head>

<PageTitle title={`Error ${status}`} />
<p>{error.message}.</p>
<p>Return to <a href='/'>home</a></p>