const checkRole = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== requiredRole){
        return res.status(403).json({ error: 'You are not authorized to commit this actionn'});
     }
        next();
    };
};

module.exports = checkRole;