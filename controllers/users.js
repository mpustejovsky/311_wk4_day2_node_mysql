const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllUsers = (req, res) => {
  // SELECT ALL USERS


  pool.query(`SELECT * FROM users 
               join usersContact on users.id=usersContact.user_id 
               join usersAddress on users.id=usersAddress.user_id 
               order by (users.id)`,

    (err, rows) => {
      if (err) return handleSQLError(res, err)
      return res.json(rows);
    })
}

const getUserById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  let sql = "SELECT * FROM users Where id = ?"

  // WHAT GOES IN THE BRACKETS

  sql = mysql.format(sql, [req.params.id])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createUser = (req, res) => {
  // INSERT INTO USERS FIRST AND LAST NAME 
  console.log("help");
  let sql = `INSERT INTO users (first_name,last_name)
               VALUES (?,?); 
               SET @id_of_insert=@@IDENTITY;
               INSERT INTO usersAddress (user_id,address,city,county,state,zip) 
               VALUES (@id_of_insert,?,?,?,?,?);
               INSERT INTO usersContact (user_id,phone1,phone2,email)
               VALUES (@id_of_insert,?,?,?)
               `
  // WHAT GOES IN THE BRACKETS

  sql = mysql.format(sql, [req.body.first_name, req.body.last_name, req.body.address, req.body.city, req.body.county, req.body.state, req.body.zip, req.body.phone1, req.body.phone2, req.body.email])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })



}

const updateUserById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>

  let sql = "UPDATE users SET first_name=?, last_name=? WHERE id=?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [req.body.first_name, req.body.last_name, req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteUserByFirstName = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let sql = "DELETE FROM users where first_name=?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [req.params.first_name])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserByFirstName
}