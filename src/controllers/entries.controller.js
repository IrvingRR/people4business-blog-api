const { pool } = require('../db.js');

const getEntries = async (req, res) => {
    try {
        const { term, value } = req.query;

        if(term && value) {
            const [entries] = await pool.query(`SELECT * FROM entries WHERE ${term} LIKE "%${value}%"`);
            return res.status(200).json({ status: "success", data: entries, });
        }

        const [entries] = await pool.query(`SELECT * FROM entries`);
        res.status(200).json({ status: "success", data: entries, });

    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({ status: 'error', message: 'Something goes wrong' });
    }
};

const getEntry = async (req, res) => {
    
    try {
        const { id } = req.params;

        const [response] = await pool.query("SELECT * FROM entries WHERE id = ?", [id]);
        const entry = response[0];

        if(!entry) return res.status(404).json({ status: 'error', message: 'Entry not found' });

        res.status(200).json({ status: 'success', data: entry });

    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Something goes wrong' });
    }

};

const createEntry = async (req, res) => {
    try {

        const { title, author, content, publication_date } = req.body;
        const [newEntry] = await pool.query(
            "INSERT INTO entries (title, author, content, publication_date) VALUES (?,?,?,?)",
            [title, author, content, publication_date]
        );

        res.status(201).json({ status: 'success', data: { id: newEntry.insertId, ...req.body } });

    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Something goes wrong' });
    }
};

const editEntry = async (req, res) => {
    const { id } = req.params;
    const { title, author, content, publication_date } = req.body;

    const [entryFound] = await pool.query("SELECT * FROM entries WHERE id = ?", [id]);
    const entry = entryFound[0];

    if(!entry) return res.status(404).json({ status: 'error', message: 'Entry not found' });

    await pool.query(
        "UPDATE entries SET title = ?, author = ?, content = ?, publication_date = ? WHERE id = ?",
        [title, author, content, publication_date, id]
    );
        
    res.status(200).json({ status: 'success', data: { id, ...req.body } });
};

const deleteEntry = async (req, res) => {
    const { id } = req.params;

    const [entryFound] = await pool.query("SELECT * FROM entries WHERE id = ?", [id]);
    const entry = entryFound[0];

    if(!entry) return res.status(404).json({ status: 'error', message: 'Entry not found' });

    await pool.query("DELETE FROM entries WHERE id = ?", [id]);
        
    res.status(200).json({ status: 'success', message: 'Entry deleted' });
};

module.exports = { getEntries, getEntry, createEntry, editEntry, deleteEntry };