const multer = require('multer')

const date = new Date().getTime()
console.log('date')
console.log(date)
const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null, 'img')
    },
    filename(req,file,cb){
        cb(null, date + '-' + file.originalname)
    }
})

const types = ['image/png', 'image/jpeg', 'image/jpg']

const fileFilter = (req,file,cb) => {
    if(types.includes(file.mimetype)) {
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}

module.exports = multer({storage, fileFilter})