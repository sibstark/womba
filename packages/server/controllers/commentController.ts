import type { Request, Response } from "express";

import Comment from "../models/Comment";

export const createComment = async (request: Request, response: Response) => {
    const { content, postId } = request.body;
    const { user } = response.locals;

    try {
        const comment = await Comment.create({ content, postId, userId: user.id });

        response.status(201).json({ comment });
    } catch (error) {
        response.status(500).json({ error: "Failed to create comment" });
    }
};
export const editComment = async (request: Request, response: Response) => {
    const commentId = request.params["id"];
    const { content, postId } = request.body;
    const { user } = response.locals;

    try {
        const [count, comments] = await Comment.update(
            { content },
            { returning: true, where: { id: commentId, postId, userId: user.id } }
        );

        response.status(201).json({ comments, count });
    } catch (error) {
        response.status(500).json({ error: "Failed to update comment" });
    }
};
export const deleteComment = async (request: Request, response: Response) => {
    const commentId = request.params["id"];
    const { user } = response.locals;

    try {
        await Comment.destroy({ where: { id: commentId, userId: user.id } });

        response.status(201).json({ success: true });
    } catch (error) {
        response.status(500).json({ error: "Failed to delete post" });
    }
};
