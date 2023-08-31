const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Testing Response
    res.json({
        status: "OK",
        message: "Authorizing or something idk"
    })
});

module.exports = router;