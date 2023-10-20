const { secretKey } = require("../../config");
const { db } = require("../database/connection");
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'saitreddy06@gmail.com', 
    pass: 'rndmsnlspighpxjj',
  },
});



const signup = async(req,res)=>{
    try {
        const { username, password } = req.body;
  
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, result) => {
      if (err) return res.status(500).send('Error registering user');
      res.json({ message: 'User registered successfully' });
    });
    } catch (error) {
        console.log(error);
    }
}




const signin = async(req,res)=>{
    try {
        const { username, password } = req.body;
  
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
      if (err) return res.status(500).send('Error authenticating user');
  
      if (results.length === 0) {
        return res.status(403).json({ message: 'Invalid credentials' });
      }
  
      const user = { id: results[0].id, username: results[0].username };
      const token = jwt.sign(user, secretKey,{expiresIn:'40M'});
      const refresh_token = jwt.sign(user, secretKey,{expiresIn:'2d'});


      res.json({ token,refresh_token });
    });
    } catch (error) {
        console.log(error);
    }
}



const createItem = async(req,res)=>{
    try {
        const { name, description } = req.body;
  
      if (!name || !description) {
        return res.status(400).json({ message: 'Name and description are required.' });
      }
    
      
      db.query('INSERT INTO items (name, description) VALUES (?, ?)', [name, description], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error creating item.' });
        res.json({ message: 'Item created successfully.' });
      });
    } catch (error) {
      console.log(error);
    }
}

const getItems = async(req,res)=>{
    try {
        db.query('SELECT * FROM items', (err, results) => {
            if (err) return res.status(500).json({ message: 'Error fetching items.' });
            res.json(results);
          });
    } catch (error) {
      console.log(error);
    }
}

const getItemById = async(req,res)=>{
    try {
        const itemId = req.params.id;
    
      
      db.query('SELECT * FROM items WHERE id = ?', [itemId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching item.' });
    
        if (results.length === 0) {
          return res.status(404).json({ message: 'Item not found.' });
        }
    
        res.json(results[0]);
      });
    } catch (error) {
      console.log(error);
    }
}

const  updateItem= async(req,res)=>{
    try {
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
    } catch (error) {
      console.log(error);
    }
}

const deleteItem = async(req,res)=>{
    try {
        const itemId = req.params.id;
    
      db.query('DELETE FROM items WHERE id = ?', [itemId], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error deleting item.' });
    
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Item not found.' });
        }
    
        res.json({ message: 'Item deleted successfully.' });
      });
    } catch (error) {
      console.log(error);
    }
}

const sendMail = async(req,res)=>{
  try {
    const { to, text } = req.body;

  
  const mailOptions = {
    from: 'your-email@gmail.com', 
    to, 
    subject: 'Test Email', 
    text,
  };

 
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error);
      res.status(500).json({ error: 'Email not sent' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'Email sent successfully' });
    }
  });
  } catch (error) {
    
  }
}

module.exports = {
    signup,signin,createItem,getItems,getItemById,updateItem,deleteItem,sendMail
} 