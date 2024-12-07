const express = require('express');

const {
    createBookmark,
    getUserBookmarks,
    updateBookmark,
    deleteBookmark,
    repostBookmark,
} = require('../controllers/bookmarkController');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// creates new bookmark.
router.post('/', authMiddleware, createBookmark);

// gets all bookmarks for logged in user.
router.get('/', authMiddleware, getUserBookmarks);

//updates given bookmark by id
router.put('/:id', authMiddleware, updateBookmark);

//deletes bookmark by id
router.delete('/:id', authMiddleware, deleteBookmark);

//reposts a bookmark
router.post('/repost/:id', authMiddleware, repostBookmark);

module.exports = router;