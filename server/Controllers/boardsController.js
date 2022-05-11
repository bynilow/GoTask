'use strict'

const response = require("../response")
const db = require("../settings/db.js")

exports.getAllFromId = async (req, res) => {
    db.query(`
    SELECT 
        users.id,
        boards.id,
        boards.tittle,
        boards.background,
        boards_dependencies.userId,
        boards_dependencies.boardsId,
        boards_dependencies.invitedId,
        boards_dependencies.favoriteId,
        boards.createdDate,
        boards.countGroup
    FROM
        diplom_node.users,
        diplom_node.boards,
        diplom_node.boards_dependencies
    WHERE
        boards_dependencies.userId = '${req.body.userId}'
            AND boards_dependencies.userId = users.id
            AND boards_dependencies.boardsId = boards.id
            AND boards.tittle LIKE '%${req.body.tittle}%'`, (err, rows, fields) => {
        if(rows.length > 0){
            response.status(200, rows, res)
        }
        else{
            response.status(400, { message: "BOARDS NOT FOUND", none: -1 }, res)
        }
    })
}

exports.getSelectById = async (req, res) => {
    db.query(`
    SELECT 
        users.id,
        boards.id,
        boards.tittle,
        boards.background,
        boards_dependencies.userId,
        boards_dependencies.boardsId,
        boards_dependencies.invitedId,
        boards_dependencies.favoriteId,
        boards.createdDate,
        boards.countGroup
    FROM
        diplom_node.users,
        diplom_node.boards,
        diplom_node.boards_dependencies
    WHERE
        boards_dependencies.userId = '${req.body.userId}'
            AND boards_dependencies.userId = users.id
            AND boards_dependencies.boardsId = boards.id
            AND invitedId = ${req.body.selectedType}
            AND boards.tittle LIKE '%${req.body.tittle}%'`, (err, rows, fields) => {
        if(rows.length > 0){
            response.status(200, rows, res)
        }
        else{
            response.status(400, { message: "BOARDS NOT FOUND", none: -1 }, res)
        }
    })
}

exports.findFromBoardId = async (req, res) => {
    try {
        db.query(`SELECT * FROM 
                    diplom_node.boards, diplom_node.boards_dependencies 
                WHERE 
                    boards.id = ${req.body.boardId}  
                    and boards_dependencies.userId = ${req.body.userId} 
                    and boards_dependencies.boardsId = boards.id;`, (err, rows, fields) => {
            if (rows) {
                response.status(200, rows[0], res)
            }
            else {
                response.status(400, { message: "BOARD NOT FOUND" }, res)
            }

        })
    }
    catch (e) {
        console.log(e);
    }
}

exports.findCardFromBoardId = async (req, res) => {
    db.query(`SELECT * FROM diplom_node.cards WHERE boardId = ${req.body.boardId} ORDER BY \`order\``, (err, rows, fields) => {
        if (rows) {
            response.status(200, rows, res)
        }
        else {
            response.status(400, rows, res)
        }

    })
}

exports.createBoard = async (req, res) => {
    try {
        const date = Date();
        let name = req.body.name;
        let color = req.body.color;
        let visibility = req.body.visibility;
        let userId = req.body.userId;
        let allRows;
        const sql1 = `INSERT INTO diplom_node.boards (tittle, background, visibility, creatorId, createdDate) 
            VALUES ('${name}', '${color}', ${visibility}, '${userId}', '${date}');`
        const sql2 = 'SELECT *, @@IDENTITY FROM diplom_node.`boards`;'
        const sql3 = `INSERT INTO diplom_node.boards_dependencies (userId, boardsId, roleId) VALUES (${userId}, @@IDENTITY, 1);`
        const sqlText = sql1 + sql2 + sql3;
        db.query(sql1, (err, rows, fields) => {
            if (err) {
                console.log("STEP 1" + err)
            }
            else {
                db.query(sql2, (err, rows, fields) => {
                    if (err) {
                        console.log("STEP 2" + err)
                    }
                    else {
                        allRows = rows[rows.length - 1];
                        db.query(sql3, (err, rows, fields) => {
                            if (err) {
                                console.log("STEP 3" + err)
                            }
                            else {
                                response.status(200, allRows, res);
                            }
                        })
                    }
                })
            }

        })
    }
    catch (e) {
        console.log(e)
    }
}

