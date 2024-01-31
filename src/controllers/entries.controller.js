const { pool } = require('../db.js');

const getEntries = async (req, res) => {
    try {

        const [entries] = await pool.query("SELECT * FROM entries");
        res.status(200).json({ status: "success", data: entries, });

    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({ status: 'error', message: 'Something goes wrong' });
    }
};

const getEntry = (req, res) => {
    res.json('Getting a entry by ID');
};

const createEntry = async (req, res) => {
    try {

        const { title, author, content, publication_date } = req.body;
        const [newEntry] = await pool.query("INSERT INTO entries (title, author, content, publication_date) VALUES (?,?,?,?)", [title, author, content, publication_date]);

        res.status(201).json({ status: 'success', data: { id: newEntry.insertId, ...req.body } });

    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Something goes wrong' });
    }
};

module.exports = { getEntries, createEntry, getEntry };