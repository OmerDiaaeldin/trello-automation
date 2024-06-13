import MainConversation from "./components/MainConversation"
import Sidebar from "./components/Sidebar"

export default function App() {
  return (
    <div className="flex bg-black flex h-screen">
      <Sidebar className="bg-red-400 basis-1/5"/>
      <MainConversation className="bg-blue-400 basis-4/5"/>
    </div>
  )
}