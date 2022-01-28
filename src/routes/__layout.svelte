<script context="module">
	export const load = async ({ url }) => ({
		props: {
			key: url
		},
	})
</script>

<script>
	import Nav from '../components/Nav.svelte'
	import PageTransition from '../components/PageTransition.svelte'

	export let key
</script>

<PageTransition refresh={key}>
	<div class='p-8 max-w-6xl mx-auto'>
		<Nav />
		<slot></slot>
	</div>
</PageTransition>

<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>