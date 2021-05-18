function guest(req, res, next) {
    // //req.isAuthenticated() will return true if user is logged in
    if (!req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/')
}

module.exports=guest;