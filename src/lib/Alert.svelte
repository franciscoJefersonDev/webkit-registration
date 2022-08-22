<script lang="ts">
  import { fade } from "svelte/transition";
  export let openAlert: boolean = false;
  export let msg: string = "";
</script>
<main>
  {#if openAlert}
    <div class="alert" transition:fade={{ duration: 200 }}>{msg}</div>
  {/if}
</main>

<style lang="scss">
  .alert {
    width: 95%;
    height: max-content;
    word-break: break-all;
    max-width: 500px;
    display: flex;
    position: fixed;
    left: 50%;
    bottom: 0.5em;
    align-items: center;
    justify-content: center;
    transform: translateX(-50%);
    background-color: var(--bg-alert);
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: var(--brd-radius);
    padding: 0.5em;
    z-index: 3;
    color: rgb(var(--text-color));
  }
</style>