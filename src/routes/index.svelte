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
	import Peepos from '../components/Peepos.svelte'
	import InputSearch from '../components/InputSearch.svelte'

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

<Peepos />

<InputSearch bind:value={searchTerm} placeholder='Search Pokemon'/>

<div class='py-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
	{#each filteredPokemons as pokemon (pokemon.id)}
		<PokeCard pokemon={pokemon} />
	{/each}
</div>