exports.createCard = async (req, res) => {
    try {
        
        const date = Date();
        let data;
        db.query(`SELECT MAX(\`order\`) AS ord FROM diplom_node.cards WHERE boardId = ${req.body.boardId}`, (err, rows, fields) => {
            
            if(rows[0].ord){
                db.query(`INSERT INTO diplom_node.cards (name, boardId, creatorId, \`order\`, createdDate) 
                VALUES ('Новая карточка', '${req.body.boardId}', '${req.body.userId}', '${rows[0].ord+1}', '${date}');`, (err,rows,fields) => {
                    console.log(err)
                    response.status(200, rows, res)
                })
            }
            else{
                db.query(`INSERT INTO diplom_node.cards (name, boardId, creatorId, \`order\`, createdDate) 
                VALUES ('Новая карточка', '${req.body.boardId}', '${req.body.userId}', '1', '${date}');`, (err,rows,fields) => {
                    response.status(200, rows, res)
                })
            }

        })
    }
    catch (e) {
        console.log(e);
    }

}

exports.changeCardName = async (req, res) => {
    db.query(`UPDATE diplom_node.cards SET name = '${req.body.nameCard}' WHERE (id = '${req.body.cardId}');`, (err, rows, fields) => {
        if (rows) {
            response.status(200, rows, res)
        }
        else {
            response.status(400, { message: "NAME CARD NOT CHANGED" }, res)
        }
    })
}

exports.getTasks = async (req, res) => {
    try{
        // console.log(req.body.cardsId)
        // console.log('here')
        let mysql = "";
        req.body.cardsId.forEach((el, i) => {
            if (i == 0) {
                mysql = mysql + el;
            }
            else {
                mysql = mysql + (" or cardId = " + el);
            }
        })
        const mysqltext = "SELECT * FROM diplom_node.tasks WHERE cardId = "+mysql+" ORDER BY \`order\`;";
        // console.log(mysqltext)
        db.query(mysqltext, (err, rows, fields) => {
            if (rows) {
                if(rows.length == 0){
                    response.status(200, null, res)
                }
                else{
                    response.status(200, rows, res)
                }
                
            }
            else {
                response.status(400, { message: "TASKS NOT FOUND" }, res)
            }
        })
    }
    catch(e){
        console.log(e)
    }
    
}

exports.createTask = async (req, res) => {
    
    try {
        const date = Date();
        console.log(`${req.body.nameTask}', '${req.body.cardId}', '${req.body.creatorId}', '1', '${date}`)
        db.query(`
        INSERT INTO 
            diplom_node.tasks (\`name\`, \`cardId\`, \`creatorId\`, \`order\`, \`createdDate\`, boardId) 
        VALUES 
            ('${req.body.nameTask}', '${req.body.cardId}', '${req.body.creatorId}', '1', '${date}', ${req.body.boardId});`, (err, rows, fields) => {
                console.log(err)

            if (rows) {
                db.query(`UPDATE diplom_node.tasks SET \`order\` = \`order\`+1 WHERE (cardId = '${req.body.cardId}');`, (err, rows, fields) => {
                    if(rows){
                        response.status(200, rows, res)
                    }
                    else{
                        response.status(400, { message: "TASKS NOT CREATED" }, res)
                    }
                })
                
            }
            else {
                response.status(400, { message: "TASKS NOT CREATED" }, res)
            }
        })
    }
    catch (e) {
        console.log("ERROR: ")
        console.log(e)
    }

}

