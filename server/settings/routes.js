'use strict'

const authMiddleware = require("../middleware/auth.middleware")
const fileMiddleware = require('../middleware/file.middleware')

module.exports = (app) => {
    const passport = require("passport")
    const usersController = require("../Controllers/usersController")
    const boardsController = require("../Controllers/boardsController")

    app.route('/api/users').post(usersController.getAll)

    app.route('/api/user/changePassword').post(usersController.changePassword)

    app.route('/api/user/changeEmail').post(usersController.changeEmail)

    app.route('/api/user/changeUserName').post(usersController.changeUserName)

    app.route('/api/user/setUserPhoto').post(fileMiddleware.single('avatar'), usersController.setUserPhoto) ///

    app.route('/api/getuser').post(usersController.findOneByEmail)

    app.route('/api/getUserByLogin').post(usersController.findUserByLogin)

    app.route('/api/auth/signup').post(usersController.signup)

    app.route('/api/auth/signin').post(usersController.signin)

    app.route('/api/auth/auth').get(authMiddleware,usersController.auth)

    app.route('/api/boards/boards').post(boardsController.getAllFromId)

    app.route('/api/boards/withSelect').post(boardsController.getSelectById)

    // app.route('/api/boards/boards').post(boardsController.getAllFromId)

    app.route('/api/boards/create').post(boardsController.createBoard)

    app.route('/api/boards/board').post(boardsController.findFromBoardId)

    app.route('/api/boards/cards').post(boardsController.findCardFromBoardId) // получение карточек

    app.route('/api/card/create').post(boardsController.createCard)

    app.route('/api/card/name').post(boardsController.changeCardName)

    app.route('/api/card/cards').post(boardsController.getTasks) // получение задач

    app.route('/api/card/move').post(boardsController.moveCard)

    app.route('/api/task/create').post(boardsController.createTask)

    app.route('/api/task/move').post(boardsController.moveTask)

    app.route('/api/task/rename').post(boardsController.renameTask)

    app.route('/api/task/toggleChecked').post(boardsController.toggleTaskDone)

    app.route('/api/board/output_doc').post(boardsController.outputDoc)

    app.route('/api/board/upload').post(boardsController.uploadBoard)

    app.route('/api/board/remove').post(boardsController.removeBoard)

    app.route('/api/task/remove').post(boardsController.removeTask)

    app.route('/api/card/remove').post(boardsController.removeCard)

    app.route('/api/board/invite').post(boardsController.inviteUser)

    app.route('/api/board/getInvite').post(boardsController.getInvitesFromId)

    app.route('/api/board/acceptInvite').post(boardsController.acceptInvite)

    app.route('/api/board/declineInvite').post(boardsController.declineInvite)

    app.route('/api/board/findInvite').post(boardsController.findInvite)

    app.route('/api/board/rename').post(boardsController.renameBoard)

    app.route('/api/board').post(boardsController.getBoard)

    app.route('/api/board/setFavorite').post(boardsController.setFavorite)

    app.route('/api/board/getUsersGroup').post(boardsController.getUsersGroup)

    app.route('/api/board/setTypeUserBoard').post(boardsController.setTypeUserInBoard)

    app.route('/api/board/removeUserFromGroup').post(boardsController.removeUserFromGroup)

    app.route('/api/board/getFavorite').post(boardsController.getFavorite)

    app.route('/api/log').post(usersController.logAction)

    app.route('/api/logsGet').post(usersController.getLogs)

    app.route('/api/logsGetAdminPanel').post(usersController.getLogsAdminPanel)

    app.route('/api/user/activate/:link').post(usersController.userActivate)

}