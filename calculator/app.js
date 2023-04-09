const express = require('express')
const app = express()
const path = require('path')
const ejsMate = require('ejs-mate')

app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(3000, () => {
    console.log("ポート3000とつながりました!!")
})