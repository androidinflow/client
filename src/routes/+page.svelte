<script lang="ts">
	// Modules
	import { goto } from '$app/navigation';

	// Types and variables
	import { user } from '$lib/stores/user.store';
</script>

<div class="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 flex items-center justify-center">
	<div class="text-center text-white p-8 max-w-3xl">
		<h1 class="text-6xl font-bold mb-6">Welcome to Our Platform</h1>
		<p class="text-xl mb-8">Discover amazing features and connect with others in our community.</p>
		
		{#if $user}
			<p class="text-2xl mb-6">Hello, {$user.username}!</p>
			<button class="btn btn-primary btn-lg" on:click={() => goto('/account/profile')}>View Your Profile</button>
		{:else}
			<div class="space-x-4">
				<button class="btn btn-primary btn-lg" on:click={() => goto('/account/login')}>Login</button>
				<button class="btn btn-secondary btn-lg" on:click={() => goto('/account/register')}>Register</button>
			</div>
		{/if}
	</div>
</div>
