module.exports = (req, res, next) => {
    try {
        if (!req.user || !req.user.isAdmin) {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ message: 'Forbidden' });
    }
}