<script lang="ts">
    import Bubble from "./Bubble.svelte"; 
    import Chatbox from "./Chatbox.svelte"
    let openchat = false;

</script>

<Bubble on:bubbling={()=> {openchat=!openchat}}/>
<Chatbox bind:chatboxOpen={openchat} />
