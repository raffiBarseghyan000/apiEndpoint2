const express = require('express');
let jwt = require('jsonwebtoken');

const router = express.Router();

const path = process.cwd()
const tokenSchema = require(`${path}/schemas/expiedTokenSchema`)

router.post('/', async (req, res, next)=> {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }
    await new tokenSchema(token).save()
})

module.exports = router