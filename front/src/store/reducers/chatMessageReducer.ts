import { conversationType } from "../../types/conversationType"
const initialState: conversationType =  [{role: "assistant", content: "How Can I help you today ?"}]

export default (state = initialState, { type, payload }: {type: string, payload: any}) => {
  const conversationCopy = [...state]
  switch (type) {

  case 'addNewMessage':
    conversationCopy.push(payload)
    return conversationCopy
  case 'appendToLastMessage':
    conversationCopy[conversationCopy.length-1].content += payload
    return conversationCopy
  
  default:
    return state
  }
}
