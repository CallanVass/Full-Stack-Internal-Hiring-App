import jwt from 'jsonwebtoken'
import { UserModel } from './db.js'

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const user = await UserModel.findOne({ _id: decoded._id })

        if (!user) {
        throw new Error()
        }
        req.user = user
        next()
    } catch (error) {
        // Log the error
        console.log(error)
        res.status(401).send({ error: 'Please authenticate.' })
    }
  }

export default auth