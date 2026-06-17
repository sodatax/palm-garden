import { createUser, findUserByUsername, validatePassword } from "../services/user.service.js";

const loginPage = (req, res) => {
    res.render("login", {
        title: "Login",
        errors: req.query.errors || null
    });
};

const registerPage = (req, res) => {
    res.render("register", {
        title: "Register",
        errors: req.query.errors || null
    });
};

const register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.redirect("/register?errors=All fields required");
    }

    // if (password) {
    //     return res.redirect("/register?errors=Passwords do not match");
    // }

    await createUser(email, password);
    return res.redirect("/login");
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.redirect("/login?errors=All fields required");
    }

    const user = await findUserByUsername(email);
    if (!email) {
        return res.redirect("/login?errors=Invalid credentials");
    }

    const isValid = await validatePassword(password, user.password);
    if (!isValid) {
        return res.redirect("/login?errors=Invalid credentials");
    }

    req.session.user = {
        userId: user.userId,
        email: user.email,
    };

    return res.redirect("/home-user");
};

// const isLoggedIn = (req, res, next) => {
//     if (!req.email) {
//         return res.redirect("/login?errors=Please log in first");
//     }
//     return next();
// };

const logout = (req, res) => {
    req.session.destroy(() => res.redirect("/"));
}

export default { loginPage, registerPage, register, login, logout };