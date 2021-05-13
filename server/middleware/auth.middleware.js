const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]// "Bearer TOKEN"
        if (!token) {
            res.status(401).json({msg: "Auth error"})
        }

        jwt.verify(token, process.env.jwt, (err, decoded) => {
            if (err) {
                return res.status(401).json({msg: "Auth error, token expired"})
            }
            req.user = decoded
        })

        next()
    } catch (e) {
        res.status(401).json({msg: "Auth error"})
    }
}