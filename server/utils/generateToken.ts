import jwt, { Secret } from 'jsonwebtoken'

var secret: Secret = process.env.JWT_SECRET as unknown as Secret

const generateToken = (id: string) => {
  return jwt.sign({ id }, secret, {
    expiresIn: "30d",
  });
};

export default generateToken;