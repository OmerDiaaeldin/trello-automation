import Chat from "./conversationElements/Chat"
import InputBar from "./conversationElements/InputBar"

function MainConversation({className}: {className?:string|undefined}) {
  return (
    <div className={`${className} flex flex-col items-center`}>
      <Chat className="w-full flex basis-5/6"/>
      <InputBar className="w-full flex basis-1/6"/>
    </div>
  )
}

export default MainConversation
