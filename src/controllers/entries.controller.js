const { pool } = require('../db.js');
const generateUniqueId = require('generate-unique-id');

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
        return res.status(500).json({ status: 'error', message: 'Something goes wrong getting entries' });
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
        console.log('Error:', error);
        res.status(500).json({ status: 'error', message: 'Something goes wrong getting entry' });
    }

};

const createEntry = async (req, res) => {
    try {

        const idGenerated = generateUniqueId();
        const { title, author, content } = req.body;
        const currentDate = new Date().toLocaleDateString();

        const [newEntry] = await pool.query(
            "INSERT INTO entries (id, title, author, content, publication_date) VALUES (?,?,?,?,?)",
            [idGenerated, title, author, content, currentDate]
        );

        res.status(201).json({ status: 'success', data: { id: newEntry.insertId, ...req.body, publication_date: currentDate } });

    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({ status: 'error', message: 'Something goes wrong creating the entry' });
    }
};

const editEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, content } = req.body;
    
        const [entryFound] = await pool.query("SELECT * FROM entries WHERE id = ?", [id]);
        const entry = entryFound[0];
    
        if(!entry) return res.status(404).json({ status: 'error', message: 'Entry not found' });
    
        await pool.query(
            "UPDATE entries SET title = ?, author = ?, content = ? WHERE id = ?",
            [title, author, content, id]
        );
        res.status(200).json({ status: 'success', data: { id: parseInt(id), publication_date: entry.publication_date, ...req.body } });
        
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({ status: 'error', message: 'Something goes wrong updating the entry' });
    }
};

const deleteEntry = async (req, res) => {
    try {
        const { id } = req.params;
    
        const [entryFound] = await pool.query("SELECT * FROM entries WHERE id = ?", [id]);
        const entry = entryFound[0];
    
        if(!entry) return res.status(404).json({ status: 'error', message: 'Entry not found' });
    
        await pool.query("DELETE FROM entries WHERE id = ?", [id]);
            
        res.status(200).json({ status: 'success', message: 'Entry deleted' });
        
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({ status: 'error', message: 'Something goes wrong deleting the entry' });
    }
};

module.exports = { getEntries, getEntry, createEntry, editEntry, deleteEntry };