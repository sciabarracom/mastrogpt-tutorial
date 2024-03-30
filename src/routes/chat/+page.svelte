<script>
    import { marked } from "marked";

    // Globals
    let invoker = undefined;
    let messages = [];
    const displayWindow =
        window.parent.document.getElementById("display").contentWindow;



    // Constants
    const BOT_IMG = "/img/robot-mini.png";
    const PERSON_IMG = "/img/human-mini.png";
    const BOT_NAME = "BOT";
    const PERSON_NAME = "YOU";


    // Classes
    class Invoker {
        constructor(name, url) {
            this.name = name;
            this.url = url;
            this.state = null;
        }

        async invoke(msg) {
            // welcome message no input
            if (msg == null) {
                return "Welcome, you have selected " + this.name;
            }
            // no url
            if (this.url == null)
                return "Welcome, please select the chat application you want to use by clicking a  button on top.";
            // prepare a request
            let json = {
                input: msg,
            };
            if (this.state != null) {
                json["state"] = this.state;
            }
            // send the request
            return fetch(this.url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(json),
            })
                .then((r) => r.json())
                .then((r) => {
                    // got answer from the backend
                    console.log(r);
                    this.state = r.state;
                    let data = r;
                    let output = data.output;
                    delete data["output"];
                    delete data["state"];
                    data["type"] = "chat";
                    displayWindow.postMessage(data);
                    return output;
                })
                .catch((e) => {
                    console.log(e);
                    return `ERROR interacting with ${this.url}`;
                });
        }
    }

    function appendMessage(name, img, side, text) {
        //   Simple solution for small apps
        console.log(text);
        let html = marked.parse(text);
        messages.push([side, img, name, html]);

        //msgerChat.insertAdjacentHTML("beforeend", msgHTML);
        //msgerChat.scrollTop += 500;
    }

    function bot(msg) {
        appendMessage(BOT_NAME, BOT_IMG, "left", msg);
    }

    function human(msg) {
        appendMessage(PERSON_NAME, PERSON_IMG, "right", msg);
        msgerInput.value = "";
    }

    function formatDate(date) {
        const h = "0" + date.getHours();
        const m = "0" + date.getMinutes();
        return `${h.slice(-2)}:${m.slice(-2)}`;
    }


    let input = ""
    let title = "-"

    function submitForm(event) {
        event.preventDefault();

        if (!input) return;

        human(input);

        if (invoker) {
            invoker.invoke(input).then((reply) => bot(reply));
        } else {
            bot(
                "Please select a chat, clicking on one button on the top area.",
            );
        }
    }

    window.addEventListener("message", async function (ev) {
        if (ev.data.type != "chat") return;
        console.log(ev);
        invoker = new Invoker(ev.data.name, ev.data.url);
        title = ev.data.name;
        messages = []
        bot(await invoker.invoke(""));
    });
</script>

<link rel="stylesheet" href="/css/chat.css" />

<section class="msger">
    <header class="msger-header">
        <div id="chat-title" class="msger-header-title">{title}</div>
        <div class="msger-header-options">
            <span><i class="fas fa-cog"></i></span>
        </div>
    </header>
    <main id="chat-area" class="msger-chat">
        {#each messages as [side, img, name, html]}
            <div class="msg ${side}-msg">
                <div class="msg-bubble">
                    <div class="msg-info">
                        <div class="msg-info-name">
                            <div
                                class="msg-img"
                                style="background-image: url(${img})"
                            ></div>
                            <span>${name}</span>
                        </div>
                        <div class="msg-info-time">
                            ${formatDate(new Date())}
                        </div>
                    </div>
                    <div class="msg-text">${html}</div>
                </div>
            </div>
        {/each}
    </main>
    <form class="msger-inputarea">
        <input
            bind:value={input}
            type="text"
            class="msger-input"
            placeholder="Enter your message..."
        />
        <button type="submit" class="msger-send-btn" on:submit={submitForm}>Send</button>
    </form>
</section>
