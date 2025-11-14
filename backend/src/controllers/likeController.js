import * as likeService from '../services/likeService.js';

export const likeListing = async (req, res, next) => {
  try {
    const { listingId } = req.body;

    if (!listingId) {
      return res.status(400).json({ error: 'listingId is required' });
    }

    await likeService.likeListingService(listingId, req.user.id);
    res.status(201).json({ message: 'Listing liked successfully' });
  } catch (error) {
    next(error);
  }
};

export const unlikeListing = async (req, res, next) => {
  try {
    const { listingId } = req.body;

    if (!listingId) {
      return res.status(400).json({ error: 'listingId is required' });
    }

    await likeService.unlikeListingService(listingId, req.user.id);
    res.json({ message: 'Listing unliked successfully' });
  } catch (error) {
    next(error);
  }
};

export const getListingLikesCount = async (req, res, next) => {
  try {
    const { listingId } = req.params;
    const count = await likeService.getListingLikesCount(listingId);
    res.json({ count });
  } catch (error) {
    next(error);
  }
};

export const checkIfLiked = async (req, res, next) => {
  try {
    const { listingId } = req.params;
    const liked = await likeService.checkIfUserLiked(listingId, req.user.id);
    res.json({ liked });
  } catch (error) {
    next(error);
  }
};

export const getUserLikedListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const listings = await likeService.getUserLikedListings(req.user.id, limit, offset);
    res.json(listings);
  } catch (error) {
    next(error);
  }
};
