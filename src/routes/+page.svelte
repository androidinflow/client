<script lang="ts">
	// Modules
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	// Types and variables
	import { user } from '$lib/stores/user.store';
	import type { PageData } from './$types';
	import Particles from '../lib/components/Particles.svelte';

	export let data: PageData;
	const image_url = 'https://end.redruby.one/api/files/posts/';

	import CardProduct from '$lib/components/CardProduct.svelte';
	import MyBox from '$lib/components/Hero.svelte';
	import Hero from '$lib/components/Hero.svelte';

	$: filterCs = $page.url.searchParams.get('filterCs') === 'true';
	$: currentPage = parseInt($page.url.searchParams.get('page') || '1', 10);

	function toggleFilter() {
		goto(`?filterCs=${!filterCs}&page=1`, { replaceState: true });
	}

	function changePage(newPage: number) {
		goto(`?filterCs=${filterCs}&page=${newPage}`, { replaceState: true });
	}
</script>

<div class="relative min-h-screen flex flex-col items-center justify-center">
	<Particles className="absolute inset-0" refresh={true} />
	<Hero />
	

	<div class="w-full max-w-6xl px-4">
		<div class="flex justify-between items-center mb-6">
			<h2 class="text-3xl font-bold">Latest Posts</h2>
			<div class="tabs tabs-boxed">
				<button class="tab {!filterCs ? 'tab-active' : ''}" on:click={toggleFilter}>All Posts</button>
				<button class="tab {filterCs ? 'tab-active' : ''}" on:click={toggleFilter}>CS only</button>
			</div>
		</div>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each data.posts as post}
				<CardProduct
					title={post.title.substring(0, 50) + '...'}
					description={post.content.substring(0, 100) + '...'}
					imageUrl={image_url + post.id + '/' + post.main_image}
					buttonText="Read More"
					on:click={() => goto(`/post/${post.id}`)}
				/>
			{/each}
		</div>
		
		
	</div>


	<!-- Pagination controls -->
	<div class="flex justify-center mt-8 z-50">
		<div class="flex space-x-2">
			<button class="btn" disabled={data.currentPage === 1} on:click={() => changePage(data.currentPage - 1)}>
				Previous
			</button>
			{#each Array(data.totalPages) as _, i}
				<button class="btn {data.currentPage === i + 1 ? 'btn-active' : ''}" on:click={() => changePage(i + 1)}>
					{i + 1}
				</button>
			{/each}
			<button class="btn" disabled={data.currentPage === data.totalPages} on:click={() => changePage(data.currentPage + 1)}>
				Next
			</button>
		</div>
	</div>

</div>
