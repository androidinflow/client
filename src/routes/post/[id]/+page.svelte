<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { pocketbase } from '$lib/db/client';


    let post: any | null = null;
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
    $: otherImageUrls = post ? post.other_images.map((img: any) => `${IMAGE_URL}${post.id}/${img}`) : [];
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
            {#if otherImageUrls.length > 0}
                <div class="mt-4">
                    <h2 class="text-2xl font-bold mb-4">Other Images</h2>
                    <div class="carousel max-w-xl h-64">
                        {#each otherImageUrls as imgUrl, index}
                            <div id="slide{index}" class="carousel-item relative w-full h-full">
                                <img src={imgUrl} alt={`Additional image ${index + 1}`} class="w-full h-full object-cover rounded-lg shadow-lg" />
                                <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a href="#slide{index === 0 ? otherImageUrls.length - 1 : index - 1}" class="btn btn-circle">❮</a> 
                                    <a href="#slide{index === otherImageUrls.length - 1 ? 0 : index + 1}" class="btn btn-circle">❯</a>
                                </div>
                            </div>
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
</div>