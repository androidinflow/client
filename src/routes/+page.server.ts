import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
    try {
        const posts = await locals.pocketbase.collection('posts').getList(1, 10, {
            sort: '-created',
        });

        return {
            posts: posts.items
        };
    } catch (err) {
        console.error('Error fetching posts:', err);
        throw error(500, 'Error fetching posts');
    }
};