import React, {useState, useEffect} from 'react'
import axios from 'axios'

const LongPullining = () => {

    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    useEffect(() => {
    subscripe()
    }, [messages])

    const subscripe = async () => {
        try {
            const {data} = await axios.get(`http://localhost:5000/get-messages`)
            setMessages( prev => [data, ...prev])
            await subscripe()
        } catch(e) {
            setTimeout(() => {
                subscripe()
            }, 500);
            console.log(e);
        }
    }
    const sendMessage = async () => {
        await axios.post('http://localhost:5000/new-messages', {
            message: value,
            id: Date.now()
        })
    }
    return (
        <div>
            <div className="from">
                <input value={value} onChange={e => setValue(e.target.value)} type="text" />
                <button onClick={sendMessage}>Отправить</button>
            </div>
            <div className="messages">
                {messages.map(mess => 
                <div style={{ background: 'grey', padding: '10px'}} key={mess.id}>{mess.message}</div>
                )}
            </div>
        </div>
    )
}

export default LongPullining
