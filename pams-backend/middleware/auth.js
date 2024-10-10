const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {

  // console.log(req.cookies);
  const { token } = req.cookies

  //if no token
  try {
    if (!token) {
      // return res.render('/')
      return res.status(400).json({ success: false, Message: 'opps pls login first' })
    }
    const decode = jwt.verify(token, 'shhhhh')
    req.checkUser = decode
    
    RemoveCookie("user")
    SetCookie('user', JSON.stringify(res.data))
    localStorage.setItem("auth", true)
  } catch (err) {
    return res.status(400).json({ Success: false, Message: "jwt expired please login again" })
    //should render to login page
  }
  return next()
}
module.exports = auth
