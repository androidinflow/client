<script lang="ts">
	// Modules
	import { goto } from '$app/navigation';

	// Types and variables
	import { user } from '$lib/stores/user.store';
	import type { PageData } from './$types';
	import Particles from '../lib/components/Particles.svelte';

	export let data: PageData;
	const image_url = 'https://end.redruby.one/api/files/posts/';
	
	import CardProduct from '$lib/components/CardProduct.svelte';
</script>

<div class="relative min-h-screen flex flex-col items-center justify-center">
	<!-- <Particles className="absolute inset-0 z-0" refresh={true} />
 -->
	<div class="z-10 text-center p-8 max-w-4xl">
		
		<h2 class="text-2xl sm:text-3xl md:text-4xl mb-8 text-primary">
			Your ultimate destination for Counter-Strike 2 strategies, community, and more!
		</h2>

		{#if $user}
			<p class="text-xl mb-6">Welcome back, {$user.username}!</p>
			<button class="btn btn-primary mb-8" on:click={() => goto('/account/profile')}>
				View Your Profile
			</button>
		{:else}
			<div class="space-x-4 mb-8">
				<button class="btn btn-primary" on:click={() => goto('/account/login')}> Login </button>
				
			</div>
		{/if}
	</div>

	<div class="w-full max-w-6xl px-4">
		<h2 class="text-3xl font-bold mb-6">Latest Posts</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each data.posts as post}
				<CardProduct
					title={post.title.substring(0, 50) + '...'}
					description={post.content.substring(0, 100) + '...'}
					imageUrl={image_url + post.id + '/' + post.main_image}
					buttonText="Read More"
				/>
			{/each}
		</div>
	</div>
</div>
