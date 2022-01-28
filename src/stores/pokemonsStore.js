import { writable } from 'svelte/store'

const initialValue = {
	page: 1,
	limit: 12,
	search: ''
}

export const pokemonsStore = writable(initialValue)