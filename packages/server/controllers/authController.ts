import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

import User from "../models/User";

const JWT_MAX_AGE = 24 * 60 * 60;

const createToken = (userId: number) => {
    return jwt.sign({ id: userId }, `${process.env.JWT_SECRET}`, { expiresIn: JWT_MAX_AGE });
};

export const signupController = async (request: Request, response: Response) => {
    const { email, password } = request.body;

    try {
        const user = await User.create({
            email,
            password
        });

        const token = createToken(user.id);

        response.cookie(`${process.env.JWT_COOKIE_NAME}`, token, {
            httpOnly: true,
            maxAge: JWT_MAX_AGE * 1000
        });

        response.status(201).json({ email: user.email, id: user.id });
    } catch (error) {
        response.status(403);
    }
};
export const loginController = async (request: Request, response: Response) => {
    const { email, password } = request.body;

    try {
        const user = await User.login({ email, password });

        const token = createToken(user.id);

        response.cookie(`${process.env.JWT_COOKIE_NAME}`, token, {
            httpOnly: true,
            maxAge: JWT_MAX_AGE * 1000
        });

        response.status(201).json({ email: user.email, id: user.id });
    } catch (error) {
        if (error instanceof Error) {
            const { message } = error;

            response.status(403).json({ error: { message } });
        }

        response.status(403).json({ error: { message: "Unknown error" } });
    }
};

export const logoutController = async (_request: Request, response: Response) => {
    response.cookie(`${process.env.JWT_COOKIE_NAME}`, "", { maxAge: 1 }).status(201);
};