exports.moveTask = async (req, res) => {
    try{
        
        let beforeOrder = Number(req.body.beforeOrder);
        let firstOrder = Number(req.body.firstOrder);
        console.log(req.body.isThisCard)
        console.log("before order 1: " + beforeOrder)
        /// запрос на обновление айди карточки у задачи
        db.query(`
        UPDATE 
            diplom_node.tasks 
        SET 
            cardId = ${req.body.cardId},
            \`order\`= ${beforeOrder+1}
        WHERE 
            (id = '${req.body.taskId}');`, (err, rows, fields) => {

            if (rows) {
                if (req.body.isThisCard) {
                    console.log("before order 2: " + beforeOrder)
                    console.log("first order 1: " + firstOrder)
                    /// запрос на смену позиций у задач ЕСЛИ задача была перемещенна в текущей карте
                    db.query(`
                        UPDATE diplom_node.tasks SET \`order\` = \`order\`+1
                        WHERE cardID = ${req.body.cardId} AND \`order\` > ${beforeOrder} AND id != ${req.body.taskId};
                        `, 
                        (err, rows, fields) => {
                            if (rows) {
                                console.log("MOVED")
                                response.status(200, rows, res)
                            }
                            else {
                                response.status(400, { message: "TASKS NOT MOVED BEFORE ORDER" }, res)
                            }
                    })
                }
                else {
                    /// запрос на смену позиций у задач ЕСЛИ задача была перемещенна в другую карту
                    db.query(`
                    UPDATE diplom_node.tasks SET \`order\` = \`order\`+1
                    WHERE cardID = ${req.body.cardId} AND \`order\` > ${beforeOrder} AND id != ${req.body.taskId};`,
                        (err, rows, fields) => {
                            if (rows) {
                                response.status(200, rows, res)
                            }
                            else {
                                response.status(400, { message: "TASKS NOT MOVED BEFORE ORDER" }, res)
                            }
                        })
                }

                
            }
            else {
                response.status(400, { message: "TASKS NOT MOVED" }, res)
            }
        })
    }
    catch(e){
        console.log(e);
    }
    
}

exports.renameTask = async (req,res) =>{
    try{
        db.query(`UPDATE diplom_node.tasks SET \`name\` = '${req.body.taskText}' WHERE (id = '${req.body.taskId}');`, (err,rows,fields) => {
            if(rows){
                response.status(200, rows, res)
            }
            else{
                response.status(400, { message: "TASKS NOT RENAMED" }, res)
            }
        })
    }
    catch(e){
        console.log(e)
    }
}

exports.outputDoc = async (req, res) => {
    try{
        let jsonData = [];
        console.log('hehe')
        db.query(`
        SELECT name,id,creatorId,createdDate FROM diplom_node.cards WHERE cards.boardId = ${req.body.boardId}`, (err, rows, fields) => {
            if(rows){
                console.log('parsed rows:')
                jsonData = rows;
                // console.log(jsonData)

                db.query(`SELECT name,id,cardId,creatorId,createdDate FROM diplom_node.tasks WHERE tasks.boardId = ${req.body.boardId}`, (err,rows,fields) => {
                    if(rows){
                        rows.forEach((task, i, rows) => {
                            console.log(' ')
                            jsonData.forEach((card, i2, jsonData) => {
                                if(task.cardId == card.id){
                                    if(typeof jsonData[i2].tasks === 'undefined'){
                                        jsonData[i2].tasks = [];
                                    }
                                    jsonData[i2].tasks.push(task)
                                    
                                    // jsonData[i2].cards.push(JSON.stringify(item2));
                                }
                                if(typeof jsonData[i2].tasks === 'undefined'){
                                    jsonData[i2].tasks = [];
                                }
                            })
                        })
                    }
                    
                    console.log(' ')
                    console.log(' ')
                    console.log(' ')
                    console.log(jsonData)
                    response.status(200,jsonData, res)
                })
                // response.status(200, rows, res)
                // console.log(jsonData)
            }
        })
    }
    catch(e){
        console.log(e);
    }
    
}

