<script lang="ts">
	import Particles from '$lib/components/Particles.svelte';
	import { page } from '$app/stores';

	// Get the error message from the URL, if any
	$: errorMessage = $page.url.searchParams.get('error');
</script>

<div class="flex flex-col items-center min-h-screen lg:mt-20 md:mt-20 p-6">
	<div class="w-full max-w-md px-8 py-6 rounded-xl bg-base-100">
		<h3 class="mt-4 mb-4 text-3xl font-bold text-center">Login</h3>

		<form action="?/google" class="gap-2 p-4 rounded form-control" method="POST">
			<button
				aria-label="Sign in with Google"
				class="flex items-center gap-3 bg-primary rounded-full p-0.5"
			>
				<div class="flex items-center justify-center bg-white w-9 h-9 rounded-full">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5">
						<title>Sign in with Google</title>
						<desc>Google G Logo</desc>
						<path
							d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
							class="fill-google-logo-blue"
						></path>
						<path
							d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							class="fill-google-logo-green"
						></path>
						<path
							d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
							class="fill-google-logo-yellow"
						></path>
						<path
							d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
							class="fill-google-logo-red"
						></path>
					</svg>
				</div>
				<span class="text-sm text-black tracking-wider">Sign in with Google</span>
			</button>
		</form>
	</div>

	{#if errorMessage}
		<div class="flex items-center mt-4 p-2  text-red-400 rounded-lg">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-current shrink-0 h-6 w-6 mr-3"
				fill="none"
				viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<span>{errorMessage}</span>
		</div>
	{/if}
</div>
