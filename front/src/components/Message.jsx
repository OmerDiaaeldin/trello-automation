import React from 'react'

function Message({ prompt }) {
  return (
    <div>
      <h1>{prompt}</h1>
      <h3>repsonse: </h3>
    </div>
  )
}

export default Message
