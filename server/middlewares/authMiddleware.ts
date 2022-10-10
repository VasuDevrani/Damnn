import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import User from "../models/UserModel";
import { Request, Response, NextFunction } from "express";
import { UserI } from "../interfaces/interface";

var secret: Secret = process.env.JWT_SECRET as unknown as Secret

export interface CustomRequest extends Request {
  user: UserI
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  if (
    req.headers.authorization && 
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes user id from token
      var decoded = jwt.verify(token, secret) as JwtPayload;
      (req as CustomRequest).user = await User.findById(decoded.id).select("-password") as unknown as UserI;
      
      return next()
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};