<script context='module'>
	export async function load({ params }) {
		const url = `https://pokeapi.co/api/v2/pokemon/?limit=900`
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
	import PageTitle from '../components/PageTitle.svelte'
	import PokeCard from '../components/PokeCard.svelte'
	import Peepos from '../components/Peepos.svelte'
	import InputSearch from '../components/InputSearch.svelte'
	import * as animateScroll from "svelte-scrollto"
	import { sineOut } from 'svelte/easing'

	import { pokemonsStore } from '../stores/pokemonsStore.js'

	export let pokemons

	let filteredPokemons

	let y
	let buttonLoadMorePokemons

	let limit
	let searchTerm
	pokemonsStore.subscribe(store => {
		limit = store.limit
		searchTerm = store.search
	})

	function changeInputHandler() {
		pokemonsStore.update(store => {
			return {
				...store,
				search: searchTerm,
				limit: 12
			}
		})
	}

	function onLoadMorePokemons() {
		const scrollPosition = offset(buttonLoadMorePokemons).top

		pokemonsStore.update(store => {
			return {
				...store,
				limit: limit + 12
			}
		})

		setTimeout(() => {
			animateScroll.scrollTo({y: scrollPosition, duration: 600, easing: sineOut})
		}, 200)

	}

	function offset(el) {
		let rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
	}

	$: {
		if (searchTerm) {
			filteredPokemons = [...pokemons].filter(pokemon => pokemon.name
				.includes(searchTerm.toLowerCase()))
				.slice(0, limit)
		} else {
			filteredPokemons = [...pokemons].slice(0, limit)
		}
	}
</script>

<svelte:window bind:scrollY={y}/>

<svelte:head>
	<title>Pokedex</title>
</svelte:head>

<PageTitle title='Svelte Kit Pokedex' />

<Peepos />

<h3>Filter</h3>
<InputSearch
	on:onInputChange={changeInputHandler}
	bind:value={searchTerm}
	placeholder='Search Pokemon'
/>

<div
	class='py-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
>
	{#each filteredPokemons as pokemon (pokemon.id)}
		<PokeCard pokemon={pokemon} />
	{/each}
</div>

<div class='flex justify-center'>
	<button
		class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
		on:click={onLoadMorePokemons}
		bind:this={buttonLoadMorePokemons}
	>
		Load more
	</button>
</div>


