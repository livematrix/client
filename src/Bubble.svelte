<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { unread } from "./stores.js"; 

	let countValue:number;
	unread.subscribe( (value:number) => {
		countValue = value;
	});
    const dispatch = createEventDispatcher();
    let bubble:Element;
    let minibubble:Element;
    let bubbleicon:Element;
    let toggleShow = () => {
        ['icon'].map((val)=> bubbleicon.classList.toggle(val));
        minibubble ? ['icon'].map((val)=> minibubble.classList.toggle(val)):null;
        ['buuubble'].map((val)=> bubble.classList.toggle(val));
        setTimeout(()=>{ 
            ['tw-rounded-full','tw-rounded-t-2xl'].map((val)=> bubble.classList.toggle(val));
        }, 200)
        dispatch("bubbling");
    }
</script>

<div class="tw-max-w-sm tw-flex tw-flex-col tw-flex-auto tw-h-full tw-p-6">
    <div bind:this="{bubble}" on:click={toggleShow} class="bubble tw-grid tw-grid-cols-5 tw-gap-3 tw-bg-slate-200 tw-p-4 tw-rounded-full tw-place-items-center">
        {#if countValue}
            <div bind:this="{minibubble}" class="tw-bg-red-600 tw-p-1 tw-px-2 tw-rounded-full tw-place-items-center tw-text-xs tw-font-semibold  tw-text-white tw-absolute tw-top-0 tw-right-0" >
                {countValue}
            </div>
        {/if}
        <div bind:this={bubbleicon} class="bubbleicon" style="">
            <img alt="bubble_icon" src="/static/images/bubbleicon.svg"/> 
        </div>
    </div>
</div>

<div class="buuubble icon">ok</div>

<style>

.icon{
    opacity: 0;
}

.bubbleicon{
    position:absolute;
    z-index: -1;
    color: #afafaf;
    transition: 0.25s all;
}

.bubble:hover .bubbleicon {
    transform: scale(1.3);
}

.bubble {
    z-index:999;
    position:fixed;
    bottom: 20px;
    right: 45px;
    width: 60px;
    height: 60px;
    transition: 0.2s ease-in-out;
}

.buuubble{
    opacity: 0;
    width: 336px;
    bottom: 415px;
    -webkit-transition: bottom 0.25s ease-in-out 0.35s, width 0.4s ease-in-out;
    -moz-transition: bottom 0.25s ease-in-out 0.35s, width 0.4s ease-in-out;
    -o-transition: bottom 0.25s ease-in-out 0.35s, width 0.4s ease-in-out;
    transition: bottom 0.25s ease-in-out 0.25s, width 0.25s ease-in-out, opacity 0.4s ease-in-out 0.35s;
}

</style>
