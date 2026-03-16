import pool from "../db.js";

//Get all assignment for loggedIn user
export const getAssignments = async (req, res) => {
  try {
    const result = await pool.query(
      `
        SELECT * FROM  assignments where user_id = $1 ORDER BY due_date ASC
        `,
      [req.userId],
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createAssignment = async (req, res) => {
    const { title, subject, due_date, priority } = req.body;
  try {
    const result = await pool.query(
      `
            INSERT INTO assignments(user_id, title, subject, due_date, priority)
            VALUES($1, $2, $3, $4, $5) RETURNING *;
            `,
      [req.userId, title, subject, due_date, priority],
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateAssignment = async (req, res) => {
    const { id } = req.params;

  try {
    const { title, subject, due_date, priority, status } = req.body;

    const result = await pool.query(
      `
            UPDATE assignments SET title = $1, subject = $2, due_date = $3, priority = $4, status = $5
       WHERE id = $6 AND user_id = $7 RETURNING *
            `,
      [title, subject, due_date, priority, status, id, req.userId],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteAssignment = async(req, res) => {
    const {id} = req.params

    try{
        await pool.query(`
                DELETE FROM assignments WHERE id = $1 AND user_id = $2
            `, [id, req.userId])
        res.status(200).json({ message: 'Assignment Deleted'})

    } catch(err){
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
}
