const express = require("express")
const authRouter = require("./routes/auth.routes")
const passport = require("passport")
const corsMiddleware = require("./middleware/cors.middleware")

const app = express()

app.use(corsMiddleware)

app.use(express.json())

app.use('/img/', express.static('img'));
app.use(express.json({extended: true}));

app.use(passport.initialize())
require("./middleware/passport")(passport)

const routes = require("./settings/routes")
routes(app)

const PORT = 4850;

app.listen(PORT, () => {
    console.log("server started port:", PORT);
})
