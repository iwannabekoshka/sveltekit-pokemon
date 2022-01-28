<script>
	import * as animateScroll from 'svelte-scrollto'
	import { sineOut } from 'svelte/easing'

	function onGoToTop() {
		animateScroll.scrollTo({y: 0, duration: 600, easing: sineOut})
	}
</script>

<button on:click={onGoToTop}>Go to top</button>

<style>
	button {
			position: fixed;
      right: 20px;
      bottom: 20px;
	}
</style>