//--web true
//--kind nodejs:default

function main(arg) {
    const data = {
        "services": [
            {
                "name": "Demo",
                "url": "mastrogpt/demo",
            },
            {
                "name": "OpenAI",
                "url": "openai/chat"
            },
            {
                "name": "Private LLM",
                "url": "llama/ollama"
            }
        ]
    };
    return { "body": data };
}
