import jwt from 'jsonwebtoken';

  const authorization = async (req, res, next) => {
    try {
        let token = req.header('Authorization')
        if (!token) {
            return res.status(403).send({ error: 'Token not found.' })
        }
        token = token.replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.id
        req.userEmail = decoded.email
        next()
    } catch (e) {
      next(e)
    }
}


export default authorization;