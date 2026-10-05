import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // Set JWT as HTTP-Only cookie (optional depending on frontend strategy, but let's do both or just return it for local storage simplicity)
  // For full stack React + Node, sending token in response body is common, but HttpOnly cookie is more secure. Let's send in body for ease of integration for this demo, or use standard Authorization header.
  
  return token;
};

export default generateToken;
