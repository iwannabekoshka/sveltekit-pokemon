<script context='module'>
	export async function load({ params }) {
		const url = `https://pokeapi.co/api/v2/pokemon/?limit=100`
		const res = await fetch(url)
		const data = await res.json()
		const loadedPokemons = data.results.map((pokemon, index) => {
			return {
				name: pokemon.name,
				id: index + 1,
				image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
			}
		})

		return {
			props: {
				pokemons: loadedPokemons
			}
		}
	}
</script>

<script>
	import PageTitle from '../components/PageTitle.svelte';
	import PokeCard from '../components/PokeCard.svelte';

	export let pokemons

	let searchTerm = ''
	let filteredPokemons

	$: {
		if (searchTerm) {
			filteredPokemons = [...pokemons].filter(pokemon => pokemon.name.includes(searchTerm.toLowerCase()))
		} else {
			filteredPokemons = [...pokemons]
		}
	}
</script>

<svelte:head>
	<title>Pokedex</title>
</svelte:head>

<PageTitle title='Svelte Kit Pokedex' />

<input
	class='w-full rounded-md text--lg p-4 border-2 border-gray-200'
	type='text'
	placeholder='Search Pokemon'
	bind:value={searchTerm}
>

<div class='py-4 grid gap-4 md:grid-cols-2 grid-cols-1'>
	{#each filteredPokemons as pokemon (pokemon.id)}
		<PokeCard pokemon={pokemon} />
	{/each}
</div>


