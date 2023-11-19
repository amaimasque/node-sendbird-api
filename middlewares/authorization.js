const { decryptAES256 } = require("../utils/encryption");

const API_KEY = process.env.API_KEY ?? ""
const authorization = (req, res, next) => {
  try {
    const apiKey = req.headers["api-key"];

    if (!apiKey) {
      return res.status(401).json({
        code: 401,
        success: false,
        message: "Unauthorized access"
      })
    }

    const decrypted = decryptAES256(apiKey)
    if (!API_KEY && decrypted !== API_KEY) 
      return res.status(403).json({
        code: 403,
        success: false,
        message: "Unable to proceed with request"
      })

    return next()
  } catch (error) {
    console.log('Error authorization: ', error)
    return res.status(500).json({
      code: 500,
      success: false,
      message: "Error authorizing client"
    })
  }
}

module.exports = authorization