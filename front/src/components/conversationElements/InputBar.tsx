import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ChangeEvent, FormEventHandler, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import useWebSocket from 'react-use-websocket'

function InputBar({className,chatHistory, addNewMessage,appendToLastMessage}: {className?:string|undefined,chatHistory:any, addNewMessage:any,appendToLastMessage:any}) {
  const [prompt, setPrompt] = useState<string>("")
  const socketUrl = "ws://localhost:3001/chat"
  const {sendMessage, lastMessage} = useWebSocket(socketUrl)

  useEffect(() => {
    if(lastMessage!==null){
      const responseToken = lastMessage.data
      console.log(responseToken)
      appendToLastMessage(responseToken)
    }
  },[lastMessage])

  const handleOnSubmit:FormEventHandler = async(e) => {
    e.preventDefault()
    const message = prompt;
    await addNewMessage({role:'user',content:message})
    await addNewMessage({role:'assistant',content:''})
    // console.log("The history from the input bar: ", chatHistory)
    setPrompt("")
    // sendMessage(`{"role":"user",content:"Hi there"}`);
    sendMessage(JSON.stringify([...chatHistory,{role:"user", content:prompt},{role:"assistant", content:""}]))
    // sendJsonMessage({role:"user", content:message})
  }
  return (
    <div className={`${className} flex justify-center items-center`}>
        <form className="w-full flex justify-center h-1/2 gap-7" onSubmit={handleOnSubmit}>
            {/* <textarea className="w-2/3 px-10"/> */}
            <TextField id="outlined-basic" value = {prompt} label="Prompt" variant="outlined" className="w-2/3"  onChange={(e:ChangeEvent) => {
              setPrompt((e.target as any)?.value)
            }}/>
            {/* <button type="submit" className="bg-blue-400 w-1/4">Submit</button> */}
            <Button variant="contained" type='submit'>Submit</Button>
        </form>
    </div>
  )
}

const mapStateToProps = (state:any) => {
  return {
    chatHistory: state?.conversation
  }
}
const mapDispatchToProps = (dispatch:Dispatch) => {
  return {
    addNewMessage: (payload: {role:string,content:string})=>dispatch({type:'addNewMessage',payload}),
    appendToLastMessage: (payload:string)=>dispatch({type:'appendToLastMessage',payload})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(InputBar)