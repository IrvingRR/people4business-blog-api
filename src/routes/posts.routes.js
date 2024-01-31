const { Router } = require('express');

const router = Router();

router.get('/posts', (req, res) => {
    res.send('Getting posts...');
});

module.exports = router;