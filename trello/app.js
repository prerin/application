const express = require('express')
const app = express()
const path = require('path')
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose')

const boardSchema = require('./model/board')

mongoose.connect('mongodb://127.0.0.1:27017/trello', 
    // {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}
    ).then(() => {
        console.log('MongodbコネクションOK')
    })
    .catch(err => {
        console.log('MongodbコネクションNG')
        console.log(err)
    })

app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.get('/home', async (req, res) => {
    const boards = await boardSchema.find({})
    // console.log(boards)
    res.render('home', { boards })
})

app.post('/home', async (req, res) => {
    console.log(req.body.board_name)
    const board = new boardSchema({ title: req.body.board_name})
    await board.save()
    res.redirect('/home')
})

app.get('/home/:id', async (req, res) => {
    const id = (req.params.id)
    const board = await boardSchema.findById(id)
    // console.log(board)
    res.render('workspace', { board })
})

app.post('/home/:id', async (req, res) => {
    const id = (req.params.id)
    const board = await boardSchema.findById(id)
    if (req.body.todo) {
        inside = req.body.todo.component
        board.todoList.push(inside)
        await board.save()
    } else if (req.body.work) {
        inside = req.body.work.component
        board.workList.push(inside)
        await board.save()
    } else if (req.body.end) {
        inside = req.body.end.component
        board.endList.push(inside)
        await board.save()
    }
    res.redirect(`/home/${id}`)
})

app.listen(3000, () => {
    console.log('リクエストをポート3000で待機中....')
})

// router.get("/list", (req, res, next) => {
// 	const user_id = 999;
// 	var date;
// 	if(req.query.date) {
// 		date = new Date(req.query.date);
// 	} else {
// 		date = new Date();
// 	}
//     const startDay = new Date(date.getFullYear(), date.getMonth()-1, 1);
//     const testdata = new Date(date.getFullYear(), date.getMonth(), 1);
// 	console.log("startday" + startDay);
// 	console.log("endday" + testdata);
// 	db.all(`SELECT id, published_date from photodb where user_id=? AND published_date >= ? and published_date < ?`, user_id, startDay, testdata, (err, rows) => {
// 		if (err) {
//             res.status(400).json({
//                 "status": "error",
//                 "message": err.message
//             });
//             return;
//         } else {
//             var list = [];
//             rows.forEach(row => {
//                 var json = {};
//                 json.id = row['id'];
//                 json.user_id = user_id;
//                 json.user_name = 'teamC';
//                 const date = new Date();
//                 date.setTime(parseInt(row['published_date'], 10));
//                 json.timestamp = toISOStringWithTimezone(date);
//                 list.push(json);
//             });
//             res.status(200).json(list);
//         }
// 	})
// })