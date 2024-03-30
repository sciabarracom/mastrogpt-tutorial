<script>
    import { onMount } from "svelte";
    let base = document.location.href.replace(/index\.html$/, "");
    let services = {};

    onMount(() => {
        fetch(base + "api/my/mastrogpt/index")
            .then((x) => x.json())
            .then((data) => {
                for (const service of data["services"]) {
                    let name = ""+service.name
                    services[name] = service.url;
                }
            })
            .catch((e) => {
                console.log(e);
                alert("ERROR: cannot load index");
            });
    });

    function postMessage(event) {
        let name = event.target.name
        let url =  base + "api/my/" + services[name]
        let chat = document.getElementById("chat").contentWindow
        chat.postMessage({ type: "chat", name: name, url: url });
    }
</script>

<link rel="stylesheet" href="/css/index.css" />

<div id="top-area">
    <h2>MastroGPT</h2>
    {#each Object.keys(services) as name}
        <button  name={name} on:click={postMessage}>{name}</button>
    {/each}
</div>
<div id="iframe-container">
    <iframe title="chat" id="chat" src="/chat"></iframe>
    <iframe title="display" id="display" src="/display.html"></iframe>
</div>
