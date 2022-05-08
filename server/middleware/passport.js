const passport = require("passport")
const db = require("../settings/db")
const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'its my token'
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, (payload, done) => {
            try{
                db.query(`SELECT id, email FROM diplom_node.users WHERE id = '${payload.userId}'`, (err, rows, fields) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        const user = rows
                        if (user){
                            done(null, user)
                        }
                        else{
                            done(null, false)
                        }
                    }
                })
            }
            catch (e){
                console.log(e);
            }
        })
    )
}