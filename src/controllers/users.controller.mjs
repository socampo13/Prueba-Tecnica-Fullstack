import User from "../models/User.mjs";
import passport from "passport";

export const renderSignUpForm = (req, res) => res.render("users/signup");

export const signup = async (req, res) => {
    let errors = [];
    const { name, email, password, confirm_password } = req.body;
    if(password != confirm_password){
        errors.push({ text: "Passwords not matching "});
    }
    if(password.length < 4){
        errors.push({ text: "Password must be bigger than 4 characters" });
    }
    if(errors.length > 0){
        res.render("users/signup", {
            errors,
            name, 
            email, 
            password,
            confirm_password,
        });
    }else{
        const emailUser = await User.findOne({ email: email });
        if(emailUser){
            req.flash("error_msg", "Email already in use");
            res.redirect("/users/signup");
        } else{
            const newUser = new User({ name, email, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash("success_msg", "User registered");
            res.redirect("/users/signin");
        }
    }
};

export const renderSigninForm = (req, res) => res.render("users/signin");

export const signin = passport.authenticate("local", {
    successRedirect: "/notes",
    failureRedirect: "/users/signin",
    failureFlash: true,
});

export const logout = (req, res) => {
    req.logout();
    req.flash("success_msg", "Logged out");
    res.redirect("/users/signin");
};