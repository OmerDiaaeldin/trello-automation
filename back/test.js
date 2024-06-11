const ollama = require("ollama")
const x = new ollama.Ollama()
const config = {
    model: 'qwen:0.5b',
    messages: [{ role: 'user', content: 'Why is the sky blue?' }],
    stream: true
}
const smth = async() => {
    for await (const value of await x.chat(config)){
        console.log(value.message.content)
    }
}

smth()