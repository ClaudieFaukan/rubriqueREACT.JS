var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(cors())  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
  

// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});
// connection configurations
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'express_test'
});
  
// connect to database
dbConn.connect(); 
 
 
// Retrieve all rubrique 
app.get('/rubriques', function (req, res) {
    dbConn.query('SELECT * FROM categories', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});
 
 
// Retrieve user with id 
app.get('/rubrique/:id', function (req, res) {
  
    let rubrique_id = req.params.id;
  
    if (!rubrique_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
  
    dbConn.query('SELECT * FROM categories where id=?', rubrique_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'rubrique list.' });
    });
  
});
 

// Add a new user  
app.post('/rubrique', function (req, res) {
  
    let rubrique = req.body.categorie;
    if (!rubrique) {
        return res.status(400).send({ error:true, message: 'Please provide rubrique' });
    }
  
    dbConn.query("INSERT INTO categories SET ? ", { label: rubrique }, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New rubrique has been created successfully.' });
    });
});
 
 
//  Update user with id
app.put('/rubrique', function (req, res) {
  
    let rubrique_id = req.body.categorie_id;
    let rubrique = req.body.categorie.label;
  
    if (!rubrique_id || !rubrique) {
        return res.status(400).send({ error: user, message: 'Please provide rubrique and rubrique_id' });
    }
  
    dbConn.query("UPDATE users SET user = ? WHERE id = ?", [rubrique, rubrique_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'rubrique has been updated successfully.' });
    });
});
 
 
//  Delete user
app.delete('/rubrique', function (req, res) {
  
    let rubrique_id = req.body.categorie;
  
    if (!rubrique_id) {
        return res.status(400).send({ error: true, message: 'Please provide rubrique_id' });
    }
    dbConn.query('DELETE FROM categories WHERE id = ?', [rubrique_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'rubrique has been updated successfully.' });
    });
}); 
 
// set port
app.listen(5000, function () {
    console.log('Node app is running on port 5000');
});
 
module.exports = app;