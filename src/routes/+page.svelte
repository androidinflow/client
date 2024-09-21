<script lang="ts">
	// Modules
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

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

	$: ({ posts, totalPages, bookmarkedPostIds } = data);

	function isBookmarked(postId: string) {
		return bookmarkedPostIds.includes(postId);
	}

	function generatePagination(currentPage: number, totalPages: number) {
		const delta = 2;
		const range = [];
		const rangeWithDots = [];
		let l;

		range.push(1);

		for (let i = currentPage - delta; i <= currentPage + delta; i++) {
			if (i < totalPages && i > 1) {
				range.push(i);
			}
		}

		range.push(totalPages);

		for (let i of range) {
			if (l) {
				if (i - l === 2) {
					rangeWithDots.push(l + 1);
				} else if (i - l !== 1) {
					rangeWithDots.push('...');
				}
			}
			rangeWithDots.push(i);
			l = i;
		}

		return rangeWithDots;
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
			{#each posts as post}
				<div class="relative">
					<CardProduct
						title={post.title.substring(0, 50) + '...'}
						description={post.content.substring(0, 100) + '...'}
						imageUrl={image_url + post.id + '/' + post.main_image}
						buttonText="Read More"
						on:click={() => goto(`/post/${post.id}`)}
					/>
					<form action="?/toggleBookmark" method="POST" use:enhance>
						<input type="hidden" name="postId" value={post.id} />
						<button type="submit" class="absolute top-2 right-2 text-2xl">
							{isBookmarked(post.id) ? '★' : '☆'}
						</button>
					</form>
				</div>
			{/each}
		</div>
		
		
	</div>


	<!-- Pagination controls -->
	<div class="flex justify-center mt-5 z-50">
		<div class="flex flex-wrap gap-2">
			<button class="btn btn-xs" disabled={currentPage === 1} on:click={() => changePage(currentPage - 1)}>
				&lt;
			</button>
			
			{#each generatePagination(currentPage, totalPages) as item}
				{#if item === '...'}
					<span class="btn btn-xs btn-disabled">...</span>
				{:else}
					<button 
						class="btn btn-sm {currentPage === item ? 'btn-active' : ''}" 
						on:click={() => changePage(Number(item))}
					>
						{item}
					</button>
				{/if}
			{/each}
			
			<button class="btn btn-xs" disabled={currentPage === totalPages} on:click={() => changePage(currentPage + 1)}>
				&gt;
			</button>
		</div>
	</div>

</div>
