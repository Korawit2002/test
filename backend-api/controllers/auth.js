const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UserOfficer = require('../models/user_officer');

exports.login_officer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserOfficer.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    if (user.status_user !== 'Active') {
      return res.status(403).json({ message: 'Account is not active' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const payload = {
      user: {
        id: user._id,
        email: user.e_mail,
        type_id: user.type_id
        
      }
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '59m' });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    res.json({ 
        token, 
        refreshToken, 
        user: {
          id: user._id,
          email: user.e_mail,
          type_id: user.type_id,
          username: user.username,
          name: user.name

        }
      });
      console.log(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    if (user.status_user !== 'Active') {
      return res.status(403).json({ message: 'Account is not active' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const payload = {
      user: {
        id: user._id,
        username: user.username,
        type_id: user.type_id
      }
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '59m' });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    res.json({ 
        token, 
        refreshToken, 
        user: {
          id: user._id,
          username: user.username,
          type_id: user.type_id
        }
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh Token is required' });
    }
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const token = jwt.sign({ user: decoded.user }, process.env.JWT_SECRET, { expiresIn: '1m' });
      res.json({ token });
    } catch (err) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }
  };

  exports.verifyToken = (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided', isValid: false });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const currentTime = Math.floor(Date.now() / 1000);
      const timeUntilExpiration = decoded.exp - currentTime;
  
      if (timeUntilExpiration <= 0) {
        return res.status(401).json({ 
          message: 'Token has expired', 
          isValid: false, 
          expired: true 
        });
      }
  
      res.json({
        message: 'Token is valid',
        isValid: true,
        expired: false,
        expiresIn: timeUntilExpiration,
        user: {
          id: decoded.user.id,
          username: decoded.user.username,
          type_id: decoded.user.type_id
        }
      });
  
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          message: 'Token has expired', 
          isValid: false, 
          expired: true 
        });
      }
      return res.status(403).json({ 
        message: 'Invalid token', 
        isValid: false 
      });
    }
  };

