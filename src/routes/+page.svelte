<script lang="ts">
	import { connect } from '$lib/websockets'
	import { onMount } from 'svelte'
	import Message from '$lib/components/Message.svelte'
	import type { DisplayMessage, EffectorMessage } from '$lib/dictionary'

	let messages: EffectorMessage[] = []
	let displayMessages: DisplayMessage[] = []
	let effectsRunning: Map<string, any> = new Map()

	let showDerived = false

	function handleEffectorLogMessage(message: EffectorMessage): DisplayMessage {
		let finalMessage: DisplayMessage = {
			split: false,
			id: 0,
			name: '',
			kind: '',
			value: '',
			derived: false,
		}

		if (message.kind === 'effect') {
			if (message.stack.fxID) {
				effectsRunning.set(message.stack.fxID, message)
			}
		}

		if (message.kind === 'event') {
			if (message.stack.fxID && message.name === 'finally') {
				finalMessage.name = `${effectsRunning.get(message.stack.fxID).name} - ${
					message.value.status
				}`
				effectsRunning.delete(message.stack.fxID)
				finalMessage.value = message.value.result
			} else {
				finalMessage.name = message.name
				finalMessage.value = message.value
			}
			finalMessage.kind = 'event'
			finalMessage.id = message.id

			if (displayMessages[displayMessages.length - 1]?.kind !== 'event') {
				finalMessage.split = true
			}
		} else {
			finalMessage.name = message.name
			finalMessage.kind = message.kind
			finalMessage.id = message.id
			finalMessage.value = message.value
			finalMessage.derived = message.derived ? message.derived : false
		}
		return finalMessage
	}

	onMount(() => {
		const socket = connect()
		socket.on('log-message', (message) => {
			try {
				const messageParsed = JSON.parse(message)
				messages = shouldDisplay(messageParsed) ? [...messages, messageParsed] : messages
				displayMessages = shouldDisplay(messageParsed)
					? [...displayMessages, handleEffectorLogMessage(messageParsed)]
					: displayMessages
				if (messageParsed.kind === 'effect') {
					if (messageParsed.stack.fxID) {
						effectsRunning.set(messageParsed.stack.fxID, messageParsed)
					}
				}
				if (shouldDisplay(messageParsed)) {
					console.log(messageParsed)
				}
			} catch (e) {
				messages = messages
			}
		})
	})

	const DisplayedMessagesKinds = [
		'effect',
		'event',
		'store',
		'done',
		'fail',
		'doneData',
		'failData',
	]

	const HiddenMessagesNames = [
		'updates',
		'pending',
		'inFlight',
		'done',
		'doneData',
		'fail',
		'failData',
	]

	function shouldDisplay(message: EffectorMessage): boolean {
		return (
			DisplayedMessagesKinds.includes(message.kind) && !HiddenMessagesNames.includes(message.name)
		)
	}
</script>

<h1 class="text-2xl text-amber-600 text-center mb-4">Effector Inspector</h1>
<label for="show-derived">
	Show derived
	<input id="show-derived" type="checkbox" bind:checked={showDerived} />
</label>
<div class="flex flex-col">
	<ul class="w-[400px] flex flex-col gap-y-1">
		{#each displayMessages as message}
			{#if showDerived || !message.derived}
				<Message {message} />
			{/if}
		{/each}
		{#if messages.length === 0}
			<div class="border-solid border border-amber-400 py-10">
				<p class="text-center">Waiting for messages...</p>
			</div>
		{/if}
	</ul>
	<section />
</div>

<button
	on:click={() => {
		messages = []
		displayMessages = []
	}}
	class="fixed right-6 bottom-6 bg-blue-400 rounded text-gray-50 px-6 py-4"
>
	Clear messages
</button>
