import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, url }) => {
    const filterCs = url.searchParams.get('filterCs') === 'true';
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const perPage = 6; // Number of posts per page
    
    try {
        const filter = filterCs ? 'cs = true' : '';
        const posts = await locals.pocketbase.collection('posts').getList(page, perPage, {
            sort: '-created',
            filter: filter
        });

        return {
            posts: posts.items,
            totalPages: Math.ceil(posts.totalItems / perPage),
            currentPage: page,
            filterCs
        };
    } catch (err) {
        console.error('Error fetching posts:', err);
        throw error(500, 'Error fetching posts');
    }
};