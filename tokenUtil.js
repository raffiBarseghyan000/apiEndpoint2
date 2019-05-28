const jwt = require('jsonwebtoken')
const path = process.cwd()
const userSchema = require(`${path}/schemas/userSchema`)
const tokenSchema = require(`${path}/schemas/expiedTokenSchema`)

let getUsernameFromToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'] // Express headers are auto converted to lowercase
    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length)
    }

    if (token) {
        jwt.verify(token, process.env.secret, (err, decoded) => {
            if (err) {
                return res.status(400).send({
                    success: false,
                    message: 'Token is not valid'
                })
            } else {
                req.username = decoded.username
                next()
            }
        })
    } else {
        return res.status(400).send({
            success: false,
            message: 'Auth token is not supplied'
        })
    }
}

const getUserByUsername = (req, res, next) => {
    userSchema.find({username: req.username}, {_id: false, __v: false}).then((user) => {
        req.user = user
        if (req.user.length !== 0) {
            next()
        } else {
            return res.status(400).send({
                success: false,
                message: 'Auth token is not valid'
            })
        }
    })
}

const checkTokenLoggedOut = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'] // Express headers are auto converted to lowercase
    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length)
    }
    tokenSchema.find({token: token}, {_id: false}).then((result) => {
        if (result.lengh) {
            return res.status(400).send({
                success: false,
                message: 'Auth token is expired'
            })
        } else {
            next()
        }
    }).catch((err) => {
        next(err)
    })
}

module.exports = {
    getUsernameFromToken,
    getUserByUsername,
    checkTokenLoggedOut
}