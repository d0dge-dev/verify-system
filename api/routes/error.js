const express = require('express');
const router = express.Router();

const path = require("path");

router.get('/', (req, res) => {
    // redirect to error page
    res.sendFile(path.resolve('./api/public/error.html'));
});

module.exports = router;