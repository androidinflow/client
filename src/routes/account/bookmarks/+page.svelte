<script lang="ts">
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    import CardProduct from '$lib/components/CardProduct.svelte';

    export let data: PageData;
    const { bookmarkedPosts } = data;
    const image_url = 'https://end.redruby.one/api/files/posts/';
</script>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Your Bookmarks</h1>

    {#if bookmarkedPosts.length === 0}
        <p class="text-lg">You haven't bookmarked any posts yet.</p>
    {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each bookmarkedPosts as post}
                <CardProduct
                    title={post.title.substring(0, 50) + '...'}
                    description={post.content.substring(0, 100) + '...'}
                    imageUrl={image_url + post.id + '/' + post.main_image}
                    buttonText="Read More"
                    on:click={() => goto(`/post/${post.id}`)}
                />
            {/each}
        </div>
    {/if}
</div>