<script>
	import { enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'

	export let data
	console.log(data)
	$: count = data.count
	let searchResults = []
</script>

<svelte:head>
	<title>Search</title>
	<meta name="description" content="Search" />
</svelte:head>

<div class="search">
	<h1>Search</h1>
	<div class="index-count">Indexed items: {count}</div>
	<form
		class="search-form"
		action="/search?/search"
		method="post"
		use:enhance={() => {
			return ({ form, result }) => {
				if (result.type === 'success') {
					searchResults = result.data
					form.reset();
					invalidateAll();
				}
			};
		}}
	>
		<input name="text" aria-label="Search" placeholder="Enter your query and enter" />
	</form>
	{#if searchResults.length}
		<ul class="search-results">
			{#each searchResults as sr}
				<li>{sr.text}</li>
			{/each}
		</ul>
	{/if}

</div>

<style lang="scss">
	.search {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
		line-height: 1;
	}

	input {
		border: 1px solid transparent;

		&:focus-visible {
			box-shadow: inset 1px 1px 6px rgba(0, 0, 0, 0.1);
			border: 1px solid #ff3e00 !important;
			outline: none;
		}
	}

	.search-form input {
		font-size: 28px;
		width: 100%;
		padding: 0.5em 1em 0.3em 1em;
		box-sizing: border-box;
		border-radius: 8px;
		text-align: center;
	}

	.index-count {
		margin-bottom: 30px;
	}

	.search-results {
		list-style: square;
		padding-left: 15px;

		li {
			margin-top: 20px;
		}
	}

</style>
