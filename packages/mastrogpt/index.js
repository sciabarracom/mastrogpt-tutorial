//--web true
//--kind nodejs:default

function main(arg) {
    const data = {
        "services": [
            {
                "name": "Private LLM",
                "url": "llama/ollama"
            },
            {
                "name": "Tester",
                "url": "mastrogpt/tester",
            }
        ]
    };
    return { "body": data };
}
