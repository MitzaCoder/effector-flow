<script lang="ts">
	import type { DisplayMessage } from '$lib/dictionary'
	import { slide } from 'svelte/transition'

	export let message: DisplayMessage

	let open = false
</script>

<li
	class="border-solid cursor-pointer border-2 rounded-xl overflow-x-auto first:mt-0 flex-shrink-0"
	class:mt-8={message.split}
	class:border-green-600={message.kind === 'event'}
	class:bg-green-50={message.kind === 'event'}
	class:hover:bg-green-100={message.kind === 'event'}
	class:border-blue-600={message.kind === 'effect'}
	class:bg-blue-50={message.kind === 'effect'}
	class:hover:bg-blue-100={message.kind === 'effect'}
	class:border-purple-600={message.kind === 'store'}
	class:bg-purple-50={message.kind === 'store'}
	class:hover:bg-purple-100={message.kind === 'store'}
>
	<header class="px-4 py-1" on:click={() => (open = !open)}>
		<p class="font-mono text-sm overflow-ellipsis whitespace-nowrap">{message.name}</p>
	</header>
	{#if open}
		<section transition:slide class="px-4 py-1">
			<!--			<p>{message.kind}</p>-->
			<!--			<p>{message.id}</p>-->
			<pre
				class="font-mono text-xs bg-white rounded p-4 border max-h-[400px] overflow-auto">{JSON.stringify(
					message.value,
					null,
					4,
				)}</pre>
		</section>
	{/if}
</li>
