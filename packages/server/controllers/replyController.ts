import type { Request, Response } from "express";

import Reply from "../models/Reply";

export const createReply = async (request: Request, response: Response) => {
    const { content, postId, commentId } = request.body;
    const { user } = response.locals;

    try {
        const reply = await Reply.create({ commentId, content, postId, userId: user.id });

        response.status(201).json({ reply });
    } catch (error) {
        response.status(500).json({ error: "Failed to create reply" });
    }
};
export const editReply = async (request: Request, response: Response) => {
    const replyId = request.params["id"];
    const { content, postId, commentId } = request.body;
    const { user } = response.locals;

    try {
        const [count, comments] = await Reply.update(
            { content },
            { returning: true, where: { commentId, id: replyId, postId, userId: user.id } }
        );

        response.status(201).json({ comments, count });
    } catch (error) {
        response.status(500).json({ error: "Failed to update reply" });
    }
};
export const deleteReply = async (request: Request, response: Response) => {
    const replyId = request.params["id"];
    const { user } = response.locals;

    try {
        await Reply.destroy({ where: { id: replyId, userId: user.id } });

        response.status(201).json({ success: true });
    } catch (error) {
        response.status(500).json({ error: "Failed to delete reply" });
    }
};
