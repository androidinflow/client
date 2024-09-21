<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { pocketbase } from '$lib/db/client';
	import { enhance } from '$app/forms';
	export let data;

	let post: any | null = null;
	let error: string | null = null;
	const IMAGE_URL = 'https://end.redruby.one/api/files/posts/';
	$: ({ post, comments, user } = data);
	$: mainImageUrl = post ? `${IMAGE_URL}${post.id}/${post.main_image}` : '';
	$: additionalImageUrls = post
		? post.other_images.map((img: string) => `${IMAGE_URL}${post.id}/${img}`)
		: [];

	onMount(async () => {
		try {
			post = await pocketbase.collection('posts').getOne($page.params.id);
		} catch (e) {
			console.error('Error fetching post:', e);
			error = 'Failed to load post. Please try again later.';
		}
	});

	$: imageUrl = post ? `${IMAGE_URL}${post.id}/${post.main_image}` : '';
	$: otherImageUrls = post
		? post.other_images.map((img: string) => `${IMAGE_URL}${post.id}/${img}`)
		: [];
</script>

<div class="container mx-auto px-4 py-8 max-w-4xl">
	{#if error}
		<div class="alert alert-error shadow-lg">
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="stroke-current flex-shrink-0 h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span>{error}</span>
			</div>
		</div>
	{:else if post}
		<article class="prose lg:prose-xl mx-auto">
			<h1 class="text-3xl md:text-4xl font-bold mb-4 text-left">{post.title}</h1>
			<figure class="my-4">
				<img
					src={imageUrl}
					alt={post.title}
					class="rounded-lg shadow-lg w-full h-auto object-cover max-h-96"
				/>
			</figure>
			<div class="mt-6">
				<p class="text-lg leading-relaxed">{post.content}</p>
			</div>
			{#if otherImageUrls.length > 0}
				<div class="mt-8">
					<h2 class="text-2xl font-bold mb-4">Other Images</h2>
					<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						{#each otherImageUrls as imgUrl, index (index)}
							<img
								src={imgUrl}
								alt="Additional {index + 1}"
								class="  rounded-lg shadow-lg"
							/>
						{/each}
					</div>
				</div>
			{/if}
		</article>
	{:else}
		<div class="flex justify-center items-center h-64">
			<span class="loading loading-spinner loading-lg"></span>
		</div>
	{/if}

	<!-- Comments section -->
	<section class="mt-8">
		<h2 class="text-2xl font-bold mb-4">Comments</h2>
		{#each comments as comment}
			<div class="mb-4 p-4 bg-gray-100 rounded flex justify-between items-start">
				<div>
					<p class="font-bold">{comment.expand?.user?.username}</p>
					<p>{comment.content}</p>
				</div>
				{#if user && comment.user === user.id}
					<form method="POST" action="?/removeComment" use:enhance>
						<input type="hidden" name="commentId" value={comment.id} />
						<button type="submit" class="text-red-500 hover:text-red-700">
							Remove
						</button>
					</form>
				{/if}
			</div>
		{/each}

		<!-- Comment form -->
		{#if user}
			<form method="POST" action="?/addComment" use:enhance>
				<textarea name="content" class="w-full p-2 border rounded" required></textarea>
				<button type="submit" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Add Comment</button>
			</form>
		{:else}
			<p>Please <a href="/account/login" class="text-blue-500 hover:underline">log in</a> to add a comment.</p>
		{/if}
	</section>
</div>
