module.exports = async (req, res) => {
	if (req.session && req.session.userInfo) {
		var id = req.session.userInfo._id
		res.send('var isLogin = true')
	}else {
		res.send('var isLogin = false')
	}
};
