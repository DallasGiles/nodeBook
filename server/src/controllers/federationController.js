const Federation = require('../models/Instance');
const { validateSignature, generateActivityPubResponse } = require('../utils/activityPubUtils');

//Handle incoming ActivityPub messages
// POST via /api/federation/inbox
const handleInbox = async (req, res) => {

    try {

        const { headers, body } = req;
        //validate signature
        const instance = await Federation.findOne({ instanceUrl: req.body.actor });
        if (!instance || !validateSignature(headers, instance.publicKey)) {
            return res.status(400).json({ error: 'Invalid signature or unknown actor' });
        }

        console.log('received activity:', body );

        res.status(200).json({ message: 'Activity recieved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    };
};

//Send a message
//POST via /api/federation/outbox
const handleOutbox = async (req, res) => {
    
    try{

        const { type, object, targetInstance } = req.body;

        //retrieve target instance details.
        const instance = await Federation.findOne({ instanceUrl: targetInstance });
        if (!instance){
            return res.status(404).json({ error: 'Target instance is not found'});
        }

        //create rule compliant message.
        const activity = generateActivityPubResponse(type, object);

        //Sends activity to target instance
        // (replace with actual HTTP req).
        console.log(`sending activity to ${instance.instanceUrl}:`, activity);

        res.status(200).json({ message: 'Activity sent successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send activity' });
    }
};

module.exports = { handleInbox, handleOutbox };
