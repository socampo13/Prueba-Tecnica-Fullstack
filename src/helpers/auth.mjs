//Autenticaciones

export const isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error_mesg", "Not Authorized");
    res.redirect("/users/signin");
};