const express = require('express')
const app = express()
const path = require('path')
const ejsMate = require('ejs-mate')

app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

const PORT = 3000

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/comp', (req, res) => {
    res.render('comp')
})

app.get('/sheet', (req, res) => {
    res.render('sheet')
})

app.listen(PORT, () => {
    console.log(`ポート${PORT}とつながりました!!`)
})