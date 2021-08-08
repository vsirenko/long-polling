const express = require('express')
const cors = require('cors')
const events = require('events');

const emmiter = new events.EventEmitter()

const PORT = 5050;

const app = express()

app.use(cors())

app.get('/get-message', (req, res) => {
    emmiter.omce('newMessage', (message) => {
        res.json(message)
    })
})

app.post('/new_message', ((req, res)=> {
    const message = req.body
    emitter.emit('newMessage', message)
    res.status(200)
}))

app.listen(PORT, () => console.log(`server strted on ${PORT}`))