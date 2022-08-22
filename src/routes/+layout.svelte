<script lang="ts">
	import { onMount } from 'svelte';
	import '../styles/styles.scss';
	
	// const cdnImport = [
	// 	'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js',
	// 	'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js'
	// ];

	// onMount(async () => {
	// 	msgLoading = 'Loading...';
	// 	isLoading = true;
	// 	(await import(cdnImport[0])).default;
	// 	(await import(cdnImport[1])).default;
	// });
</script>

<slot/>