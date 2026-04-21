import jwt from 'jsonwebtoken';

export const authenticationMiddleware = (req, res, next) => {
  const tokenHeader = req.headers['authorization'];
  if (!tokenHeader) {
    return next();
  }
  if (!tokenHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid token format' });
  } else {
    const token = tokenHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
};

export const ensureAuthenticated = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};
