import SidebarApplication from "./SidebarApplication"
import { SiJira } from "react-icons/si";

SidebarApplication
function Applications({className}: {className?:string|undefined}) {
  return (
    <>
        <div className={`${className}`}>
          <div className="flex justify-center mb-6">Applications</div>
          <div className=" grid grid-cols-2 gap-1">
            <span className="flex items-center justify-center border-1 rounded-3xl shadow-2xl bg-white border-black py-3"><SidebarApplication title="jira" icon={<SiJira/>}/></span>
            <span className="flex items-center justify-center border-1 rounded-3xl shadow-2xl bg-white border-black py-3"><SidebarApplication title="jira" icon={<SiJira/>}/></span>
            <span className="flex items-center justify-center border-1 rounded-3xl shadow-2xl bg-white border-black py-3"><SidebarApplication title="jira" icon={<SiJira/>}/></span>
          </div>
        </div>
    </>
  )
}

export default Applications
