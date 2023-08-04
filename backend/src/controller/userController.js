const { pool } = require("../config/dbConfig");

const addUserDeatils = async (req, res) => {
  try {
    // Extract fields from request body
    const { user_name, user_email } = req.body;

    // Create the 'user_table' table if it doesn't already exist
    await pool.query(`
    CREATE TABLE IF NOT EXISTS user_table (
        user_id SERIAL PRIMARY KEY,
        user_name VARCHAR(200) NOT NULL,
        user_email VARCHAR(200) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )      
    `);

    // Insert the new row into the 'user_table' table
    const result = await pool.query(
      "INSERT INTO user_table ( user_name, user_email ) VALUES ($1, $2) RETURNING *",
      [user_name, user_email]
    );

    // Return the newly created row
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.stack });
  }
};

const getUserDetails = async (req, res) => {
  const { user_id } = req.query;

  // Check if user_id is valid
  if (!user_id) {
    return res.status(400).json({ error: "Invalid user_id" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM user_table WHERE user_id = $1",
      [user_id]
    );

    // If no rows were found, return an error response
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the updated record
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.stack });
  }
};

const updateUserDeatils = async (req, res) => {
  const { user_id } = req.query;

  const { user_name, user_email } = req.body;
  try {
    const { rows } = await pool.query(
      "UPDATE user_table SET user_name = $1, user_email = $2 WHERE user_id = $3 RETURNING *",
      [user_name, user_email, user_id]
    );
    if (rows.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    res.status(500).json({ error: error.stack });
  }
};

const deleteUserDetails = async (req, res) => {
  const { user_id } = req.query;

  try {
    const { rows } = await pool.query(
      "DELETE FROM user_table WHERE user_id = $1 RETURNING *",
      [user_id]
    );
    if (rows.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json({ message: "User deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.stack });
  }
};

module.exports = {
  addUserDeatils,
  getUserDetails,
  updateUserDeatils,
  deleteUserDetails,
};
