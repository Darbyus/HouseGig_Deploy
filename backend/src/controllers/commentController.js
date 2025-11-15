import * as commentService from '../services/commentService.js';

export const createComment = async (req, res, next) => {
  try {
    const { listingId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const comment = await commentService.createCommentService(listingId, req.user.id, content);
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

export const getListingComments = async (req, res, next) => {
  try {
    const { listingId } = req.params;
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const comments = await commentService.getListingCommentsService(listingId, limit, offset);
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    await commentService.deleteCommentService(commentId, req.user.id);
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const comment = await commentService.updateCommentService(commentId, req.user.id, content);
    res.json(comment);
  } catch (error) {
    next(error);
  }
};
