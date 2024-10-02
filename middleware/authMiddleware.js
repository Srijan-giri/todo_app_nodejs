const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    console.log("user is not authorized")
    res.redirect('/');
}

module.exports = {isAuthenticated};