<script lang="ts">
	import { fade } from 'svelte/transition';
	export let isLoading = false;
	export let msgLoading = 'Loading...';
</script>

{#if isLoading}
	<main class="load" transition:fade={{ duration: 200 }}>
		<div class="load__container">
			<div class="load-circle" />
			<div class="load-circle" />
			<div class="load-circle" />
			<div class="load-circle" />
		</div>
		<h2>{msgLoading}</h2>
	</main>
{/if}

<style lang="scss">
	.load {
		width: 100%;
		height: 100%;
		max-width: 1400px;
		background-color: rgb(var(--bg-color));
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		right: 0;
		bottom: 0;
		z-index: 10000;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		color: rgb(var(--text-color));
		row-gap: 1em;
		&__container {
			width: 2em;
			height: 2em;
			background-color: transparent;
			position: relative;
			animation: rotate linear infinite;
			animation-duration: 700ms;
		}
		& .load-circle {
			width: 0.5em;
			height: 0.5em;
			background-color: rgb(var(--primary));
			position: absolute;
			border-radius: var(--brd-radius);
			&:nth-child(1) {
				top: 50%;
				left: 50%;
				animation: load1 linear infinite 700ms alternate;
				transform: translate(-50%, -50%);
			}
			&:nth-child(2) {
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				animation: load2 linear infinite 700ms alternate;
			}
			&:nth-child(3) {
				bottom: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				animation: load3 linear infinite 700ms alternate;
			}
			&:nth-child(4) {
				top: 50%;
				right: 50%;
				transform: translate(-50%, -50%);
				animation: load4 linear infinite 700ms alternate;
			}
		}
	}
	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	@keyframes load1 {
		0% {
			top: 50%;
			left: 50%;
		}
		50% {
			top: 0%;
			left: 0%;
		}
		100% {
			top: 0%;
			left: 0%;
		}
	}
	@keyframes load2 {
		0% {
			top: 50%;
			left: 50%;
		}
		50% {
			top: 0%;
			left: 100%;
		}
		100% {
			top: 0%;
			left: 100%;
		}
	}
	@keyframes load3 {
		0% {
			top: 50%;
			left: 50%;
		}
		50% {
			top: 100%;
			left: 0%;
		}
		100% {
			top: 100%;
			left: 0%;
		}
	}
	@keyframes load4 {
		0% {
			top: 50%;
			left: 50%;
		}
		50% {
			top: 100%;
			left: 100%;
		}
		100% {
			top: 100%;
			left: 100%;
		}
	}
</style>
