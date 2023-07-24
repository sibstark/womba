import type { Request, Response } from "express";

import Reaction from "../models/Reaction";

export const createReaction = async (request: Request, response: Response) => {
    const { reaction, replyId } = request.body;
    const { user } = response.locals;

    try {
        const createdReaction = await Reaction.create({ reaction, replyId, userId: user.id });

        response.status(201).json({ reaction: createdReaction });
    } catch (error) {
        response.status(500).json({ error: "Failed to create reaction" });
    }
};
export const deleteReaction = async (request: Request, response: Response) => {
    const reactionId = request.params["id"];
    const { user } = response.locals;

    try {
        await Reaction.destroy({ where: { id: reactionId, userId: user.id } });

        response.status(201).json({ success: true });
    } catch (error) {
        response.status(500).json({ error: "Failed to delete reaction" });
    }
};
