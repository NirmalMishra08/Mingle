import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'User not authenticated', success: false });
        }

        // Verify the JWT token
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token', success: false });
        }

        // Attach the user ID to the request
        req.id = decoded.userId;
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        
    }
};

export default isAuthenticated;
