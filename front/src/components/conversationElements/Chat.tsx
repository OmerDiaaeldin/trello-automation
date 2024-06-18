import {nanoid} from 'nanoid'
import { connect } from "react-redux"

function Chat({className,chatHistory}: {className?:string|undefined,chatHistory:any}) {
  
  // const chatHistory = useSelector((state:any) => state?.conversation)
  // const dispatch = useDispatch()
  console.log(chatHistory)
  return (
    <div className={`${className} flex justify-center scroll-smooth items-end pr-10 overflow-y-scroll`}>
        <ul className="w-full max-h-full">
          {chatHistory.map(({role,content}:{role:string,content:string}) => {
            const style = `flex ${(role==="assistant")?"justify-start":"justify-end"} my-10`
            console.log(style)
            return <li className={`${style}`} key={nanoid()}><div className={(role==='user')?"bg-gray-200 rounded-md px-5":""}>{content}</div></li>
          })}
        </ul>
    </div>
  )
}

const mapStateToProps = (state:any) => {
  return {
    chatHistory: state?.conversation
  }
}

export default connect(mapStateToProps,null)(Chat)