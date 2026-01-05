import jwt from 'jsonwebtoken';

// Middleware to check if user is authenticated
export const isAuthenticated = (req, res, next) => {
  try {
    // Check for token in cookies or authorization header (Bearer token)
    let token = req.cookies['chattu-token'];
    if (!token) {
      token = req.headers.authorization?.split(' ')[1]; // Extract token from Bearer header
    }
    if (!token) {
      return res.status(401).json({ message: 'Authentication token is required', success: false });
    }
    console.log('token:', token);
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.id || decoded._id; // Set user ID from token payload

    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    return res.status(401).json({ message: 'Invalid or expired token', success: false });
  }
};

export const adminOnly = (req, res, next) => {
  try {
    // Check for token in cookies or authorization header (Bearer token)
    let token = req.cookies['chattu-admin-token'];
    if (!token) {
      token = req.headers.authorization?.split(' ')[1]; // Extract token from Bearer header
    }
    if (!token) {
      return res.status(401).json({ message: 'Authentication token is required', success: false });
    }
    console.log('token:', token);
    // Verify the token
    const secretKey = jwt.verify(token, process.env.JWT_SECRET);

   const adminSecretKey = process.env.ADMIN_SECRET_KEY | "abhishek123";

    if (!adminSecretKey) {
      throw new Error('Admin secret key not configured');
    }

    if (secretKey !== adminSecretKey) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }
   console.log('token:', secretKey);

    req.user = decoded.id || decoded._id; // Set user ID from token payload

    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    return res.status(401).json({ message: 'Invalid or expired token', success: false });
  }
};
