<script>
    let body = `<h1>Welcome to MastroGPT</h1>
    <p>Please select the chat you want to use on the top menu.</p>`;

    // receive messages and forward to the display method
    async function handleMessages(ev) {
        body = ev.data;
    }
</script>

<svelte:window on:message={handleMessages} />

<div id="_display_container_" class="w-full h-full">
    {@html body}
</div>

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
    #_display_container_ {
        width: 100%;
        height: 100%;
    }
</style>
