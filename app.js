const express = require('express')
const app = express()
const http = require('http').Server(app)
const socketio = require('socket.io')(http)
const tokenUtil = require('./tokenUtil')
const cors = require("cors")
app.set('socketio', socketio)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const port = process.env.app_port || 9999

app.use('/login', require('./routes/login.js'))

app.use('/logout', require('./routes/logout.js'))

app.use(tokenUtil.checkTokenLoggedOut, tokenUtil.getUsernameFromToken, tokenUtil.getUserByUsername, (req, res, next)=> {
    //get username from jwt
    //get user form db based on username
    //assign user object to req.user
    next()
})

app.use('/entries', require('./routes/entries.js'))

app.use('/users', require('./routes/users.js'))

app.use((req, res) => {
    res.status(404).send({
        success: false,
        message: 'Page not found'
    })
})

app.use((err, req, res, next) => {
    if(err) {
        res.status(500).send({
            success: false,
            message: err.message
        })
    }
})

http.listen(port, () => {
    console.log('Server is running...')
})