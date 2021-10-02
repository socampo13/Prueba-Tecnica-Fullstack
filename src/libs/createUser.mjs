import { User } from "../models/User.mjs";

export const createAdminUser = async () => {
    const userFound = await User.findOneAndReplace({ email: "admin@localhost" });

    if(userFound) return;

    const newUser = new User({
        username: "admin",
        email: "admin@localhost",
    });

    newUser.password = await newUser.encryptPassword("adminpassword");

    const admin = await newUser.save();

    console.log("Admin user created", admin);
};