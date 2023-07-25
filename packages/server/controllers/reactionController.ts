import type { Request, Response } from "express";

import Reaction from "../models/Reaction";

export const createReaction = async (request: Request, response: Response) => {
    const { reaction, replyId, commentId, postId } = request.body;

    const belongingError = "Reaction can only belong to one entity";

    if (replyId && (commentId || postId)) {
        response.status(500).json({ error: belongingError });
    }
    if (commentId && (replyId || postId)) {
        response.status(500).json({ error: belongingError });
    }

    if (postId && (replyId || commentId)) {
        response.status(500).json({ error: belongingError });
    }
    const { user } = response.locals;

    try {
        const createdReaction = await Reaction.create({
            commentId,
            postId,
            reaction,
            replyId,
            userId: user.id
        });

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

export const getReactions = async (request: Request, response: Response) => {
    const replyId = request.query["replyId"];
    const commentId = request.query["commentId"];
    const postId = request.query["postId"];
    const { user } = response.locals;

    try {
        const reactions = await Reaction.findAll({
            where: { commentId, postId, replyId, userId: user.id }
        });

        response.status(201).json({ reactions });
    } catch (error) {
        response.status(500).json({ error: "Failed to delete reaction" });
    }
};
