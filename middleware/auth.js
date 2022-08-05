const jwt = require('jsonwebtoken')

const authenticate = async function (req, res, next) {
    try {
        const token = req.headers['x-api-key']
        const secretKey = "celloip"

        if (!token) {
            return res.status(400).send({ status: false, message: "Please provide token..!!" })
        }

        const decodedToken = jwt.verify(token, secretKey)

        if (!decodedToken) {
            return res.status(401).send({ status: false, message: "authentication failed..!!" })
        }

        req.decodedToken = decodedToken
        next()

    } catch (err) {
        res.status(500).send({ error: err.message })
    }
}


module.exports = {authenticate};