exports.removeBoard = async (req, res) => {
    try{
        db.query(`DELETE FROM diplom_node.boards_dependencies WHERE (boardsId = '${req.body.boardId}');`, (err, rows, fields) => {
            db.query(`DELETE FROM diplom_node.tasks WHERE (boardId = '${req.body.boardId}');`,(err,rows,fields) => {
                db.query(`DELETE FROM diplom_node.cards WHERE (boardId = '${req.body.boardId}');`,(err,rows,fields) => {
                    db.query(`DELETE FROM diplom_node.board_invites WHERE (boardId = '${req.body.boardId}');`, (err,rows,fields) => {
                        db.query(`DELETE FROM diplom_node.boards WHERE (id = '${req.body.boardId}');`, (err,rows,fields) => {
                            response.status(200, rows, res)
                        })
                        
                    })

                })
            })
        })
    }
    catch(e){
        console.log(e);
    }
}

exports.removeTask = async (req, res) => {
    try{
        db.query(`DELETE FROM diplom_node.tasks WHERE (id = '${req.body.taskId}');`, (err, rows, fields) => {
            db.query(`UPDATE diplom_node.tasks SET \`order\` = \`order\`-1 WHERE (\`oder\` > '${req.body.order}');`, (err,rows,fields) => {
                response.status(200, req.body.taskId, res)
            })
        })
    }
    catch(e){
        console.log(e);
    }
}

exports.removeCard = async (req, res) => {
    try{
        db.query(`DELETE FROM diplom_node.tasks WHERE (cardId = '${req.body.cardId}');`, (err, rows, fields) => {
            db.query(`DELETE FROM diplom_node.cards WHERE (id = '${req.body.cardId}');`, (err,rows,fields) => {
                response.status(200, req.body.cardId, res)
            })
        })
    }
    catch(e){
        console.log(e);
    }
}

exports.moveCard = async (req, res) => {
    try {
        db.query(`UPDATE diplom_node.cards SET \`order\` = '${req.body.selectedOrder}' 
                    WHERE id = '${req.body.cardId}';`, (err, rows, fields) => {
                
            if (req.body.dir == 'left') {
                db.query(`UPDATE diplom_node.cards SET \`order\` = \`order\`+1 
                            WHERE boardId = '${req.body.boardId}' 
                            AND \`order\` >= ${req.body.selectedOrder} 
                            AND id != ${req.body.cardId};`, (err, rows, fields) => {
                    response.status(200, req.body.cardId, res)
                })
            }
            else{
                db.query(`UPDATE diplom_node.cards SET \`order\` = \`order\`-1 
                            WHERE boardId = '${req.body.boardId}' 
                            AND \`order\` <= ${req.body.selectedOrder} 
                            AND id != ${req.body.cardId};`, (err, rows, fields) => {
                    response.status(200, req.body.cardId, res)
                })
            }
        })
    }
    catch(e){
        console.log(e);
    }
}

exports.inviteUser = async (req,res) => {
    try{
        db.query(`INSERT INTO diplom_node.board_invites 
        (boardId, userId, roleId, statusId, senderId) 
        VALUES ('${req.body.boardId}', '${req.body.userId}', '2', '1', ${req.body.senderId});`, (err, rows, fields) => {
            if(rows){
                response.status(200, rows, res)
            }
        })
    }
    catch(e){

    }
}

exports.getInvitesFromId = async (req, res) => {
    try{
        db.query(`
        SELECT board_invites.id AS inviteId,
            board_invites.boardId,
            board_invites.userId,
            board_invites.statusId,
            board_invites.senderId,
            boards.id AS BBoardId,
            boards.tittle,
            boards.background,
            users.login AS senderName
        FROM diplom_node.board_invites, 
            diplom_node.boards,
            diplom_node.users
        WHERE userId = ${req.body.userId}
            AND statusId = 1
            AND boardId = boards.id
            AND board_invites.senderId = users.id;`, (err, rows, fields) => {
            if(rows){
                response.status(200, rows, res)
            }
            else{
                response.status(400, { message: "BOARDS NOT FOUND", none: -1 }, res)
            }
        })
    }
    catch(e){
        console.log(e)
    }
}

