const jwt = require('jsonwebtoken')

const CONSTANTS = require('../../constants')

const isAuth = (req, res, next) => {
	const authorization = req.headers.authorization
	const token = authorization && authorization.split(" ")[1]

	if (token){
		try{
			decoded = jwt.verify(token, CONSTANTS.JWT.SECRET)

			var newToken = jwt.sign({
				iat: Math.floor(Date.now() / 1000),
				exp: Math.floor(Date.now() / 1000) + (CONSTANTS.JWT.TIME),
				user_id: decoded.user_id,
				full_name: decoded.full_name,
				usunom: decoded.usunom,
				imbcod: decoded.imbcod,
			}, CONSTANTS.JWT.SECRET, {algorithm: 'HS256'})

			req.newToken = `Bearer: ${newToken}`
			req.user_id = decoded.user_id
			req.full_name = decoded.full_name

			next()
		}catch(e){
			error = {type: 'TOKENVERIFY', message: e.message}

			return res.status(401).json(error)
		}
	}else{
		error = {type: 'NOTOKEN', message: 'Access denied'}

		return res.status(401).json(error)
	}
}

module.exports = isAuth