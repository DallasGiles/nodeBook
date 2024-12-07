const Bookmark = require('../models/Bookmark');

//Should create a new bookmark
// POST via /api/bookmarks

const createBookmark = async (req, res) => {
    //defines the bookmark.
    const { url, title, description, tags, privacy } = req.body;

    try {

        //creates the bookmark.
        const bookmark = new Bookmark({
            url,
            title,
            description,
            tags,
            privacy,
            userId: req.user.id, // this gets retrieved from the auth middleware
        });

        await bookmark.save();
        res.status(201).json({ message: 'Bookmark Success', bookmark });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'failed to create bookmark' });
    }
};

// Retrieve all bookmarks for logged in users.
// GET via /api/bookmarks  (maybe private?)

const getUserBookmarks = async (req, res) => {

    try{
        const bookmarks = await Bookmark.find({ userId: req.user.id });
        res.status(200).json({ bookmarks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'failed to fetch user bookmarks' });
    }
};

// Updates a bookmark
// PUT via /api/bookmarks/:id

const updateBookmark = async (req, res) => {

    const { id } = req.params;
    const { title, description, tags, privacy } = req.body;

    try {
        const bookmark = await Bookmark.findOneAndUpdate(
            { _id: id, userId: req.user.id }, //this makes sure that the owner actually owns the bookmark.
            { title, description, tags, privacy },
            { new: true } // this will return the updated doc
        );

        if (!bookmark){
            return res.status(404).json({ error: 'Bookmark missing or unauthorized'});
        }

        res.status(200).json({ message: 'Bookmark updated'});
    } catch (error){
        console.error(error);
        res.status(500).json({ error: "Failed to update bookmark"});
    };
};

//This will delete a bookmark
// DELETE via /api/bookmarks/:id

const deleteBookmark = async (req, res) => {
    const { id } = req.params;

    try{
        const bookmark = await Bookmark.findOneAndDelete({ _id: id, userId: req.user.id });

        if (!bookmark) {
            return res.status(404).json({ error: 'Bookmark not found or not authorized'});
        }

        res.status(200).json({ message: 'Bookmark deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete bookmark' });
    }
};

//This will repost a bookmark
// POST via api/bookmarks/repost/:id

const repostBookmark = async (req, res) => {
    const { id } = req.params;

    try {
        //find original bookmark
        const originalBookmark = await Bookmark.findById(id);

        if (!originalBookmark || originalBookmark.privacy === 'Private') {
            return res.status(404).json({ error: 'Bookmark not found or not allowed to repost' });
        }

        //creates a reposted bookmark
        const repostedBook = new Bookmark({
            url: originalBookmark.url,
            title: originalBookmark.title,
            description: originalBookmark.description,
            tags: originalBookmark.tags,
            privacy: originalBookmark.privacy, //keeps privacy the same might need to alter so only public posts can be reposted.
            userId: req.user.id,
            repostedFrom: originalBookmark._id,
            isRepost: true,
        });

        await repostedBook.save();
        res.status(201).json({ message: 'Bookmark resposted successfully', repostBookmark });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to repost bookmark' });
    }
};

module.exports = {
    createBookmark,
    getUserBookmarks,
    updateBookmark,
    deleteBookmark,
    repostBookmark,
};