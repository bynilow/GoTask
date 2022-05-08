const Router = require("express");
const User = require("../Controllers/usersController");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const authMiddleware = require("../middleware/auth.middleware")
const jwt = require("jsonwebtoken")

const router = new Router();

router.post('/registration',
    [
        check('email', "uncorrect email").isEmail(),
        check('password', 'uncorrect password').isLength({ min: 3, max: 12 }),
        check('login', "uncorrect login").isLength({ min: 3, max: 10 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "uncorrect request ", errors })
            }
            const { email, password, login } = req.body;
            console.log(req.body);

            // const candidate = await User.findOne(email)

            // if (candidate != null) {
            //      return res.status(400).json({ message: `ПОЛЬЗОВАТЕЛЬ С EMAIL: ${email} УЖЕ СУЩЕСТВУЕТ` })
            // }
            const hashPassword = await bcrypt.hash(password, 15)
            const user = new User(email, hashPassword, login)
            await user.save({});
            return res.json({ message: "ПОЛЬЗОВАТЕЛЬ БЫЛ СОЗДАН" })
        }
        catch (e) {
            console.log(e);
            res.send({ message: "ОШИБКА СЕРВЕРА" })

        }
    })

router.get('/login',
    async (req, res) => {
        try {
            const { email, password, login } = req.body;

            const isPassValid = bcrypt.compareSync(password, user.password)
            if (!isPassValid) {
                return res.status(400).json({ message: "НЕКОРРЕКТНЫЙ ПАРОЛЬ" })
            }
        }
        catch (e) {
            console.log(e);
            res.send({ message: "Server error" })

        }
    })


router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({ id: req.user.id })
            
            const token = jwt.sign({
                userId: rw.id,
                email: rw.email
            }, 'its my token', { expiresIn: 120 * 120 })

            return response.status(200, {
                token: `Bearer ${token}`, 
                user: {
                    id: user.id,
                    email: user.email,
                    login: user.login

                }
            }, res)
        }
        catch (e) {
            console.log(e);
            res.send({ message: "Server error" })

        }
    })

module.exports = router