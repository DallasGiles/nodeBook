const mongoose = require('mongoose')

const bookmarkSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: [true, "URL is required"],
            match: [
                /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                'Please enter a valid URL',
            ],
        },
        title: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        tags: {
            type: [String],
            defualt: [],
        },
        privacy: {
            type: String,
            enum: ['Public', 'Private', 'Followers'],
            default: 'Followers', //decided to default to followers might be better to default to public.
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        repostedFrom: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bookmark', // this will refrence the original bookmark.
            default: null, //this will be null for original bookmarks, will update on not original.
        },
        isRepost: {
            type: Boolean,
            default: false, // will defaul to false because original post will not be a repost.
        },
        
    },
    {
        timestamps: true,
    }
);

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark