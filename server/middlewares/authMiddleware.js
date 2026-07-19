const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. Please login."
            });
        }

        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Store user info in request
        req.user = decoded;

        next();

    } catch (error) {

        // Token expired
        if (error.name === "TokenExpiredError") {
            res.clearCookie("token");

            return res.status(401).json({
                success: false,
                message: "Session expired. Please login again."
            });
        }

        // Invalid token
        res.clearCookie("token");

        return res.status(401).json({
            success: false,
            message: "Invalid token."
        });
    }
};

module.exports = authMiddleware;