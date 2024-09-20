const errorHandler = require("../middlewares/ErrorHandler")


const health = async (req, res) => {
    return res.json({ 'status': 'ok' })
}


module.exports = {
    health

}