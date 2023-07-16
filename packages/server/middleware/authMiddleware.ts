import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import User from "../models/User";

const authMiddleware = (request: Request, response: Response, next: NextFunction) => {
    const token = request.cookies[`${process.env.JWT_COOKIE_NAME}`];

    if (token) {
        jwt.verify(token, `${process.env.JWT_SECRET}`, async (error: any, decodedToken: any) => {
            if (error) {
                response.locals.user = null;

                response.status(403);
            } else {
                console.log("decodedToken", decodedToken);

                try {
                    const user = await User.findOne({ where: { id: decodedToken.id } });

                    if (user) {
                        response.locals.user = user;

                        next();
                    } else {
                        response.status(403).json({ error: "User not found" });
                    }
                } catch (error) {
                    response.locals.user = null;

                    response.status(500).json({ error: "Unexpected server error" });
                }
            }
        });
    } else {
        response.status(403).json({ error: "User is not authorized" });
    }
};

export default authMiddleware;
