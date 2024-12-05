const pool = require('../config/db');

// Create a new note
const createNote = async (req, res) => {
  const { title, datetime, note } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)',
      [title, datetime, note]
    );
    res.status(201).json({ message: 'Note created', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all notes
const getAllNotes = async (req, res) => {
  try {
    const [notes] = await pool.query('SELECT * FROM notes');
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific note
const getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const [note] = await pool.query('SELECT * FROM notes WHERE id = ?', [id]);
    if (note.length === 0) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json(note[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a note
const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, datetime, note } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?',
      [title, datetime, note, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json({ message: 'Note updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM notes WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
