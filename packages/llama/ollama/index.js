//--kind nodejs:20
//--web true
const { Ollama } = require('ollama')


async function main(args) {

    let input = args.input || ""
    if (!input) {
        res = {
            "output": "Welcome to the Private LLM demo chat. Choose a model to chat with above.",
            "title": "Open Source LLM Chat",
            "message": "You can chat with an LLM using custom models."
        }
        return { "body": res };

    }

    if (!args.model) {
        return {
            body: {
                output: "ERROR: missing model, Please choose one."
            }
        };
    }

    return {
        body: {
            output: "Set an HOST in the Ollama action!"
        }
    }

    const ollama = new Ollama({ host: 'HERE' })
    const response = await ollama.chat({
        model: args.model,
        messages: [{ role: 'user', content: input }],
    })
    res = extract(response.message.content);
    res['output'] = response.message.content;
    console.log(response)

    return { "body": res };
}


function extract(text) {
    const res = {};
    // search for a chess position
    const chessPattern = /(([rnbqkpRNBQKP1-8]{1,8}\/){7}[rnbqkpRNBQKP1-8]{1,8} [bw] (-|K?Q?k?q?) (-|[a-h][36]) \d+ \d+)/g;
    const chessMatches = text.match(chessPattern);
    if (chessMatches && chessMatches.length > 0) {
        res['chess'] = chessMatches[0];
        return res;
    }

    // search for code
    const codePattern = /```(\w+)\n(.*?)```/gs;
    const codeMatches = [...text.matchAll(codePattern)];
    if (codeMatches && codeMatches.length > 0) {
        const match = codeMatches[0];
        if (match[1] === "html") {
            let html = match[2];
            // extract the body if any
            const bodyPattern = /<body.*?>(.*?)<\/body>/gs;
            const bodyMatch = html.match(bodyPattern);
            if (bodyMatch) {
                html = bodyMatch[0];
            }
            res['html'] = html;
            return res;
        }
        res['language'] = match[1];
        res['code'] = match[2];
        return res;
    }
    return res;
}
