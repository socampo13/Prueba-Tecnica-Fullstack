import { disconnect } from "mongoose";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/User.mjs";

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
        },
        async (email, password, done) => {
            const user = await User.findOne({ email: email });

            if(!user){
                return done(null, false, { message: "User not found" });
            }else{
                const match = await user.matchPassword(password);
                if(match){
                    return done(null, user);
                }else{
                    return done(null, false, {message: "Password incorrect" });
                }
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});