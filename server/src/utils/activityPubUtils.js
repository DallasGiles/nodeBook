const crypto = require('crypto');

const validateSignature = (headers, publicKey) => {
    
    //retrieves the signature header from the incoming request.
    //with no header gets rejected instantly.
    const signature = headers['signature'];
    if (!signature) return false;

    const verifier = crypto.createVerify('RSA-SHA256'); //'RSA-SHA256' is a widely used algo for digital signatures.
    verifier.update(headers['date']);
    //checks the public key signature and encoding
    return verifier.verify(publicKey, signature, 'base64');
};

const generateActivityPubResponse = (type, object) => {
    return {
        '@context': 'https://www.w3.org/ns/activitystreams', //defines vocab
        type, //type of activity like, create, follow
        object, //bookmark comment post
    };
};

module.exports = { validateSignature, generateActivityPubResponse };