exports.acceptInvite = async (req,res) => {
    try{
        console.log(req.body.inviteId)
        db.query(`UPDATE diplom_node.board_invites SET statusId = '2' WHERE (id = '${req.body.inviteId}');`, (err, rows, fields) => {
            console.log(err)
            if(rows){
                db.query(`INSERT INTO diplom_node.boards_dependencies (userId, boardsId, roleId, invitedId) 
                VALUES ('${req.body.userId}', '${req.body.boardId}', '2', '2');`, (err,rows,fields) => {
                    if(rows){
                        db.query(`UPDATE diplom_node.boards SET countGroup = countGroup+1 WHERE (id = '${req.body.boardId}');`, 
                            (err,rows,fields) =>{
                            if(rows){
                                response.status(200, rows, res)
                            }
                        })
                    }
                    
                    
                })
                
            }
        })
    }
    catch(e){
        console.log(e)
    }
}

exports.declineInvite = async (req,res) => {
    try{
        db.query(`UPDATE diplom_node.board_invites SET statusId = '3' WHERE (id = '${req.body.inviteId}');`, (err, rows, fields) => {
            if(rows){
                response.status(200, rows, res)
            }
        })
    }
    catch(e){
        console.log(e)
    }
}

exports.findInvite = async (req,res) => {
    try{
        db.query(`SELECT * FROM diplom_node.board_invites 
        WHERE userId = ${req.body.userId} AND boardId = ${req.body.boardId} AND statusId = 1`, (err, rows, fields) => {
            console.log(rows.length)
            if (rows.length) {
                response.status(200, {found:'exist'}, res)
            }
            else{
                db.query(`SELECT * FROM diplom_node.boards_dependencies
                WHERE userId = ${req.body.userId} AND boardsId = ${req.body.boardId}`,(err,rows,fields) => {
                    if (rows.length) {
                        response.status(200, {found:'exist'}, res)
                    }
                    else{
                        response.status(200, {found:true}, res)
                    }
                })
                
            }
        })
    }
    catch(e){
        console.log(e)
    }
}

exports.renameBoard = async (req,res) =>{
    try{
        db.query(`UPDATE diplom_node.boards SET tittle = '${req.body.nameBoard}' WHERE (id = '${req.body.boardId}');`, (err,rows,fields) => {
            if(rows){
                response.status(200, rows, res)
            }
            else{
                response.status(400, { message: "BOARD NOT RENAMED" }, res)
            }
        })
    }
    catch(e){
        console.log(e)
    }
}

exports.getBoard = async (req,res) =>{
    try{
        let cards = [];
        db.query(`SELECT * FROM diplom_node.cards WHERE boardId = ${req.body.boardId} ORDER BY \`order\``, (err,rowsCard,fields) => {
            if(rowsCard){
                let idCards = ``;
                
                cards = rowsCard.map((card,ind) => {
                    if(rowsCard.length-1 !== ind){
                        idCards = idCards + `cardId = ${card.id} OR `;
                        card.task = []
                    }
                    else{
                        idCards = idCards + `cardId = ${card.id} `;
                        card.task = []
                    }
                    return card
                });
                console.log(idCards)
                db.query(`SELECT * FROM diplom_node.tasks WHERE ${idCards} ORDER BY \`order\``, (err,rowsTask,fields) => {
                    if(rowsTask){
                        
                        cards = cards.map((card,indCard) => {
                            rowsTask.map((task,indTask) => {
                                if (task.cardId == card.id){
                                    card.task.push(task)
                                }
                            })
                            return card
                        });
                        response.status(200, cards, res)
                    }
                    else{
                        response.status(200, {cards, findTasks: req.body.boardId}, res)
                    }
                })
            

                
            }
            else{
                response.status(200, {findCards: null}, res)
            }
        })
    }
    catch(e){
        console.log(e)
    }
}

