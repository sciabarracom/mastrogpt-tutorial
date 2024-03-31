<script>
    let body = `<h1>Welcome to MastroGPT</h1>
    <p>Please select the chat you want to use on the top menu.</p>`;

    // receive messages and forward to the display method
    async function handleMessages(ev) {
        let data = ev.data;
        if (data.type != "chat") {
            return;
        }
        //console.log(data);
        fetch("/api/my/mastrogpt/display", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((r) => r.text())
            .then((t) => {
                body = t;
            })
            .catch((e) => {
                body = "<h1>Error!</h1><p>Check logs for details.</p>";
                console.log(e);
            });
    }
</script>

<link rel="stylesheet" href="/css/display.css" />
<svelte:window on:message={handleMessages} />
<div id="_display_container_">
    {@html body}
</div>
