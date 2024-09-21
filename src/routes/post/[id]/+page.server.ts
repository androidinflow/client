import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { pocketbase } from '$lib/db/client';

export const load: PageServerLoad = async ({ params, locals }) => {
    try {
        const post = await pocketbase.collection('posts').getOne(params.id, {
            expand: 'user,comments(post).user'
        });

        const comments = await pocketbase.collection('comments').getList(1, 50, {
            filter: `post="${params.id}"`,
            sort: '-created',
            expand: 'user'
        });

        return {
            post,
            comments: comments.items,
            user: locals.user // Add this line to pass the user information
        };
    } catch (e) {
        console.error('Error loading post:', e);
        throw error(404, 'Post not found');
    }
};

export const actions = {
    addComment: async ({ request, params, locals }) => {
        const form = await request.formData();
        const content = form.get('content') as string;

        if (!locals.user) {
            // Redirect to login page with error message
            throw redirect(303, '/account/login?error=You must be logged in to comment!');
        }

        try {
            await pocketbase.collection('comments').create({
                content,
                post: params.id,
                user: locals.user.id
            });
            return { success: true };
        } catch (e) {
            console.error('Error adding comment:', e);
            return { success: false, error: 'Failed to add comment' };
        }
    },

    removeComment: async ({ request, locals }) => {
        const form = await request.formData();
        const commentId = form.get('commentId') as string;

        if (!locals.user) {
            throw redirect(303, '/account/login?error=You must be logged in to remove a comment!');
        }

        try {
            const comment = await pocketbase.collection('comments').getOne(commentId);

            if (comment.user !== locals.user.id) {
                return { success: false, error: 'You can only remove your own comments' };
            }

            await pocketbase.collection('comments').delete(commentId);
            return { success: true };
        } catch (e) {
            console.error('Error removing comment:', e);
            return { success: false, error: 'Failed to remove comment' };
        }
    }
};