exports.setFavorite = async (req,res) =>{
    try{
        db.query(`UPDATE diplom_node.boards_dependencies SET favoriteId = '${req.body.favorite}' 
        WHERE boardsId = ${req.body.boardId} AND userId = ${req.body.userId};`, (err,rows,fields) => {
            console.log(err)
            if(rows){
                response.status(200, rows, res)
            }
            else{
                response.status(400, { message: "ERROR FAVORITE" }, res)
            }
        })
    }
    catch(e){
        console.log(e)
    }
}

exports.getUsersGroup = async (req,res) =>{
    try{
        db.query(`
        SELECT 
            boards_dependencies.id AS dependId,
            boards_dependencies.userId, 
            boards_dependencies.invitedId,
            boards_dependencies.roleId,
            users.id AS UuserId,
            users.login,
            users.photo
        FROM diplom_node.boards_dependencies, diplom_node.users 
        WHERE boardsId = ${req.body.boardId} AND userId = users.id;`, (err,rows,fields) => {
            if(rows){
                response.status(200, rows, res)
            }
            else{
                response.status(400, { message: "USERS NOT FOUND" }, res)
            }
        })
    }
    catch(e){
        console.log(e)
    }
}

exports.setTypeUserInBoard = async (req,res) =>{
    try{
        db.query(`UPDATE diplom_node.boards_dependencies 
        SET roleId = '${req.body.type}' WHERE boardsId = ${req.body.boardId} AND userId = ${req.body.userId};`, (err,rows,fields) => {
            if(rows){
                response.status(200, rows, res)
            }
            else{
                response.status(400, { message: "ERROR FAVORITE" }, res)
            }
        })
    }
    catch(e){
        console.log(e)
    }
}

exports.removeUserFromGroup = async (req,res) =>{
    try{
        db.query(`DELETE FROM diplom_node.boards_dependencies 
        WHERE boardsId = ${req.body.boardId} AND userId = ${req.body.userId};`, (err,rows,fields) => {
            if(rows){
                response.status(200, rows, res)
            }
            else{
                response.status(400, { message: "ERROR FAVORITE" }, res)
            }
        })
    }
    catch(e){
        console.log(e)
    }
}

exports.getFavorite = async (req,res) => {
    try{
        db.query(`
    SELECT 
        users.id,
        boards.id,
        boards.tittle,
        boards.background,
        boards_dependencies.userId,
        boards_dependencies.boardsId,
        boards_dependencies.invitedId,
        boards_dependencies.favoriteId
    FROM
        diplom_node.users,
        diplom_node.boards,
        diplom_node.boards_dependencies
    WHERE
        boards_dependencies.userId = '${req.body.userId}'
            AND boards_dependencies.favoriteId = 2
            AND boards_dependencies.userId = users.id
            AND boards_dependencies.boardsId = boards.id`, (err, rows, fields) => {
        if(rows.length > 0){
            response.status(200, rows, res)
        }
        else{
            response.status(400, { message: "BOARDS NOT FOUND", none: -1 }, res)
        }
    })
        
    }
    catch(e){
        console.log(e)
    }
}

exports.toggleTaskDone = async (req,res) =>{
    try{
        db.query(`UPDATE diplom_node.tasks SET doneId = '${req.body.status}' WHERE (id = '${req.body.taskId}');`, (err,rows,fields) => {
            if(rows){
                response.status(200, rows, res)
            }
            else{
                response.status(400, { message: "TASKS NOT CHECKED" }, res)
            }
        })
    }
    catch(e){
        console.log(e)
    }
}