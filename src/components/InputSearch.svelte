<script>
	export let value
	export let placeholder
</script>

<input
	class='w-full rounded-md text--lg p-4 border-2 border-gray-200'
	type='text'
	placeholder={placeholder}
	bind:value={value}
>