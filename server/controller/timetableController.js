import pool from "../db.js"

export async function getTimetable(req, res) {
    try{
        const result = await pool.query(`
                SELECT * FROM timetable WHERE user_id = $1
            `, [req.userId]);
        
        res.json(result.rows);

    } catch(err) {
        console.error(err);
        res.status(500).json({message: 'Server Error'})        
    }
}

// create timetable

export async function createEntry (req, res) {

    try{
        const {subject, day, start_time, end_time, room, professor} = req.body;

        const query = `INSERT INTO timetable (user_id, subjects, day, start_time, end_time, room, professor) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`

        const result = await pool.query(query,[req.userId, subject, day, start_time, end_time, room, professor]);

        res.status(201).json(result.rows[0]);

    } catch (err) {
        console.error(err);
        res.status(500).json({message:'Server Error'});        
    }
}

export async function deleteEntry (req, res) {
    const {id} = req.params;
    try {
        const query = `DELETE FROM timetable WHERE id = $1 AND user_id = $2`
        const result = await pool.query(query, [id, req.userId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Entry not found' });
        }

        return res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).json({message:'Server Error'});
    }
}