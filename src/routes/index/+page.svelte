<script>
	import { enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'

	export let data
	$: count = data.count
</script>

<svelte:head>
	<title>Index</title>
	<meta name="description" content="Index" />
</svelte:head>

<div class="search">
	<h1>Index</h1>
	<div class="index-count">Indexed items: {count}</div>
	<form
		class="search-form"
		action="/index?/add"
		method="post"
		use:enhance={() => {
			return ({ form, result }) => {
				if (result.type === 'success') {
					form.reset();
					invalidateAll();
				}
			};
		}}
	>
		<textarea name="indexData" id="indexData" cols="50" rows="10"></textarea>
		<button type="submit" class="submit" aria-label="Index items">Index items</button>
	</form>

</div>

<style lang="scss">
	.search {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
		line-height: 1;
	}

	.index-count {
		margin-bottom: 30px;
	}

	button {
		width: 100%;
		padding-top: 10px;
		padding-bottom: 10px;
		font-size: 20px;
		background-color: tomato;
		color: #FFF;
		border: none;
		cursor: pointer;

		&:hover,
		&:focus {
			background-color: #ff3e00;
		}
	}

	textarea {
		width: 100%;
	}

</style>
