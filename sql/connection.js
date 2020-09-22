const mysql = require('mysql')

class Connection {
  constructor() {
    if (!this.pool) {
      console.log('creating connection...')
      this.pool = mysql.createPool({
        connectionLimit: 100,
        host: '35.222.144.110',
        user: 'root',
        password: 'test',
        database: 'admin',
        debug: false,
        multipleStatements: true
      })

      return this.pool
    }

    return this.pool
  }
}

const instance = new Connection()

module.exports = instance;