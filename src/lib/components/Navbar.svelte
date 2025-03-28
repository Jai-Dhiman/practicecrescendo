<!-- src/lib/components/Navbar.svelte -->
<script>
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	onMount(() => {
		themeChange(false);
	});
	let navs = [
		{ name: 'Dashboard', link: '/' },
		{ name: 'Library', link: '/library' },
		{ name: 'Recordings', link: '/recordings' },
		{ name: 'Analysis', link: '/analysis' }
	];
	let isCheck = false;
</script>

<div class="navbar bg-base-100 md:border-b border-accent md:relative">
	<div class="navbar-start">
		<div class="dropdown">
			<button class="btn btn-ghost lg:hidden" aria-label="Open menu">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/></svg
				>
			</button>
			<ul
				class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border"
			>
				{#each navs as nav}
					<li><a href={nav.link}>{nav.name}</a></li>
				{/each}
			</ul>
		</div>
		<a class="btn btn-ghost normal-case text-xl font-bold border-2 border-primary" href="/">Crescendo</a>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			{#each navs as nav}
				<li><a href={nav.link} class="text-[17px] mx-2">{nav.name}</a></li>
			{/each}
		</ul>
	</div>
	<div class="navbar-end">
		<button data-set-theme={isCheck ? 'light' : 'dark'}>
			<label for="theme-toggle" class="cursor-pointer label">
				<input id="theme-toggle" type="checkbox" class="toggle toggle-primary bg-primary" bind:checked={isCheck} />
			</label>
		</button>
	</div>
</div>