const express = require("express")
const axios = require("axios").default
require("dotenv").config()

const app = express()
app.use(express.json())

// chatbot
const chatbot_url = "http://localhost:11434/api/chat"
const bot = axios.create({
    baseURL: chatbot_url
})

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
let chatbot_reply;
app.post("/chat",async (req, res) => {
    const {prompt} = req.body
    const data = {
        "model": model,
        "stream": false,
        "messages": [{ "role": "user", "content": prompt }]
    }
    chatbot_reply = (await bot.post('/',data)).data.message.content
    const raw_issues = chatbot_reply.split(".").slice(1).map(issue => issue.slice(0,issue.length))
    const issues = []
    for (let index = 0; index < raw_issues.length; index++) {
        if(index%2==1)continue
        issues.push(raw_issues[index]);
        
    }
    
    return res.send(chatbot_reply)
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