export const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        if (req.accepts("html")) {
            return res.redirect("/login?errors=Please login to access protected pages");
        }
        return res.status(401).json({ message: "You must be logged in." });
    }
    next();
};
