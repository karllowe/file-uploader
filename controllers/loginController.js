const passport = require("passport");

async function loginUser(req, res, next) {
    return passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    }) (req, res, next)
};

async function logoutUser(req, res, next) {
    req.logout((err) => {
        if (err) {
            return next(err)
        } 
        res.redirect("/")
    })
}

module.exports = {
    loginUser,
    logoutUser
}