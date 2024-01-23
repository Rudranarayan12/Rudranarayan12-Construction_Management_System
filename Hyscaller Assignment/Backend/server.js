
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser'); 


const app = express();
app.use(cors());
app.use(bodyParser.json()); 

const db = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: '',
  database: 'yoo'
});

// Sign up endpoint
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, password], (err, data) => {
    if (err) return res.json({ success: false, error: err.message });
    return res.json({ success: true });
  });
});


app.post('/addProperty',  (req, res) => {
    const { user_id, name, picture, location, price, description } = req.body;
  
    const sql = `
      INSERT INTO user_properties (user_id, name, picture, location, price, description)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
  
    db.query(sql, [user_id, name, picture, location, price, description], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error adding property.' });
      }
  
      return res.json({ success: true });
    });
  });
  app.get('/user_properties/:user_id',  (req, res) => {
    const user_id = req.params.user_id;
  
    const sql = 'SELECT * FROM user_properties WHERE user_id = ?';
  
    db.query(sql, [user_id], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error fetching user properties.' });
      }
  
      return res.json(data);
    });
  });
    

// Sign in endpoint
app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, data) => {
    if (err) return res.json({ success: false, error: err.message });
    if (data.length > 0) {
      return res.json({ success: true, user: data[0] });
    } else {
      return res.json({ success: false, error: 'Invalid credentials' });
    }
  });
});

app.listen(8081, () => {
  console.log("listening")
});
