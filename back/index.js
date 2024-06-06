const express = require("express")
const axios = require("axios")
require("dotenv").config()

const app = express()
app.use(express.json())

// chatbot
const chatbot_url = "http://localhost:11434/api/chat"
const bot = axios.create({
    baseURL: chatbot_url
})

const jira_url = "https://omertemp65.atlassian.net/rest/api/3/project"
const jira_username = "omertemp65@gmail.com"
const auth = Buffer.from(`${jira_username}:${process.env.JIRA_API_KEY}`).toString('base64');
const jira_api = axios.create({
    baseURL: jira_url,
    // headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //     "Authorization": `Base ${auth}`
    //   },
})
// model = "qwen:0.5b"
// let chatbot_reply;
// app.post("/chat",async (req, res) => {
//     const {prompt} = req.body
//     const data = {
//         "model": model,
//         "stream": false,
//         "messages": [{ "role": "user", "content": prompt }]
//     }
//     chatbot_reply = (await bot.post('/',data)).data.message.content
//     return res.send(chatbot_reply)
// })

// const countries = axios.create({
//     baseURL: "https://api.agify.io/?name=omer"
// })

// app.get("/test", async (req, res) => {
//     const {data} = (await countries.get(""))
//     console.log(data)
//     res.send(data)
// })

// jira
app.get("/jira", async (req, res) => {
    //get the issues using jira key
    try {
        const projects = (await jira_api.get(""));
        console.log(projects.data)
        // console.log(projects.headers)
        // console.log(projects.body)
        // console.log(projects.data)
        // console.log(projects.path)
        res.send("Done!!")
    } catch (error) {
        console.log(`error: ${error}`)
        res.send("error")
    }
})

// app.post("/jira", async (req, res) => {
//     //convert chatbot reply to json

//     //submit the issues using jira key

// })
const port = '3001'
app.listen(port, () => {
    console.log(`chat app listening on port ${port}`)
  })