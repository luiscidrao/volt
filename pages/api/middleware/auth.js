import jwt from 'jsonwebtoken';
import User from '../models/User';
import dbConnect from '../database';
import getJwtSecret from '../utils/getJwtSecret';

/**
 * Middleware to protect routes that require authentication
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 * @returns {Promise<void>}
 */
export const protect = async (req, res, next) => {
  let token;

  // Check if token exists in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Extract token from Bearer token
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    // Or check if token exists in cookies
    token = req.cookies.token;
  }

  // If no token found, return unauthorized
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }

  try {
    // Get JWT secret from database or environment variables
    const jwtSecret = await getJwtSecret();

    // Verify token
    const decoded = jwt.verify(token, jwtSecret);

    // Connect to database
    await dbConnect();

    // Find user by ID
    const user = await User.findById(decoded.id);

    // If user not found, return unauthorized
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'User account is inactive'
      });
    }

    // Add user to request object
    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    // Continue to the next middleware or route handler
    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};

/**
 * Middleware to restrict access to specific roles
 * @param {...String} roles - Roles allowed to access the route
 * @returns {Function} - Express middleware function
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    // Check if user exists and has a role
    if (!req.user || !req.user.role) {
      return res.status(403).json({
        success: false,
        message: 'User has no role assigned'
      });
    }

    // Check if user's role is in the allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }

    // User is authorized, continue
    return next();
  };
};

/**
 * Higher-order function to wrap API handlers with authentication middleware
 * @param {Function} handler - API route handler
 * @param {Object} options - Options object
 * @param {Boolean} options.protected - Whether the route requires authentication
 * @param {Array<String>} options.roles - Roles allowed to access the route
 * @returns {Function} - Express middleware function
 */
export const withAuth = (handler, options = { protected: true, roles: [] }) => {
  return async (req, res) => {
    // If route is not protected, just call the handler
    if (!options.protected) {
      return handler(req, res);
    }

    // Create a next function for middleware
    const next = () => {
      // If roles are specified, check authorization
      if (options.roles && options.roles.length > 0) {
        return authorize(...options.roles)(req, res, () => handler(req, res));
      }

      // Otherwise, just call the handler
      return handler(req, res);
    };

    // Apply protection middleware
    return protect(req, res, next);
  };
};

export default { protect, authorize, withAuth };
