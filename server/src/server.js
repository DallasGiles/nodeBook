const app = require('./app');

require('dotenv').config();

//grab port from dotenv if not found default to 8009
const PORT = process.env.PORT || 8009;

app.listen(PORT, () => {
    console.log(`server is live on port ${PORT}`)
});