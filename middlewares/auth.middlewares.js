import JWT from "jsonwebtoken"
import config from "../config/config"

const auth = (req, res, next) => {
    const {token} = req.cookies
    if (!token) {
        res.status(401).send('Not authorized to access this route')
    }

    try {
        const decode = JWT.verify(token, config.JWT_SECRET)
        req.user = decode
        return next()
    } catch (error) {
        res.status(401).send('Not authorized to access this route')
    }
}