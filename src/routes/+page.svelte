<script lang="ts">
	// Modules
	import { goto } from '$app/navigation';

	// Types and variables
	import { user } from '$lib/stores/user.store';
	import type { PageData } from './$types';

	export let data: PageData;
	const image_url = 'https://end.redruby.one/api/files/posts/'
</script>

<div class="min-h-screen flex flex-col items-center justify-center">
	<div class="text-center text-white p-8 max-w-4xl">
		<h1 class="text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-300">
			CS2 Club
		</h1>
		<p class="text-2xl mb-8 text-gray-300">Your ultimate destination for Counter-Strike 2 strategies, community, and more!</p>
		
		{#if $user}
			<p class="text-xl mb-6">Welcome back, {$user.username}!</p>
			<button class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 mb-8" on:click={() => goto('/account/profile')}>
				View Your Profile
			</button>
		{:else}
			<div class="space-x-4 mb-8">
				<button class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300" on:click={() => goto('/account/login')}>
					Login
				</button>
				<button class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300" on:click={() => goto('/account/register')}>
					Register
				</button>
			</div>
		{/if}
	</div>

	<div class="w-full max-w-6xl px-4">
		<h2 class="text-3xl font-bold mb-6 text-white">Latest Posts</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each data.posts as post}
				<div class="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
					<img src={image_url + post.id + "/" + post.main_image} alt={post.title} class="w-full h-48 object-cover" />
					<div class="p-4">
						<h3 class="text-xl font-semibold mb-2 text-white">{post.title}</h3>
						<p class="text-gray-300 mb-4">{post.content.substring(0, 100)}...</p>
						<button class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300" on:click={() => goto(`/post/${post.id}`)}>
							Read More
						</button>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>


