const { Router } = require('express');
const { getEntries } = require('../controllers/entries.controller.js');

const router = Router();

router.get('/entries', getEntries);

module.exports = router;