<script lang="ts">
	import type { DisplayMessage } from '$lib/dictionary'

	export let message: DisplayMessage
</script>

<li
	class="border-solid cursor-pointer border-2 rounded-xl px-4 py-1 overflow-x-auto first:mt-0"
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
	<!--	<p>{message.kind}</p>-->
	<p class="font-mono text-sm overflow-ellipsis whitespace-nowrap overflow-hidden">
		{message.name}
	</p>
	<!--	<p>{message.id}</p>-->
	<!--	<pre>{JSON.stringify(message.value, null, 4)}</pre>-->
</li>
