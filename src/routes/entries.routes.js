const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields.js');
const { getEntries, createEntry, getEntry, editEntry, deleteEntry } = require('../controllers/entries.controller.js');

const router = Router();

router.get('/entries', getEntries);

router.get('/entries/:id', [
    check('id', 'ID is required').not().isEmpty(),
    check('id', 'Invalid ID').isNumeric(),
    validateFields
], getEntry);

router.post('/entries', [
    check('title', 'Title is required').not().isEmpty(),
    check('author', 'Author is required').not().isEmpty(),
    check('publication_date', 'Publication date is required').not().isEmpty(),
    check('content', 'Content is required').not().isEmpty(),
    validateFields
], createEntry);

router.put('/entries/:id', [
    check('id', 'ID is required').not().isEmpty(),
    check('id', 'Invalid ID').isNumeric(),
    check('title', 'Title is required').not().isEmpty(),
    check('author', 'Author is required').not().isEmpty(),
    check('publication_date', 'Publication date is required').not().isEmpty(),
    check('content', 'Content is required').not().isEmpty(),
    validateFields
], editEntry);

router.delete('/entries/:id', [
    check('id', 'ID is required').not().isEmpty(),
    check('id', 'Invalid ID').isNumeric(),
    validateFields
], deleteEntry);

module.exports = router;