<script>
	import { enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'

	export let data
	let searching = false
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
				searching = true
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
	<div class="searching">
		{#if searching && !searchResults.length}
			<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
		{/if}
	</div>
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

	.searching {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.lds-ellipsis {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;

		div {
			position: absolute;
			top: 33px;
			width: 10px;
			height: 10px;
			border-radius: 50%;
			background: tomato;
			animation-timing-function: cubic-bezier(0, 1, 1, 0);

			&:nth-child(1) {
				left: 8px;
				animation: lds-ellipsis1 0.6s infinite;
			}

			&:nth-child(2) {
				left: 8px;
				animation: lds-ellipsis2 0.6s infinite;
			}

			&:nth-child(3) {
				left: 32px;
				animation: lds-ellipsis2 0.6s infinite;
			}

			&:nth-child(4) {
				left: 56px;
				animation: lds-ellipsis3 0.6s infinite;
			}
		}
	}

	@keyframes lds-ellipsis1 {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}
	@keyframes lds-ellipsis3 {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(0);
		}
	}
	@keyframes lds-ellipsis2 {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(24px, 0);
		}
	}
</style>
