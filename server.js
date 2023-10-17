const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const { secretKey } = require('./config');
const app = express();
app.use(bodyParser.json());

// const secretKey = 'your_secret_key'; // Change this to your own secret key

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sai481309@',
  database: 'Items'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to database');
});



// Signup
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // You should hash the password before saving it in the database for security
  // For simplicity, we'll just save the plain password
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, result) => {
    if (err) return res.status(500).send('Error registering user');
    res.json({ message: 'User registered successfully' });
  });
});

// Signin
app.post('/signin', (req, res) => {
  const { username, password } = req.body;

  // You should validate the username and password against the database
  // For simplicity, we'll just check the provided values
  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) return res.status(500).send('Error authenticating user');

    if (results.length === 0) {
      return res.status(403).json({ message: 'Invalid credentials' });
    }

    const user = { id: results[0].id, username: results[0].username };
    const token = jwt.sign(user, secretKey);
    res.json({ token });
  });
});


const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.sendStatus(403); // Forbidden
  
    jwt.verify(token.split(' ')[1], secretKey, (err, user) => {
      if (err) return res.sendStatus(403); // Forbidden
      req.user = user;
      next();
    });
  };
  

  
//   create item 

app.post('/items', (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required.' });
    }
  
    
    db.query('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], (err, result) => {
      if (err) return res.status(500).json({ message: 'Error creating item.' });
      res.json({ message: 'Item created successfully.' });
    });
  });

//   Get Item 

app.get('/items', (req, res) => {

    db.query('SELECT * FROM items', (err, results) => {
      if (err) return res.status(500).json({ message: 'Error fetching items.' });
      res.json(results);
    });
  });

//   Get item by single id 

app.get('/items/:id', (req, res) => {
    const itemId = req.params.id;
  
    
    db.query('SELECT * FROM items WHERE id = ?', [itemId], (err, results) => {
      if (err) return res.status(500).json({ message: 'Error fetching item.' });
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'Item not found.' });
      }
  
      res.json(results[0]);
    });
  });

  
//   Update item by id 

app.put('/items/:id', (req, res) => {
    const itemId = req.params.id;
    const { name, description } = req.body;
  
    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required.' });
    }
  
    db.query('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, itemId], (err, result) => {
      if (err) return res.status(500).json({ message: 'Error updating item.' });
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Item not found.' });
      }
  
      res.json({ message: 'Item updated successfully.' });
    });
  });

//   Delete item by id 

app.delete('/items/:id', (req, res) => {
    const itemId = req.params.id;
  
    db.query('DELETE FROM items WHERE id = ?', [itemId], (err, result) => {
      if (err) return res.status(500).json({ message: 'Error deleting item.' });
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Item not found.' });
      }
  
      res.json({ message: 'Item deleted successfully.' });
    });
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));