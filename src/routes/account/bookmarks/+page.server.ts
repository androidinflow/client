import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        throw redirect(302, 'account/login');
    }

    try {
        const bookmarks = await locals.pocketbase.collection('bookmarks').getList(1, 50, {
            filter: `user = "${locals.user.id}"`,
            expand: 'post',
            sort: '-created'
        });

        const bookmarkedPosts = bookmarks.items.map(bookmark => bookmark?.expand?.post);

        return {
            bookmarkedPosts
        };
    } catch (err) {
        console.error('Error fetching bookmarks:', err);
        throw error(500, 'Error fetching bookmarks');
    }
};
