const jwt = require('jsonwebtoken')

const CONSTANTS = require('../../constants')

const isAdmin = (req, res, next) => {
	const authorization = req.headers.authorization
	const token = authorization && authorization.split(" ")[1]

	try{
		decoded = jwt.verify(token, CONSTANTS.JWT.SECRET)

		if (decoded.admin){
			next()
		} else {
			error = {type: 'NOTANADMIN', message: 'Access forbidden'}

			return res.status(403).json(error)
		}
	}catch(e){
		error = {type: 'TOKENVERIFY', message: e.message}

		return res.status(401).json(error)
	}
}

module.exports = isAdmin