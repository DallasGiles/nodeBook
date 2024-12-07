const mongoose = require('mongoose');

const federationSchema = new mongoose.Schema(
    {
        instanceUrl: {
            type: String,
            required: [true, 'instance url is required'], //make sure that there is an instance url.
            unique: true,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
        publicKey: {
            type: String,
            required: true,
        },
        lastContact: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    },
);

const Federation = mongoose.model('Federation', federationSchema);

module.exports = Federation;