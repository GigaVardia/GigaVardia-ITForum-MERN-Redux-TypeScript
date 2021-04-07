const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]// "Bearer TOKEN"
        if (!token) {
            console.log("Here")
            res.status(401).json({msg: "Auth error"})
        }

        const decodedToken = jwt.verify(token, process.env.jwt)
        req.user = decodedToken
        next()
    } catch (e) {
        res.status(401).json({msg: "Auth error"})
    }
}