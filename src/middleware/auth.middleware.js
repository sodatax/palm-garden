export const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "You must be logged in." });
    }
    return next();
};

export const requireAuth = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect("/login?errors=Login first to access protected pages");
    }
    return next();
}