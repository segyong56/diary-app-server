const express = require('express')
const cors = require('cors')
const app = express();
const port = 5000;
const models = require('./models')
const multer = require('multer');
const upload = multer({
    storage: multer.diskStorage({
        destination : function(req, file, cb){
            cb(null, 'uploads/')
        },
        filename: function(req, file, cb){
            cb(null, file.originalname);
        }
    })
});

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => {
    models.Content.findAll({
        order : [["createdAt", "DESC" ]]
    }).then((result) => {
        res.send({
            contents : result,
        })
    }).catch((error) => {
        console.error(error)
        console.log("에러발생")
    })
})

app.post("/calendar/:date/new", (req, res) => {
    const body = req.body
    const { date, title, description, imageUrl } = body;
    models.Content.create({
        date,
        title,
        description,
        imageUrl
    }).then((result) => {
        res.send({
            result,
        })
    }).catch((error) => {
        console.error(error)
        console.log("에러발생")
    })
})

app.post('/image', upload.single('image'), (req, res) => {
    const file = req.file;
    console.log(file)
    res.send({
        imageUrl : file.path
    })
})

app.get("/calendar", (req, res) => {
    models.Content.findAll({
        attributes : [
            'id',
            'date'
        ]
    }).then((result) => {
        res.send({
            contents : result
        })
    }).catch((error) => {
        console.error("에러발생")
    })
})

app.get("/calendar/:date", (req, res) => {
    const params = req.params
    const { date } = params;
    models.Content.findAll({
        where : {
            date : date
        }
    }).then((result) => {
        res.send({
        contents : result,
        })
    }).catch((error) => {
        console.error(error)
        console.log("에러발생")
    })
})

app.get("/calendar/:date/content/:id", (req, res) => {
    const params = req.params
    const {date, id} = params;
    models.Content.findOne({
        where : {
            date: date,
            id: id
        }
    }).then((result) => {
        res.send({
            content : result,
        })
    }).catch((error) => {
        console.error(error)
        console.log("에러발생")
    })
})


app.delete("/calendar/:date/content/:id", (req, res) => {
    const params = req.params
    const {id} = params;
    models.Content.destroy({
        where : {
            id : id
        }
    }).then((result) => {
        res.send({
            content : result,
        })
    }).catch((error) => {
        console.error(error)
        console.log("에러발생")
    })
})

app.get("/calendar/:date/edit/:id", (req, res) => {
    const params = req.params
    const {date, id} = params;
    models.Content.findOne({
        where : {
            date: date,
            id: id
        }
    }).then((result) => {
        res.send({
            content : result,
        })
    }).catch((error) => {
        console.error(error)
        console.log("에러발생")
    })
})

app.put("/calendar/:date/edit/:id", (req, res) => {
    const params = req.params
    const {id} = params;
    const body = req.body
    const { date, title, description, imageUrl } = body;
    models.Content.update({
        date,
        title,
        description,
        imageUrl
    }, {
        where : {
            id:id
        }
    }).then((result) => {
        res.send({
            content : result,
        })
    }).catch((error) => {
        console.error("에러발생")
    })
})



app.listen(port, () => {
    models.sequelize.sync().then(() => {
        console.log("DB is connected")
    }).catch((error) => {
        console.error(error)
        console.log("error operation")
    })
})