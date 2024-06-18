import MainConversation from "./components/MainConversation"
import Sidebar from "./components/Sidebar"

export default function App() {
  return (
    <div className="flex h-screen gap-4">
      <Sidebar className="basis-1/5 bg-yellow-500 border-black shadow-inner rounded-3xl ml-4"/>
      <MainConversation className="basis-4/5"/>
    </div>
  )
}