const express = require('express')
let jwt = require('jsonwebtoken')

const router = express.Router()

const path = process.cwd()
const userSchema = require(`${path}/schemas/userSchema`)

router.post('/', async (req, res)=> {
    let username = req.body.username
    let password = req.body.password
    // For the given username fetch user from DB
    let realUser = await userSchema.findOne({username: username})
    if (username && password) {
        if (realUser && realUser.comparePassword(password)) {
            let token = jwt.sign({username: username},
                process.env.secret,
                {
                    expiresIn: '24h' // expires in 24 hours
                }
            )
            // return the JWT token for the future API calls
            res.status(200).send({
                success: true,
                message: 'Authentication successful!',
                token: token
            })
        } else {
            res.status(403).send({
                success: false,
                message: 'Incorrect username or password'
            })
        }
    } else {
        res.status(400).send({
            success: false,
            message: 'Username and/or password not supplied'
        })
    }
})

module.exports = router