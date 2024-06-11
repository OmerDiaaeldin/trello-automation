const express = require("express")
const axios = require("axios").default
const ollama = require("ollama")
require("dotenv").config()

const app = express()
app.use(express.json())
var expressWs = require('express-ws')(app);

// chatbot

const jira_url = "https://omertemp65.atlassian.net/rest/api/latest/"
const jira_username = "omertemp65@gmail.com"
const auth = Buffer.from(`${jira_username}:${process.env.JIRA_API_KEY}`).toString('base64');
const jira_api = axios.create({
    baseURL: jira_url,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Authorization": `Basic ${auth}`
      },
})
model = "qwen:0.5b"
app.ws("/chat", (ws, req) => {
    ws.on("message", async (message) => {
        const prompt = message
        console.log(prompt)
        const chatbot = new ollama.Ollama()
        const config = {
            model: 'qwen:0.5b',
            messages: [{ role: 'user', content: prompt }],
            stream: true
        }
        for await (const token of await chatbot.chat(config)){
            ws.send(token.message.content)
        }
        
        ws.send(`reply: , ${prompt}`)
    })
})


// jira
app.get("/jira/projects", async (req, res) => {
    //get the projects using jira key
    try {
        const projects = (await jira_api.get("project/")).data.map((project) => {return {id: project.id,
        key:project.key, name: project.name, url: project.self}});
        res.send(projects)
    } catch (error) {
        console.log(`error: ${error}`)
        res.send(error)
    }
})

app.get("/jira/project/:projectKey/issues", async (req, res) => {
    //get the issues using jira key
    try {
        const {projectKey} = req.params
        const issues = (await jira_api.get(`search?jql=project=${projectKey}`)).data.issues.map((issue) => {return {
            id: issue.id,
            key: issue.key,
            url: issue.self
        }})
        res.send(issues)
    } catch (error) {
        console.log(`error: ${error}`)
        res.send(error)
    }
})

app.post("/jira/project/:projectKey", async (req, res) => {
    //convert chatbot reply to json

    //submit the issues using jira key
    const data = [{
        "fields": {
            "project": {
                "key": "DEMO"
            },
            "summary": "This issue was added via node js manually",
            "description": "postman issue",
            "issuetype":{
                "name": "Task"
            }
        }
    }]

    data.forEach(async (issue) => {
        await jira_api.post("issue",issue)
    });
    res.send("Done!")

})
const port = '3001'
app.listen(port, () => {
    console.log(`chat app listening on port ${port}`)
  })