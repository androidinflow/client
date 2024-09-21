import type { PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { user } from '$lib/stores/user.store';

export const load: PageServerLoad = async ({ locals, url }) => {
    const filterCs = url.searchParams.get('filterCs') === 'true';
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const perPage = 5; // Number of posts per page
    
    try {
        const filter = filterCs ? 'cs = true' : '';
        const posts = await locals.pocketbase.collection('posts').getList(page, perPage, {
            sort: '-created',
            filter: filter
        });

        // Fetch bookmarks for the current user
        const bookmarks = await locals.pocketbase.collection('bookmarks').getFullList({
            filter: `user = user.id`,
            expand: 'post'
        });

        const bookmarkedPostIds = bookmarks.map(bookmark => bookmark?.expand?.post.id);

        return {
            posts: posts.items,
            totalPages: Math.ceil(posts.totalItems / perPage),
            currentPage: page,
            filterCs,
            bookmarkedPostIds
        };
    } catch (err) {
        console.error('Error fetching posts:', err);
        throw error(500, 'Error fetching posts');
    }
};

export const actions = {
    toggleBookmark: async ({ request, locals }) => {
        const data = await request.formData();
        const postId = data.get('postId');

        if (!locals.user) {
            // Redirect to login page with error message
            throw redirect(303, '/account/login?error=You must be logged in to bookmark posts!');
        }

        try {
            let existingBookmark;
            try {
                existingBookmark = await locals.pocketbase.collection('bookmarks').getFirstListItem(`user="${locals.user.id}" && post="${postId}"`);
            } catch (err: unknown) {
                // If the bookmark doesn't exist, this error is expected
                if (typeof err === 'object' && err !== null && 'status' in err && err.status !== 404) {
                    throw err;
                }
            }

            if (existingBookmark) {
                await locals.pocketbase.collection('bookmarks').delete(existingBookmark.id);
            } else {
                await locals.pocketbase.collection('bookmarks').create({
                    user: locals.user.id,
                    post: postId
                });
            }

            return { success: true };
        } catch (err: unknown) {
            console.error('Error toggling bookmark:', err);
            if (err instanceof Error) {
                return fail(500, { message: 'Error toggling bookmark', error: err.message });
            } else {
                return fail(500, { message: 'Error toggling bookmark', error: 'An unknown error occurred' });
            }
        }
    }
};