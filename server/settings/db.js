const mysql = require("mysql2")

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "diplom_node",
    password: "qwerty"
});

conn.connect(err => {
    if (err) {
        return console.log("ОШИБКА ПОДКЛЮЧЕНИЯ К БД: ", err);
    }
    else {
        console.log("ПОДКЛЮЧЕНИЕ К БД - УСПЕШНО");
    }
})

module.exports = conn;