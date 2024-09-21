<script lang="ts">
	export let avatar: string | undefined;

	async function handleLogout(event: Event) {
		event.preventDefault();
		const form = new FormData();
		const response = await fetch('/account/logout', {
			method: 'POST',
			body: form
		});
		if (response.ok) {
			window.location.href = '/'; // Redirect to home page or login page after logout
		}

		/* this code can also be written as:
	<form action="/account/logout" method="POST" class="w-full">
		<button type="submit" class="w-44 m-0 text-left bg-slate-400">Logout</button>
	</form> */
	}
</script>

<div class="dropdown dropdown-end">
	<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
		<div class="w-12 overflow-hidden rounded-full">
			{#if avatar}
				<img
					class="object-cover w-full h-full border-4 rounded-full border-primary"
					alt="Account avatar and menu"
					src={avatar}
				/>
			{:else}
				<div class="flex items-center justify-center w-full h-full rounded-full bg-primary"></div>
			{/if}
		</div>
	</div>
	<ul class="menu menu-md dropdown-content mt-3 p-2 shadow rounded-box w-52 z-[100] bg-base-100">
		<li><a href="/account/profile" class="w-full">My Profile</a></li>
		<li><a href="/account/bookmarks" class="w-full">My bookmarkes</a></li>
		<li>
			<a href="/account/logout" class="w-full" on:click|preventDefault={handleLogout}>Logout</a>
		</li>
	</ul>
</div>
