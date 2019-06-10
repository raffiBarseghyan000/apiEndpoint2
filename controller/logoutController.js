const path = process.cwd()
const tokenSchema = require(`${path}/schemas/expiedTokenSchema`)

class Logout {

    static async logout(req, res, next) {
        let token = req.headers['x-access-token'] || req.headers['authorization'] // Express headers are auto converted to lowercase
        if (token && token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length)
        }
        try {
            await new tokenSchema({token: token}).save()
            res.status(200).send({
                success: true,
                message: "User logged out"
            })
        } catch (err) {
            if (err.message.indexOf("E11000 duplicate key error") > -1) {
                res.status(200).send({
                    success: true,
                    message: "User logged out"
                })
            } else {
                next()
            }
        }
    }
}

module.exports = Logout