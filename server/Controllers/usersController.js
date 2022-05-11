'use strict'

const response = require("../response")
const db = require("../settings/db.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const authMiddleware = require("../middleware/auth.middleware")
const nodemailer = require('nodemailer')

exports.getAll = async (req, res) => {
    let users = {};
    db.query(`SELECT COUNT(*) AS count FROM diplom_node.users 
        WHERE login LIKE '%${req.body.likeText}%' OR email LIKE '%${req.body.likeText}%';`, (err, rows, fields) => {
        if(rows){
            users.count = rows[0].count;
            let lastUser = req.body.pageNum*6;
            console.log(lastUser-6, ' ', lastUser)
            /// max 6 users in page
            db.query(`SELECT id, login, email, photo FROM diplom_node.users 
            WHERE login LIKE '%${req.body.likeText}%' OR email LIKE '%${req.body.likeText}%' 
            LIMIT ${lastUser-6},${6}`, (err,rows,fields) => {
                console.log(err)
                if(rows){
                    users.users = rows;
                    response.status(200, users, res)
                }
                else{
                    response.status(400, {message: 'USERS NOT FOUND'}, res)
                }
            })
            
        }
        else{
            response.status(400, {message: 'USERS NOT FOUND'}, res)
        }
    })
}

exports.findOne = async (req, res) => {
    db.query(`SELECT id, login, email FROM diplom_node.users WHERE id = ${console.log(req)}`, (err, rows, fields) => {
        if (err) {
            response.status(400, { message: "ПОЛЬЗОВАТЕЛЬ НЕ НАЙДЕН" }, res)
        }
        else {
            response.status(200, { message: "ПОЛЬЗОВАТЕЛЬ БЫЛ НАЙДЕН" }, res)
        }
    })
}

exports.findOneByEmail = async (req, res) => {
    console.log(req.body.email)
    try{
        db.query(`SELECT id, email FROM diplom_node.users where email = '${req.body.email}';`, (err, rows, fields) => {
            
            console.log(err)
            if(rows.length > 0){
                response.status(200, { found: true }, res)
            }
            else{
                response.status(200, { found: false }, res)
            }
            
        })
    }
    catch(e){
        console.log(e)
    } 
}


exports.signup = async(req, res) => {
    try{
        db.query(`SELECT id,email,login FROM diplom_node.users WHERE email = '${req.body.email}'`, (err, rows, fields) => {
            if (err) {
                response.status(400, err, res)
            }
            else if (typeof rows !== 'undefined' && rows.length > 0) {
                console.log('step 1');
                const row = JSON.parse(JSON.stringify(rows))
                row.map(rw => {
                    response.status(302, { message: `ПОЛЬЗОВАТЕЛЬ С ТАКИМ EMAIL - ${rw.email} УЖЕ СУЩЕСТВУЕТ` }, res)
                    return true
                })
            }
            else {
                const email = req.body.email
                const login = req.body.login
                const password = bcrypt.hashSync(req.body.password, 8)
                let sql = `INSERT INTO diplom_node.users(login,password,email) VALUES('${login}','${password}','${email}' )`
                db.query(sql, (err, result) => {
                    if (err) {
                        response.status(400, err, res)
                    }
                    else {
                        response.status(200, { message: `ПОЛЬЗОВАТЕЛЬ БЫЛ ЗАРЕГЕСТРИРОВАН ` }, res)
                    }
                })
            }
        })

    }
    catch (e) {
        console.log(e)
    }
    
}

exports.signin = (req, res) => {

    db.query(`SELECT id, email, password, login, user_type FROM diplom_node.users WHERE email = '${req.body.email}'`, (err, rows, fields) => {
        if (err) {
            response.status(400, err, res)
            console.log(err);
        }
        else if (rows.length <= 0) {
            response.status(200, { message: `ПОЛЬЗОВАТЕЛЬ С EMAIL - ${req.body.email} НЕ НАЙДЕН` }, res)
        }
        else {

            const row = JSON.parse(JSON.stringify(rows))
            row.map(rw => {

                console.log(req.body.password);
                const password = bcrypt.compareSync(req.body.password, rw.password)
                if (password) {
                    const token = jwt.sign({
                        id: rw.id,
                        email: rw.email,
                        login: rw.login
                    }, 'its my token', { expiresIn: "12h" })

                    response.status(200, {
                        token: `${token}`,
                        user: {
                            id: rw.id,
                            email: rw.email,
                            login: rw.login,
                            photo: rw.photo,
                            isAdmin: rw.user_type-1
                        }
                    }, res)
                }
                else {
                    response.status(200, { message: "НЕВЕРНЫЙ ПАРОЛЬ" }, res)
                }
                return true
            }

            )
        }

    })

}

exports.auth = async(req, res) => {
    try {
        db.query(`SELECT id, email, login, photo, user_type FROM diplom_node.users WHERE id = '${req.user.id}'`, (err, rows, fields) => {
            const row = JSON.parse(JSON.stringify(rows))
            row.map(rw => {
                const token = jwt.sign({
                    id: rw.id,
                    email: rw.email,
                    login: rw.login
                }, 'its my token', { expiresIn: "30d" })

                return res.json({
                    token,
                    user: {
                        id: rw.id,
                        email: rw.email,
                        login: rw.login,
                        photo: rw.photo,
                        isAdmin: rw.user_type-1
                    }
                })


            }
            )
        }
        )

    }
    catch (e) {
        console.log(e);
        response.status(400, { message: "ОШИБКА СЕРВЕРА" }, res)

    }


}

exports.findUserByLogin = async (req, res) => {
    console.log(req.body.email)
    try{
        db.query(`SELECT id, login FROM diplom_node.users where login = '${req.body.userName}';`, (err, rows, fields) => {
            if(rows.length > 0){
                response.status(200, { found: true, id: rows[0].id }, res)
            }
            else{
                response.status(200, { found: false }, res)
            }
            
        })
    }
    catch(e){
        console.log(e)
    } 
}

exports.changePassword = async (req, res) => {
    try{
        const password = bcrypt.hashSync(req.body.password, 8)
        db.query(`UPDATE diplom_node.users SET password = '${password}' WHERE (id = '${req.body.userId}');`, (err, rows, fields) => {
            if(!err){
                response.status(200, true, res)
            }
            else{
                response.status(400, { message: 'PASS NOT CHANGED'}, res)
            }
        })
    }
    catch(e){
        console.log(e)
    } 
}

exports.changeEmail = async (req, res) => {
    try{
        db.query(`UPDATE diplom_node.users SET email = '${req.body.email}' WHERE (id = '${req.body.userId}');`, (err, rows, fields) => {
            if(!err){
                response.status(200, true, res)
            }
            else{
                response.status(400, { message: 'EMAIL NOT CHANGED'}, res)
            }
        })
    }
    catch(e){
        console.log(e)
    } 
}

exports.changeUserName = async (req, res) => {
    try{
        db.query(`UPDATE diplom_node.users SET login = '${req.body.userName}' WHERE (id = '${req.body.userId}');`, (err, rows, fields) => {
            if(!err){
                response.status(200, true, res)
            }
            else{
                response.status(400, { message: 'USERNAME NOT CHANGED'}, res)
            }
        })
    }
    catch(e){
        console.log(e)
    } 
}

exports.setUserPhoto = async(req,res) => {
    try{ 
        if(req.file){
            const filePath = req.file.filename

            db.query(`UPDATE diplom_node.users SET photo = '${filePath}' WHERE (id = '${req.body.userId}');`, (err, rows, fields) => {
                db.query(`SELECT photo FROM diplom_node.users WHERE id = ${req.body.userId}`, (err,rows,fileds) => {
                    response.status(200, "http://localhost:4850/img/"+rows[0].photo, res)
                })
            })
        }
        
    }
    catch(e){

    }
}

exports.logAction = async(req,res) => {
    try {
        db.query(`
        INSERT INTO diplom_node.logs (action_creator, boardId, message) 
        VALUES ('${req.body.userId}', '${req.body.boardId}', '${req.body.message}');`, (err, rows, fields) => {
                console.log(err)
                response.status(200, rows, res)
        })
    }
    catch(e){
        console.log(e)
    }
}

exports.getLogs = async(req,res) => {
    try {
        db.query(`
        SELECT logs.id, users.login, boardId, message, date, users.photo FROM diplom_node.logs
        JOIN diplom_node.users ON logs.action_creator = users.id
        WHERE boardId = ${req.body.boardId} ORDER BY logs.date DESC;`, (err, rows, fields) => {
            response.status(200, rows, res)
        })
    }
    catch(e){
        console.log(e)
    }
}

exports.userActivate = async(req,res) => {
    try{

    }
    catch(e){
        
    }
}