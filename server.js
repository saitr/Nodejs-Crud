const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fileUpload = require('express-fileupload');
require('./src/database/connection')

const app = express();
app.use(bodyParser.json());

const auth_routes = require('./src/routes/auth_routes')
app.use(auth_routes)
app.use(fileUpload());

// Signup
// app.post('/signup', (req, res) => {
//   const { username, password } = req.body;

//   db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, result) => {
//     if (err) return res.status(500).send('Error registering user');
//     res.json({ message: 'User registered successfully' });
//   });
// });

// // Signin
// app.post('/signin', (req, res) => {
//   const { username, password } = req.body;

//   db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
//     if (err) return res.status(500).send('Error authenticating user');

//     if (results.length === 0) {
//       return res.status(403).json({ message: 'Invalid credentials' });
//     }

//     const user = { id: results[0].id, username: results[0].username };
//     const token = jwt.sign(user, secretKey);
//     res.json({ token });
//   });
// });

// // To verify token wheather it exists or not 

// const verifyToken = (req, res, next) => {
  
//     const token = req.header('Authorization');
//     if (!token) return res.sendStatus(403); // Forbidden
  
//     jwt.verify(token.split(' ')[1], secretKey, (err, user) => {
//       if (err) return res.sendStatus(403); // Forbidden
//       req.user = user;
//       next();
//     });
//   };
  

  
// //   create item 

// app.post('/items',verifyToken, (req, res) => {
//     const { name, description } = req.body;

//     if (!name || !description) {
//       return res.status(400).json({ message: 'Name and description are required.' });
//     }
  
    
//     db.query('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], (err, result) => {
//       if (err) return res.status(500).json({ message: 'Error creating item.' });
//       res.json({ message: 'Item created successfully.' });
//     });
//   });

// //   Get Item 

// app.get('/items',verifyToken, (req, res) => {

//     db.query('SELECT * FROM items', (err, results) => {
//       if (err) return res.status(500).json({ message: 'Error fetching items.' });
//       res.json(results);
//     });
//   });

// //   Get item by single id 

// app.get('/items/:id',verifyToken, (req, res) => {
//     const itemId = req.params.id;
  
    
//     db.query('SELECT * FROM items WHERE id = ?', [itemId], (err, results) => {
//       if (err) return res.status(500).json({ message: 'Error fetching item.' });
  
//       if (results.length === 0) {
//         return res.status(404).json({ message: 'Item not found.' });
//       }
  
//       res.json(results[0]);
//     });
//   });

  
// //   Update item by id 

// app.put('/items/:id',verifyToken, (req, res) => {
//     const itemId = req.params.id;
//     const { name, description } = req.body;
  
//     if (!name || !description) {
//       return res.status(400).json({ message: 'Name and description are required.' });
//     }
  
//     db.query('UPDATE items SET name = ?, description = ? WHERE id = ?', [name, description, itemId], (err, result) => {
//       if (err) return res.status(500).json({ message: 'Error updating item.' });
  
//       if (result.affectedRows === 0) {
//         return res.status(404).json({ message: 'Item not found.' });
//       }
  
//       res.json({ message: 'Item updated successfully.' });
//     });
//   });

// //   Delete item by id 

// app.delete('/items/:id',verifyToken, (req, res) => {
//     const itemId = req.params.id;
  
//     db.query('DELETE FROM items WHERE id = ?', [itemId], (err, result) => {
//       if (err) return res.status(500).json({ message: 'Error deleting item.' });
  
//       if (result.affectedRows === 0) {
//         return res.status(404).json({ message: 'Item not found.' });
//       }
  
//       res.json({ message: 'Item deleted successfully.' });
//     });
//   });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));