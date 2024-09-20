<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { pocketbase } from '$lib/db/client';
    import type { Record } from 'pocketbase';

    let post: Record | null = null;
    let error: string | null = null;
    const IMAGE_URL = 'https://end.redruby.one/api/files/posts/';

    onMount(async () => {
        try {
            post = await pocketbase.collection('posts').getOne($page.params.id);
        } catch (e) {
            console.error('Error fetching post:', e);
            error = 'Failed to load post. Please try again later.';
        }
    });

    $: imageUrl = post ? `${IMAGE_URL}${post.id}/${post.main_image}` : '';
</script>

<div class="container mx-auto px-4 py-8">
    {#if error}
        <div class="alert alert-error shadow-lg">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{error}</span>
            </div>
        </div>
    {:else if post}
        <article class="prose lg:prose-xl">
            <h1 class="text-4xl font-bold mb-4">{post.title}</h1>
            <figure class="my-4">
                <img src={imageUrl} alt={post.title} class="rounded-lg shadow-lg" />
            </figure>
            <div class="mt-6">
                <p>{post.content}</p>
            </div>
        </article>
    {:else}
        <div class="flex justify-center items-center h-64">
            <span class="loading loading-spinner loading-lg"></span>
        </div>
    {/if}
</div>