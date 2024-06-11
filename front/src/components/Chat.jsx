import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import useWebSocket from 'react-use-websocket'
import { useState } from 'react'
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


function Chat() {
    const WS_URL = "ws://localhost:3001/chat"
    const [history, setHistory] = useState([{role: 'user',content:"Train prompt"}, {role: "assistant",content:"Test repsonse"}])
    const {lastMessage, lastJsonMessage, sendMessage, sendJsonMessage} = useWebSocket(WS_URL, {
        onOpen: () => {
          console.log('WebSocket connection established.');
        }
      });

      useEffect(() => {
        sendMessage("Hi there")
      },[])
      useEffect(() => {
        console.log(lastMessage?.data)
      },[lastMessage])

      return (
        <div sx={{display: 'flex-col', width: 1080, bgcolor:'blue'}}>
            <List sx={{ maxWidth: 1080,display:'flex-col', bgcolor: 'red', marginBottom: 1,paddingX: 2 }}>
                {history.map((message) => {

                const {role, content} = message;
                // console.log(content)
                let listItemStyling = {}
                if(role==='user'){
                    listItemStyling = {
                        ...listItemStyling,
                        bgcolor: '#dddddd',
                        borderRadius: 12   
                    }
                }

                return (<ListItem
                key={content}
                disableGutters
                // secondaryAction={
                //     <IconButton aria-label="comment">
                //     </IconButton>
                // }
                sx={listItemStyling}
                >
                    <ListItemText align={(role==='user')?"right":"left"} primary={`${content}`}/>
                </ListItem>)
})}
            </List>
            
            <TextField id="prompt" label="Enter the prompt" variant="outlined" multiline sx = {{
                width: 1080
            }}/>
        </div>
    )
}

export default Chat
