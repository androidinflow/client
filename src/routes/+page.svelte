<script lang="ts">
	// Modules
	import { goto } from '$app/navigation';

	// Types and variables
	import { user } from '$lib/stores/user.store';
	import type { PageData } from './$types';

	export let data: PageData;
	const image_url = 'https://end.redruby.one/api/files/posts/';
</script>

<div class="min-h-screen flex flex-col items-center justify-center">
	<div class="text-center p-8 max-w-4xl">
		<h1 class="text-7xl font-bold mb-4 text-primary">CS2 Club</h1>
		<p class="text-2xl mb-8 text-primary">
			Your ultimate destination for Counter-Strike 2 strategies, community, and more!
		</p>

		{#if $user}
			<p class="text-xl mb-6">Welcome back, {$user.username}!</p>
			<button class="btn btn-primary mb-8" on:click={() => goto('/account/profile')}>
				View Your Profile
			</button>
		{:else}
			<div class="space-x-4 mb-8">
				<button class="btn btn-primary" on:click={() => goto('/account/login')}> Login </button>
				<button class="btn btn-secondary" on:click={() => goto('/account/register')}>
					Register
				</button>
				<button
					class="btn animate-shine bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] text-neutral-400 border-neutral-800"
				>
					Button
				</button>
			</div>
		{/if}
	</div>



	<div
  class="inline-flex animate-shine max-w-[350px] w-full items-center justify-center rounded-xl text-sm border border-white/10 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 py-5 transition-colors"
>
  <div class="flex flex-col gap-2">
    <h3 class="text-xl font-semibold text-neutral-200">Luxe</h3>
    <p class="text-sm leading-[1.5] text-neutral-400">
      Explore the new website that simplifies the creation of sophisticated dark
      mode components.
    </p>
  </div>
</div>


	<div class="w-full max-w-6xl px-4">
		<h2 class="text-3xl font-bold mb-6">Latest Posts</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each data.posts as post}
				<div class="card bg-base-200 shadow-xl">
					<figure>
						<img
							src={image_url + post.id + '/' + post.main_image}
							alt={post.title}
							class="w-full h-48 object-cover"
						/>
					</figure>
					<div class="card-body">
						<h3 class="card-title">{post.title}</h3>
						<p>{post.content.substring(0, 100)}...</p>
						<div class="card-actions justify-end">
							<button class="btn btn-primary" on:click={() => goto(`/post/${post.id}`)}>
								Read More
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
