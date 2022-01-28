import { writable } from 'svelte/store'

const initialValue = {
	limit: 12,
	search: ''
}

export const pokemonsStore = writable(initialValue)