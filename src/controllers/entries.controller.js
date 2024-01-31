const { pool } = require('../db.js');

const getEntries = async (req, res) => {
    try {

        const [entries] = await pool.query("SELECT * FROM entries");
        res.status(200).json({ data: entries });

    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({ message: "Something goes wrong" });
    }
};

module.exports = { getEntries };