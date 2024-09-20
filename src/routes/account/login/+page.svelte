<script lang="ts">
	// Remove unused imports and variables
	// Keep only what's necessary for Google OAuth

	import Google from '$lib/components/svgs/Google.svelte';

	// Remove these variables
	// let email = '';
	// let password = '';
	// let error = '';

	// Remove handleSubmit and handleKeyboardInput functions

	// Keep any necessary logic for Google OAuth
</script>

<div class="flex flex-col items-center min-h-screen lg:mt-20 md:mt-20">
	<div class="w-full max-w-md px-8 py-6 rounded-xl bg-base-100">
		<h3 class="mt-4 mb-4 text-3xl font-bold text-center">Login</h3>

		<!-- Remove the entire email/password form -->

		<form
			action="?/google"
			class="gap-2 p-4 rounded form-control"
			method="POST"
		>
			<Google buttonText={'Login with Google'}></Google>
		</form>
	</div>
</div>

<style>
	/* You can keep or remove this section as needed */
</style>
