const jwt = require('jsonwebtoken')

  const authorization = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(403).send({ error: 'Token not found.' })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id
        req.userEmail = decoded.email
        next()
    } catch (e) {
      next(e)
    }
}


module.exports ={ authorization}