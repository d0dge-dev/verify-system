const express = require('express');
const router = express.Router();

const path = require("path");

router.get('/', (req, res) => {
    // redirect to success page
    res.sendFile(path.resolve('./api/public/success.html'));
});

module.exports = router;