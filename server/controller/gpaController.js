import pool from "../db.js"

const GRADE_POINTS = {
  'O':  10,
  'A+': 9,
  'A':  8,
  'B+': 7,
  'B':  6,
  'C':  5,
}

// get all subjects
export async function getSubjects (req, res) {

    try{
        const query = `SELECT * FROM subjects WHERE user_id = $1 ORDER BY created_at ASC`
        const result = await pool.query(query,[req.userId]);
        res.json(result.rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server Error'});  
    }
}

export async function createSubject (req, res) {
    const { name, credits, grade, semester } = req.body

    if (!name || !credits || !grade) {
        return res.status(400).json({ message: 'name, credits, and grade are required' })
    }

    const creditsInt = Number(credits)
    if (!Number.isInteger(creditsInt) || creditsInt <= 0) {
        return res.status(400).json({ message: 'credits must be a positive integer' })
    }

    const grade_point = GRADE_POINTS[grade] ?? 0

    try {
        const query = `INSERT INTO subjects(user_id, name, credits, grade, grade_point, semester) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`
        const result = await pool.query(query, [req.userId, name, creditsInt, grade, grade_point, semester])
        res.json(result.rows[0])

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

export async function deleteSubject (req, res) {
    const id = Number(req.params.id)

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: 'Invalid subject id' })
    }

    try {
        const query = `DELETE FROM subjects WHERE id = $1 AND user_id = $2`
        const result = await pool.query(query, [id, req.userId])

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Subject not found' })
        }

        res.status(200).json({ message: 'Subject has been deleted' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Server Error' })
    }
}