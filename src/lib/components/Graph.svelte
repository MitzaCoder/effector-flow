<script lang="ts">
	import * as PIXI from 'pixi.js'
	import { onMount } from 'svelte'
	import type { DisplayMessage } from '$lib/dictionary'

	export let messages: DisplayMessage[] = []

	const app = new PIXI.Application<HTMLCanvasElement>({
		width: 800,
		height: 800,
		backgroundColor: 0x1099bb,
	})

	const graphics = new PIXI.Graphics()

	let parentElement: HTMLElement | null = null
	onMount(() => {
		if (!parentElement) {
			return
		}

		parentElement.appendChild(app.view)

		graphics.lineStyle(0) // draw a circle, set the lineStyle to zero so the circle doesn't have an outline
		graphics.beginFill(0xde3249, 1)
		graphics.drawCircle(100, 250, 50)
		graphics.endFill()
		app.stage.addChild(graphics)
	})
</script>

<section class="border border-b-sky-400" bind:this={parentElement} />
