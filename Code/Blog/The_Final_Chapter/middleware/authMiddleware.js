const User = require("../models/User");

module.exports = async (req, res, next) => {
    try {
        if (!req.session || !req.session.userId) {
            console.log('No session or userId found');
            return res.redirect('/users/login');
        }

        const user = await User.findById(req.session.userId);
        if (!user) {
            console.log('No user found with id:', req.session.userId);
            req.session.userId = null;
            return res.redirect('/users/login');
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.redirect('/users/login');
    }
}