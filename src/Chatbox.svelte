<script lang="ts">
    import { createEventDispatcher, SvelteComponent } from 'svelte';
	import { messenger, unread, config } from "./stores.js";
    import { tick } from 'svelte';
    import { onMount } from 'svelte';
    import Messages from "./Messages.svelte"
    import Session from "./Session.svelte"
    import { Socket } from "./websockets"

    export let chatboxOpen:boolean;
    const dispatch = createEventDispatcher();
    let cfg:any ; 
    let socket:Socket;  
    let MessagesComponent:SvelteComponent; 
    let msg:string = "";
    let node:Element;
    let session:any 
	let countValue:number;

	unread.subscribe( (value:number) => {
		countValue = value;
	});

    config.subscribe((value:any) => {
		cfg = value;
	});

    let notify = async () => {
        await tick().then(()=>{
            if(chatboxOpen)
                unread.set(0)
            else
                unread.update((n:number) => n + 1);
        })
    }

    let greetings = async () => {
        console.log("wjat...")
        let message:string = JSON.stringify({author:"0", body: cfg.greetings});
        messenger.update((messenger : any) => [...messenger, JSON.parse(message)]);
    }

    let scrolld = async () => {
        await tick().then(MessagesComponent.scrollDown);
    }
    let watchSession = () => {
        if(session && !socket)
            socket = new Socket({   url:`${cfg.config.websocket.proto}://${cfg.config.websocket.host}:${cfg.config.websocket.port}/entry`, 
                                    store:messenger,
                                    onopen: [greetings], 
                                    onmessage: [scrolld, notify]});
        else
            console.log("Socket either connected or no session yet")
    } 

    const addMsg = async () => {
        if (msg==="")
            return
        let message:string = JSON.stringify({author:"1", body: msg});
        messenger.update((messenger : any) => [...messenger, JSON.parse(message)]);
        socket.sendData(message)
        await tick().then(scrolld);
        dispatch("newmessage");
        msg = "";
    }

    let watchMe = (node:Element) => {
        if(node===undefined || node===null)
            return;
        if(chatboxOpen){
            node.classList.add('grow');
            node.classList.remove('chatHidden');
            unread.set(0);
        }else{
            node.classList.remove('grow');
            node.classList.add('chatHidden');
        }
        dispatch("togglechat", {
            variable: "empty" 
        });
    }

    onMount(async () => {
        session = document.cookie.match(/^(.*;)?\s*session_id\s*=\s*[^;]+(.*)?$/)
        await fetch('/static/config.json').then(res => {
            res.json().then(res=> {
                config.set(res)
                watchSession()
            });
        });
    });

    $: chatboxOpen, watchMe(node);

</script>


<div class="tw-fixed msgbox">
    <div bind:this={node}  class="tw-max-w-sm tw-flex tw-flex-col tw-flex-auto tw-h-full tw-p-6 chatHidden" >
      <div class="tw-grid tw-grid-cols-5 tw-gap-3 tw-bg-slate-200 tw-p-4 tw-rounded-t-2xl tw-place-items-center">
        <div class="">...</div>
        <div class="tw-col-start-2 tw-col-span-3 ">chat with me</div>
        <div class="">x</div>
      </div>
      <div class="tw-flex tw-flex-col tw-flex-auto tw-flex-shrink-0 tw-rounded-b-2xl tw-bg-gray-100 tw-h-full tw-px-4 tw-pb-4">
          {#if !session}
            <Session on:sessiondone={()=> (session = !session) && watchSession() } />
          {:else}
            <Messages bind:this={MessagesComponent} /> 
            <div class="tw-flex tw-flex-row tw-items-center tw-h-16 tw-rounded-xl tw-bg-white tw-w-full tw-px-4">
              <div>
              </div>
              <div class="tw-flex-grow">
                <div class="tw-relative tw-w-full">
                    <input bind:value={msg} on:keydown={e => e.key === 'Enter' && addMsg() } type="text" class="tw-flex tw-w-full tw-border tw-rounded-xl focus:tw-outline-none focus:tw-border-indigo-300 tw-pl-4 tw-pr-10 tw-h-10">
                  <button class="tw-absolute tw-flex tw-items-center tw-justify-center tw-h-full tw-w-12 tw-right-0 tw-top-0 tw-text-gray-400 hover:tw-text-gray-600">
                    <svg class="tw-w-6 tw-h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="tw-ml-4">
                  <button on:click={() => msg!=="" && addMsg()} class="tw-flex tw-items-center tw-justify-center tw-bg-indigo-500 hover:tw-bg-indigo-600 tw-rounded-xl tw-text-white tw-px-4 tw-py-1 tw-flex-shrink-0">
                  <span class="tw-p-5px">
                    <svg class="tw-w-4 tw-h-4 tw-transform tw-rotate-45 tw--mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          {/if}
      </div>
    </div>
</div>
<div class="grow"></div>

<style>

.msgbox{
    bottom:0;
    right: 20px;
}

.chatHidden{
    opacity: 0;
    padding-bottom: 5rem;
    height:0px;
    width:0px;
    transition: height 0.2s ease-in-out, opacity 0.2s ease-in-out, width 0.2s ease-in-out;
}
.grow{
    opacity: 1;
    width:100%;
    padding-bottom: 5rem;
    height: 500px;
    -webkit-transition:  height 1s ease-in-out;
    -moz-transition:  height 1s ease-in-out;
    -o-transition:  height 1s ease-in-out;
    transition: height 0.25s ease-in-out 0.25s, opacity 0.5s ease-in-out 0.5s;
}

</style>
