<script lang="ts">
    import { config } from "./stores.js"; 
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    
    let cfg:any; 
    config.subscribe((value:any) => {
		cfg = value;
	});

    interface Data{
        name: String, 
        surname: String,
        email: String,
    }
    const postData = {
      name: '',
      surname: '',
      email: ''
    }

    const dispatch = createEventDispatcher();

    let session = async (etc:any) => {
        const formBody = Object.keys(postData).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(postData[key as keyof Data])).join('&');
        fetch(`${cfg.config.server.proto}://${cfg.config.server.host}:${cfg.config.server.port}/session`,{ 
            method:"POST", 
            mode:"no-cors", 
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formBody, 
        })
        .then(res => {
            if(res.status===0)
                dispatch("sessiondone")
            else
                throw new Error('Network response was not OK');
            })
        .catch(err=> console.log(err))
    }
</script>

<div class="tw-flex tw-flex-col tw-h-full tw-overflow-x-auto">
    <div class="lg:tw-flex lg:tw-flex-wrap g-0">
      <div class="lg:tw-w-full 2 tw-px-0 md:tw-px-0">
        <div class="md:tw-p-5 md:tw-mx-5">
          <form>
            <p class="tw-mb-4">Please fill in your name/email:</p>
            <div class="tw-mb-4">
              <input
                type="text"
                class="form-control tw-block tw-w-full tw-px-3 tw-py-1.5 tw-text-base tw-font-normal tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-blue-600 focus:tw-outline-none"
                id="exampleFormControlInput1"
                placeholder="name"
                bind:value={postData.name}
              />
            </div>
            <div class="tw-mb-4">
              <input
                type="text"
                class="form-control tw-block tw-w-full tw-px-3 tw-py-1.5 tw-text-base tw-font-normal tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-blue-600 focus:tw-outline-none"
                id="exampleFormControlInput1"
                placeholder="surname"
                bind:value={postData.surname}
              />
            </div>
            <div class="tw-mb-4">
              <input
                type="text"
                class="form-control tw-block tw-w-full tw-px-3 tw-py-1.5 tw-text-base tw-font-normal tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-blue-600 focus:tw-outline-none"
                id="exampleFormControlInput1"
                placeholder="email"
                bind:value={postData.email}
              />
            </div>
            <div class="tw-text-center tw-pt-1 tw-mb-12 tw-pb-1">
             <button on:click={session}
                class="tw-inline-block tw-px-6 tw-py-2.5 tw-text-white tw-font-medium tw-text-xs tw-leading-tight tw-uppercase tw-rounded tw-shadow-md hover:tw-bg-blue-700 hover:tw-shadow-lg focus:tw-shadow-lg focus:tw-outline-none focus:tw-ring-0 active:tw-shadow-lg tw-transition tw-duration-150 tw-ease-in-out tw-w-full tw-mb-3"
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                style="
                  background: linear-gradient(
                    to right,
                    #ee7724,
                    #d8363a,
                    #dd3675,
                    #b44593
                  );
                "
              >
                open chat
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
</div>

