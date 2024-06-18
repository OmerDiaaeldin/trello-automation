import Top from "./SideBarElements/Top"
import Applications from "./SideBarElements/Applications"

function Sidebar({className}: {className?: string|undefined}) {
  return (
    <div className={`${className} flex flex-col shadow-2xl`}>
        <Top className="basis-1/5"/>
        <Applications className="basis-4/5"/>
    </div>
  )
}

export default Sidebar