import React from 'react'

const Chat = ({ descendingOrderMessages }) => {
  return (
    <div className='p-4 height-[60vh] overflow-y-auto'>
        {descendingOrderMessages?.map((message, _index) => (
                    <div key={_index}>
                        <div className="chat-message-header"> {/*style these later*/}
                            <div className="w-[30px] h-[30px] rounded-2xl overflow-hidden m-2">
                                <img className='w-full' src={message.img} alt={message.name + ' profile'}/>
                            </div>
                            <p>{message.name}</p>
                        </div>
                        <p>{message.message}</p>
                    </div>
        ))}
    </div>
  )
}

export default Chat