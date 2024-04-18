<script>
    let isEmpty = true;

    // receive messages and forward to the display method
    export async function displayResponse(data) {
        console.log("received data");
        isEmpty = false;
        const displayWindow =
            window.parent.document.getElementById("display").contentWindow;
        displayWindow.postMessage(data);
    }
</script>

<section
    class="w-full h-full border-4 p-1 border-bg-black shadow-lg bg-white rounded-xl overflow-auto"
>
    <iframe class="w-full h-full" title="display" id="display" src="/display"
    ></iframe>

    <!-- {#if !isEmpty}
    {:else}
        <div class="flex flex-col items-center h-full mt-48">
            <h1
                class="font-semibold font-arista text-4xl text-center text-surface-500 p-8 tracking-wide"
            >
                Welcome to MastroGPT
            </h1>
            <p class="text-lg">
                Please select the chat you want to use in the menu.
            </p>
        </div>
    {/if} -->
</section>

<style>
    :root {
        --primaryH: 210;
        --primaryS: 50%;
        --primaryL: 40%;
        --primary-bg: #fff;
        --secondaryH: 0;
        --secondaryS: 0%;
        --secondaryL: 13%;
        --secondary-bg: #fff;
        --font-family: Roboto, Helvetica, Arial, sans-serif;
        --font-size-root: 100%;
        --font-weight-bolder: 700;
        --font-weight-bold: 400;
        --font-weight-normal: 200;
        --font-weight-thin: 100;
        --line-height: 1.75rem;
        --heading-margin: 0.5rem 0 0.5rem;
        --border-radius: 2px;
        --error: #d00;
        --warning: #ec0;
        --info: #369;
        --correct: #080;
    }
</style>
