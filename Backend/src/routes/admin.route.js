const express = require('express');
const router = express.Router();
const baseResponse = require('../utils/baseResponse.util');

router.get('/', (req, res) => {
    baseResponse(res, true, 200, 'Admin dashboard access granted', { user: req.user });
});

module.exports = router;