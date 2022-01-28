<script>
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let value
	export let placeholder

	function inputChangeHandler() {
		dispatch(
			'onInputChange'
		)
	}
</script>

<input
	class='w-full rounded-md text--lg p-4 border-2 border-gray-200 mb-6'
	type='text'
	placeholder={placeholder}
	bind:value={value}
	on:input={inputChangeHandler}
>