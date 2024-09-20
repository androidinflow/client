import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, url }) => {
    const filterCs = url.searchParams.get('filterCs') === 'true';
    
    try {
        const filter = filterCs ? 'cs = true' : '';
        const posts = await locals.pocketbase.collection('posts').getList(1, 10, {
            sort: '-created',
            filter: filter
        });

        return {
            posts: posts.items,
            filterCs
        };
    } catch (err) {
        console.error('Error fetching posts:', err);
        throw error(500, 'Error fetching posts');
    }
};