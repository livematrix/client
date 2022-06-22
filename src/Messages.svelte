<script lang="ts">
    import { messenger, unread } from "./stores.js"; 
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';

    let box:Element; 

    export function scrollDown(){
        box.scrollTo({top: box.scrollHeight, behavior: 'smooth'});
    } 

	onMount(async () => {
        scrollDown();
    });
</script>

<div class="tw-flex tw-flex-col tw-h-full tw-overflow-x-auto">
    <div class="tw-flex tw-flex-col tw-overflow-y-auto tw-max-h-80"  bind:this={box}>
    <div class="tw-grid tw-grid-cols-12 tw-gap-y-2" >
     {#each $messenger as message} 
      {#if message.author==="0"}
       <div class="tw-col-start-1 tw-col-end-13 tw-p-3 tw-rounded-lg" tw-transition:fade>
         <div class="tw-flex tw-flex-row tw-items-center">
           <div class="tw-flex tw-items-center tw-justify-center tw-h-10 tw-w-10 tw-rounded-full tw-bg-indigo-500 tw-flex-shrink-0">
             S
           </div>
           <div class="tw-relative tw-ml-3 tw-text-sm tw-bg-white tw-py-2 tw-px-4 tw-shadow tw-rounded-xl">
             <div>{message.body}</div>
           </div>
         </div>
       </div>
      {:else}
       <div class="tw-col-start-1 tw-col-end-13 tw-p-3 tw-rounded-lg" tw-transition:fade>
         <div class="tw-flex tw-items-center tw-justify-start tw-flex-row-reverse">
           <div class="tw-flex tw-items-center tw-justify-center tw-h-10 tw-w-10 tw-rounded-full tw-bg-indigo-500 tw-flex-shrink-0">
             G
           </div>
           <div class="tw-relative tw-mr-3 tw-text-sm tw-bg-indigo-100 tw-py-2 tw-px-4 tw-shadow tw-rounded-xl">
               <div>{ message.body }</div>
           </div>
         </div>
       </div>
      {/if}
     {/each}
    </div>
  </div>
</div>

