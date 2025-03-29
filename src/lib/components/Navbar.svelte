<script>
	import { Menu, Home, Book, Mic, BarChart2 } from 'lucide-svelte';

	let navs = [
		{ name: 'Dashboard', link: '/', icon: Home },
		{ name: 'Library', link: '/library', icon: Book },
		{ name: 'Recordings', link: '/recordings', icon: Mic },
		{ name: 'Analysis', link: '/analysis', icon: BarChart2 }
	];
</script>

<div class="navbar bg-base-100 md:border-b border-accent md:relative">
	<div class="navbar-start">
		<div class="dropdown">
			<button class="btn btn-ghost lg:hidden" aria-label="Open menu">
				<Menu class="h-5 w-5" />
			</button>
			<ul
				class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border"
			>
				{#each navs as nav}
					<li>
						<a href={nav.link} class="flex items-center gap-2">
							<svelte:component this={nav.icon} class="h-4 w-4" />
							{nav.name}
						</a>
					</li>
				{/each}
			</ul>
		</div>
		<a class="btn btn-ghost normal-case text-xl font-bold border-2 border-primary" href="/">Crescendo</a>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			{#each navs as nav}
				<li>
					<a href={nav.link} class="text-[17px] mx-2 flex items-center gap-2">
						<svelte:component this={nav.icon} class="h-5 w-5" />
						{nav.name}
					</a>
				</li>
			{/each}
		</ul>
	</div>
	<div class="navbar-end">
		<button class="btn btn-ghost btn-circle" aria-label="Notifications">
			<div class="indicator">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
				<span class="badge badge-xs badge-primary indicator-item"></span>
			</div>
		</button>
		<div class="dropdown dropdown-end">
			<button tabindex="0" class="btn btn-ghost btn-circle avatar" aria-label="User menu">
				<div class="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
					<span class="text-lg font-bold">U</span>
				</div>
			</button>
			<ul class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
				<li><a href="/profile">Profile</a></li>
				<li><a href="/settings">Settings</a></li>
				<li><a href="/logout">Logout</a></li>
			</ul>
		</div>
	</div>
</div>